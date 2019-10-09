import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  ViewChild,
  ElementRef,
  EventEmitter
} from '@angular/core';

import { TinycolorInstance } from 'app/core/models/tinycolor-instance';
import { Point } from '../directives/pick-color.directive';
import { getImageColor } from '../shared-functions';
import { ResizedEvent } from '../directives/resized.directive';

@Component({
  selector: 'cse-spectrum-editor',
  templateUrl: './spectrum-editor.component.html',
  styleUrls: ['./spectrum-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpectrumEditorComponent {
  private markerOffsetHeight = 0;
  private markerOffsetWidth = 0;
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

    if (this.viewInitialized && !this.preventUpdate) {
      this.drawSpectrum();
      this.updateMarkerPosition();
    }

    this.colorChange.emit(this._color);
  }
  @Output() colorChange = new EventEmitter<TinycolorInstance>();

  @ViewChild('spectrum', { static: true }) spectrumRef: ElementRef;
  @ViewChild('marker', { static: true }) markerRef: ElementRef;

  constructor() {}

  onResized(event: ResizedEvent) {
    this.spectrumRef.nativeElement.height = this.spectrumRef.nativeElement.clientHeight;
    this.spectrumRef.nativeElement.width = this.spectrumRef.nativeElement.clientWidth;
    this.markerOffsetHeight = this.markerRef.nativeElement.offsetHeight;
    this.markerOffsetWidth = this.markerRef.nativeElement.offsetWidth;
    this.viewInitialized = true;

    this.drawSpectrum();
    this.updateMarkerPosition();
  }

  onColorPicked(point: Point) {
    this.preventUpdate = true;

    this.updateMarkerPosition({ x: point.x, y: point.y });

    this.color = getImageColor(this.spectrumRef.nativeElement, point.x, point.y);

    this.preventUpdate = false;
  }

  private drawSpectrum() {
    const spectrumCanvas = this.spectrumRef.nativeElement;
    const spectrumContext = this.spectrumRef.nativeElement.getContext('2d');

    spectrumContext.clearRect(0, 0, spectrumCanvas.width, spectrumCanvas.height);

    // White gradient
    const whiteGrd = spectrumContext.createLinearGradient(0, 0, spectrumCanvas.width, 0);
    whiteGrd.addColorStop(0.01, 'rgba(255, 255, 255, 1.000)');
    whiteGrd.addColorStop(0.99, 'rgba(255, 255, 255, 0.000)');

    // Black Gradient
    const blackGrd = spectrumContext.createLinearGradient(0, 0, 0, spectrumCanvas.height);
    blackGrd.addColorStop(0.01, 'rgba(0, 0, 0, 0.000)');
    blackGrd.addColorStop(0.99, 'rgba(0, 0, 0, 1.000)');

    // Fill with solid
    spectrumContext.fillStyle = 'hsl( ' + this.color.toHsl().h + ', 100%, 50%)';
    spectrumContext.fillRect(0, 0, spectrumCanvas.width, spectrumCanvas.height);

    // Fill with white
    // Odd bug prevented selecting min, max ranges from all gradients
    spectrumContext.fillStyle = whiteGrd;
    spectrumContext.fillRect(-1, -1, spectrumCanvas.width + 2, spectrumCanvas.height + 2);

    // Fill with black
    // Odd bug prevented selecting min, max ranges from all gradients
    spectrumContext.fillStyle = blackGrd;
    spectrumContext.fillRect(-1, -1, spectrumCanvas.width + 2, spectrumCanvas.height + 2);
  }

  private updateMarkerPosition(point: Point = null) {
    if (!point) {
      const hsv = this.color.toHsv();
      const spectrumCanvas = this.spectrumRef.nativeElement;
      const x = spectrumCanvas.width * hsv.s;
      const y = spectrumCanvas.height - spectrumCanvas.height * hsv.v;

      point = { x, y };
    }

    const xOffset = (-1 * this.markerOffsetWidth) / 2;
    const yOffset = (-1 * this.markerOffsetHeight) / 2;
    const xAdjusted = point.x + xOffset;
    const yAdjusted = point.y + yOffset;

    const xFinal = Math.floor(
      Math.max(Math.min(this.spectrumRef.nativeElement.width + xOffset, xAdjusted), xOffset)
    );
    const yFinal = Math.floor(
      Math.max(Math.min(this.spectrumRef.nativeElement.height + yOffset, yAdjusted), yOffset)
    );

    this.markerRef.nativeElement.style.left = xFinal + 'px';
    this.markerRef.nativeElement.style.top = yFinal + 'px';
  }
}
