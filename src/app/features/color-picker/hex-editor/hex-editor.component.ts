import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import * as tinycolor from 'tinycolor2';

import { TinycolorInstance } from 'app/core/models/tinycolor-instance';
import {} from './directives/pick-color.directive';

interface Offsets {
  offsetHeight: number;
  offsetWidth: number;
}

@Component({
  selector: 'cse-hex-editor',
  templateUrl: './hex-editor.component.html',
  styleUrls: ['./hex-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HexEditorComponent {
  hue: number;
  saturation: number;
  lightness: number;
  alpha: number;

  private _color: TinycolorInstance;
  get color(): TinycolorInstance {
    return this._color;
  }
  @Input()
  set color(value: TinycolorInstance) {
    this._color = value;

    this.updateHsla();

    this.colorChange.emit(this._color);
  }
  @Output() colorChange = new EventEmitter<TinycolorInstance>();

  @ViewChild('spectrum', { static: true }) spectrum: ElementRef;
  @ViewChild('spectrumMarker', { static: true }) spectrumMarker: ElementRef;

  constructor() {}

  onSpectrumColorChanged(color: TinycolorInstance) {
    this.color = color;
  }

  onAlphaChanged(alpha: number) {
    this.color = tinycolor({
      h: this.hue,
      s: this.saturation,
      l: this.lightness,
      a: alpha
    });
  }

  onHueChanged(hue: number) {
    this.color = tinycolor({
      h: hue,
      s: this.saturation,
      l: this.lightness,
      a: this.alpha
    });
  }

  private updateHsla() {
    const hsla = this._color.toHsl();
    // round hue to integers
    this.hue = Math.round(hsla.h * 10) / 10;
    this.saturation = Math.round(hsla.s * 100);
    this.lightness = Math.round(hsla.l * 100);
    this.alpha = hsla.a;
  }
}
