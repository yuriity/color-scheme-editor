import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormControl } from '@angular/forms';
import * as tinycolor from 'tinycolor2';
import { ColorFormats } from 'tinycolor2';

import { TinycolorInstance } from 'app/core/models/tinycolor-instance';

@Component({
  selector: 'cse-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPickerComponent {
  colorValue: string;
  alphaValue: number;
  rgba: ColorFormats.RGBA;
  hsla: ColorFormats.HSLA;
  selected = new FormControl(0);
  private colorValueFocused = false;

  private _color: TinycolorInstance;
  get color(): TinycolorInstance {
    return this._color;
  }
  @Input()
  set color(value: TinycolorInstance) {
    if (this._color === value) {
      return;
    }

    this._color = value;

    this.updateColorValue();
    this.updateAlpha();
    this.updateRgba();
    this.updateHsla();
    this.colorChange.emit(this._color);
  }
  @Output() colorChange = new EventEmitter<TinycolorInstance>();

  constructor() {
    this.color = tinycolor();
  }

  onColorValueFocused() {
    this.colorValueFocused = true;
  }

  onColorValueBlur() {
    this.colorValueFocused = false;
    this.updateColorValue();
  }

  onColorValueInput(value: string) {
    this.color = tinycolor(value);
  }

  redChanged(value: number) {
    this.color = tinycolor({
      r: value,
      g: this.rgba.g,
      b: this.rgba.b,
      a: this.rgba.a
    });
  }

  greenChanged(value: number) {
    this.color = tinycolor({
      r: this.rgba.r,
      g: value,
      b: this.rgba.b,
      a: this.rgba.a
    });
  }

  blueChanged(value: number) {
    this.color = tinycolor({
      r: this.rgba.r,
      g: this.rgba.g,
      b: value,
      a: this.rgba.a
    });
  }

  hueChanged(value: number) {
    this.color = tinycolor({
      h: value,
      s: this.hsla.s,
      l: this.hsla.l,
      a: this.hsla.a
    });
  }

  saturationChanged(value: number) {
    this.color = tinycolor({
      h: this.hsla.h,
      s: value / 100,
      l: this.hsla.l,
      a: this.hsla.a
    });
  }

  lightnessChanged(value: number) {
    this.color = tinycolor({
      h: this.hsla.h,
      s: this.hsla.s,
      l: value / 100,
      a: this.hsla.a
    });
  }

  alphaChanged(value: number) {
    this.color = tinycolor({
      r: this.rgba.r,
      g: this.rgba.g,
      b: this.rgba.b,
      a: value / 100
    });
  }

  onSelectedIndexChange(selectedIndex: number) {
    this.selected.setValue(selectedIndex);
    this.updateColorValue();
  }

  private updateColorValue() {
    if (this.colorValueFocused) {
      return;
    }

    if (this.selected.value === 0) {
      this._color.getAlpha() === 1
        ? (this.colorValue = this.color.toHexString())
        : (this.colorValue = this.color.toHex8String());
    } else if (this.selected.value === 1) {
      this.colorValue = this.color.toRgbString();
    } else {
      this.colorValue = this.color.toHslString();
    }
  }

  private updateAlpha() {
    this.alphaValue = this._color.getAlpha() * 100;
  }

  private updateRgba() {
    this.rgba = this._color.toRgb();
  }

  private updateHsla() {
    const hsla = this._color.toHsl();
    // round hue to integers
    hsla.h = Math.round(hsla.h * 10) / 10;
    hsla.s = Math.round(hsla.s * 100);
    hsla.l = Math.round(hsla.l * 100);

    this.hsla = hsla;
  }
}
