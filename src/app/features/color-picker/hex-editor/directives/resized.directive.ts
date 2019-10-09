import { Directive, Output, EventEmitter, ElementRef, OnInit, OnDestroy } from '@angular/core';
import * as elementResizeDetectorMaker from 'element-resize-detector';

export class ResizedEvent {
  constructor(
    readonly element: ElementRef,
    readonly newWidth: number,
    readonly newHeight: number,
    readonly oldWidth: number,
    readonly oldHeight: number
  ) {}
}

@Directive({
  selector: '[resized]'
})
export class ResizedDirective implements OnInit, OnDestroy {
  @Output() readonly resized = new EventEmitter<any>();

  private oldWidth: number;
  private oldHeight: number;
  private resizeDetector: any;

  constructor(private readonly elementRef: ElementRef) {
    this.resizeDetector = elementResizeDetectorMaker({ strategy: 'scroll' });
  }

  ngOnInit() {
    this.resizeDetector.listenTo(this.elementRef.nativeElement, () => this.onResized());
  }

  ngOnDestroy() {
    this.resizeDetector.uninstall(this.elementRef.nativeElement);
  }

  private onResized() {
    const newWidth = this.elementRef.nativeElement.clientWidth;
    const newHeight = this.elementRef.nativeElement.clientHeight;

    if (newWidth === this.oldWidth && newHeight === this.oldHeight) {
      return;
    }

    const event = new ResizedEvent(
      this.elementRef,
      newWidth,
      newHeight,
      this.oldWidth,
      this.oldHeight
    );

    this.oldWidth = this.elementRef.nativeElement.clientWidth;
    this.oldHeight = this.elementRef.nativeElement.clientHeight;

    this.resized.emit(event);
  }
}
