import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { TinycolorInstance } from 'app/core/models/tinycolor-instance';
import { Point } from '../directives/pointer-moved.directive';
import { ResizedEvent } from '../directives/resized.directive';

@Component({
  selector: 'cse-alpha-editor',
  templateUrl: './alpha-editor.component.html',
  styleUrls: ['./alpha-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlphaEditorComponent {
  private markerOffsetHeight = 0;
  private viewInitialized = false;
  private preventUpdate = false;

  private _color: TinycolorInstance;
  get color(): TinycolorInstance {
    return this._color;
  }
  @Input() set color(value: TinycolorInstance) {
    if (this._color && value && this._color.toHex() === value.toHex()) {
      return;
    }
    this._color = value;

    if (this.viewInitialized) {
      this.drawAlpha();
    }
  }

  private _alpha: number;
  get alpha(): number {
    return this._alpha;
  }
  @Input()
  set alpha(value: number) {
    if (this._alpha === value) {
      return;
    }

    this._alpha = value;

    if (this.viewInitialized && !this.preventUpdate) {
      this.updateMarkerPosition();
    }

    this.alphaChange.emit(this._alpha);
  }
  @Output() alphaChange = new EventEmitter<number>();

  @ViewChild('alpha', { static: true }) alphaRef: ElementRef;
  @ViewChild('marker', { static: true }) markerRef: ElementRef;

  constructor() {}

  onResized(event: ResizedEvent) {
    if (event.oldHeight === undefined) {
      this.alphaRef.nativeElement.height = this.alphaRef.nativeElement.clientHeight;
      this.alphaRef.nativeElement.width = this.alphaRef.nativeElement.clientWidth;
      this.markerOffsetHeight = this.markerRef.nativeElement.offsetHeight;
      this.viewInitialized = true;

      this.drawAlpha();
      this.updateMarkerPosition();
    }
  }

  onAlphaPicked(point: Point) {
    this.preventUpdate = true;

    this.updateMarkerPosition(point.y);

    const alphaHeight = this.alphaRef.nativeElement.height;
    this.alpha = (alphaHeight - point.y) / alphaHeight;

    this.preventUpdate = false;
  }

  private drawAlpha() {
    const alphaCanvas = this.alphaRef.nativeElement;
    const alphaContext = this.alphaRef.nativeElement.getContext('2d');
    const currentColor = this.color.toRgb();

    alphaContext.clearRect(0, 0, alphaCanvas.width, alphaCanvas.height);

    // Create gradient
    const hueGrd = alphaContext.createLinearGradient(10, 0.0, 10, alphaCanvas.height);

    // Add colors
    hueGrd.addColorStop(0.01, `rgba(${currentColor.r},${currentColor.g},${currentColor.b},1`);
    hueGrd.addColorStop(0.99, `rgba(${currentColor.r},${currentColor.g},${currentColor.b},0`);

    // Fill with gradient
    alphaContext.fillStyle = hueGrd;
    alphaContext.fillRect(-1, -1, alphaCanvas.width + 2, alphaCanvas.height + 2);
  }

  private updateMarkerPosition(y: number | null = null) {
    if (y === null) {
      const alphaHeight = this.alphaRef.nativeElement.height;
      y = alphaHeight - this.alpha * alphaHeight;
    }

    const yOffset = (-1 * this.markerOffsetHeight) / 2;

    const yAdjusted = y + yOffset;
    const yFinal = Math.round(
      Math.max(Math.min(this.alphaRef.nativeElement.height - 1 + yOffset, yAdjusted), yOffset)
    );

    this.markerRef.nativeElement.style.top = yFinal + 'px';
  }
}
