import {
  Directive,
  Output,
  EventEmitter,
  OnDestroy,
  NgZone,
  ElementRef,
  OnInit
} from '@angular/core';
import { Subject, fromEvent, Observable } from 'rxjs';
import { auditTime, takeUntil, mergeMap, tap, filter } from 'rxjs/operators';

export interface Point {
  readonly x: number;
  readonly y: number;
}

@Directive({
  selector: '[pointerMoved]'
})
export class PointerMovedDirective implements OnInit, OnDestroy {
  private oldPoint: Point;
  private readonly destroyed$ = new Subject<void>();

  private mousemove$: Observable<MouseEvent>;
  private mousedown$: Observable<MouseEvent>;
  private mouseup$: Observable<Event>;

  @Output() pointerMoved = new EventEmitter<Point>();

  constructor(private elementRef: ElementRef<HTMLCanvasElement>, private zone: NgZone) {}

  ngOnInit() {
    this.zone.runOutsideAngular(() => {
      this.mousemove$ = fromEvent<MouseEvent>(window, 'mousemove');
      this.mousedown$ = fromEvent<MouseEvent>(this.elementRef.nativeElement, 'mousedown');
      this.mouseup$ = fromEvent(window, 'mouseup');

      this.mousedown$
        .pipe(
          takeUntil(this.destroyed$),
          filter(event => event.buttons === 1),
          tap(event => {
            this.onPointerMoved({
              x: event.offsetX,
              y: event.offsetY
            });
          }),
          mergeMap(_ =>
            this.mousemove$.pipe(
              takeUntil(this.mouseup$),
              auditTime(16)
            )
          )
        )
        .subscribe(event => this.onWindowMouseMove(event));
    });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private onWindowMouseMove(mouseEvent: MouseEvent) {
    const clientRect = this.elementRef.nativeElement.getBoundingClientRect();

    this.onPointerMoved({
      x: this.limitValue(Math.round(mouseEvent.x - clientRect.left), 0, clientRect.width),
      y: this.limitValue(Math.round(mouseEvent.y - clientRect.top), 0, clientRect.height)
    });
  }

  private onPointerMoved(point: Point) {
    if (!this.oldPoint || this.oldPoint.x !== point.x || this.oldPoint.y !== point.y) {
      // console.log('onColorPicked', point);
      this.zone.run(() => {
        this.oldPoint = point;
        this.pointerMoved.emit(point);
      });
    }
  }

  private limitValue(value: number, min: number, max: number): number {
    return Math.max(Math.min(value, max), min);
  }
}
