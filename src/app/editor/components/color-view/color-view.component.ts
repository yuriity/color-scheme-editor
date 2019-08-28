import { TinycolorInstance } from '../../../core/models/tinycolor-instance';
import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'cse-color-view',
  templateUrl: './color-view.component.html',
  styleUrls: ['./color-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorViewComponent implements OnInit {
  @Input() background: TinycolorInstance;
  colorHex: string;

  private _color: TinycolorInstance;
  get color(): TinycolorInstance {
    return this._color;
  }
  @Input()
  set color(value: TinycolorInstance) {
    this._color = value;

    if (this._color.getAlpha() === 1) {
      this.colorHex = this._color.toHexString();
    } else {
      this.colorHex = this._color.toHex8String();
    }
  }

  constructor() {}

  ngOnInit() {}
}
