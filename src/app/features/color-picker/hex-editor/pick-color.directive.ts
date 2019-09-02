import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

export interface Point {
  readonly x: number;
  readonly y: number;
}

@Directive({
  selector: '[csePickColor]'
})
export class PickColorDirective {
  private mouseDown = false;
  private offsetX: number;
  private offsetY: number;
  private height: number;
  private width: number;

  @Output() colorPicked = new EventEmitter<Point>();

  constructor() { }

  @HostListener('mousedown', ['$event'])
  onMouseDown($event: MouseEvent) {
    if ($event.buttons > 1) { return; }

    const canvas = $event.target as HTMLCanvasElement;
    this.offsetX = canvas.getBoundingClientRect().left;
    this.offsetY = canvas.getBoundingClientRect().top;
    this.height = canvas.height;
    this.width = canvas.width;

    this.colorPicked.emit({
      x: $event.offsetX,
      y: $event.offsetY
    });

    this.mouseDown = true;
  }

  @HostListener('window:mousemove', ['$event'])
  onWindowMouseMove($event: MouseEvent) {
    if (this.mouseDown) {
      this.colorPicked.emit({
        x: this.limitValue(Math.round($event.x - this.offsetX), 0, this.width),
        y: this.limitValue(Math.round($event.y - this.offsetY), 0, this.height)
      });
    }
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    this.mouseDown = false;
  }

  private limitValue(value: number, min: number, max: number): number {
    return Math.max(Math.min(value, max), min);
  }
}
