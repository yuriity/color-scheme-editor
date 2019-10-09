import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';

import { Point } from '../directives/pick-color.directive';
import { getImageColor } from '../shared-functions';
import { ResizedEvent } from '../directives/resized.directive';

@Component({
  selector: 'cse-hue-editor',
  templateUrl: './hue-editor.component.html',
  styleUrls: ['./hue-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HueEditorComponent {
  private markerOffsetHeight = 0;
  private viewInitialized = false;
  private preventUpdate = false;

  private _hue: number;
  get hue(): number {
    return this._hue;
  }
  @Input()
  set hue(value: number) {
    if (this._hue === value) {
      return;
    }

    this._hue = value;

    if (this.viewInitialized && !this.preventUpdate) {
      this.updateMarkerPosition();
    }

    this.hueChange.emit(this._hue);
  }
  @Output() hueChange = new EventEmitter<number>();

  @ViewChild('hue', { static: true }) hueRef: ElementRef;
  @ViewChild('marker', { static: true }) markerRef: ElementRef;

  constructor() {}

  onResized(event: ResizedEvent) {
    if (event.oldHeight === undefined) {
      this.hueRef.nativeElement.height = this.hueRef.nativeElement.clientHeight;
      this.hueRef.nativeElement.width = this.hueRef.nativeElement.clientWidth;
      this.markerOffsetHeight = this.markerRef.nativeElement.offsetHeight;
      this.viewInitialized = true;

      this.drawHue();
      this.updateMarkerPosition();
    }
  }

  onHuePicked($event: Point) {
    this.preventUpdate = true;

    this.updateMarkerPosition($event.y);

    this.hue = getImageColor(this.hueRef.nativeElement, 0, $event.y).toHsl().h;

    this.preventUpdate = false;
  }

  private drawHue() {
    const hueCanvas = this.hueRef.nativeElement;
    const hueContext = this.hueRef.nativeElement.getContext('2d');

    hueContext.clearRect(0, 0, hueCanvas.width, hueCanvas.height);

    // Create gradient
    const hueGrd = hueContext.createLinearGradient(0, 0, 0, hueCanvas.height);

    // Add colors
    hueGrd.addColorStop(0.01, 'rgba(255, 0, 0, 1.000)');
    hueGrd.addColorStop(0.167, 'rgba(255, 0, 255, 1.000)');
    hueGrd.addColorStop(0.333, 'rgba(0, 0, 255, 1.000)');
    hueGrd.addColorStop(0.5, 'rgba(0, 255, 255, 1.000)');
    hueGrd.addColorStop(0.666, 'rgba(0, 255, 0, 1.000)');
    hueGrd.addColorStop(0.833, 'rgba(255, 255, 0, 1.000)');
    hueGrd.addColorStop(0.999, 'rgba(255, 0, 0, 1.000)');

    // Fill with gradient
    hueContext.fillStyle = hueGrd;
    hueContext.fillRect(0, 0, hueCanvas.width, hueCanvas.height);
  }

  private updateMarkerPosition(y: number | null = null) {
    if (y === null) {
      const hueHeight = this.hueRef.nativeElement.height;
      y = hueHeight - hueHeight * (this.hue / 360);
    }

    const yOffset = (-1 * this.markerOffsetHeight) / 2;

    const yAdjusted = y + yOffset;
    const yFinal = Math.round(
      Math.max(Math.min(this.hueRef.nativeElement.height - 1 + yOffset, yAdjusted), yOffset)
    );

    this.markerRef.nativeElement.style.top = yFinal + 'px';
  }
}
