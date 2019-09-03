import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import * as tinycolor from 'tinycolor2';
import { TinycolorInstance } from 'app/core/models/tinycolor-instance';

@Component({
  selector: 'cse-edit-token-color',
  templateUrl: './edit-token-color.component.html',
  styleUrls: ['./edit-token-color.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditTokenColorComponent implements OnInit {
  background = tinycolor('#1E1E1E');
  color = tinycolor('#D4D4D4');
  readability = 21;
  fontStyleBold = false;
  fontStyleItalic = true;
  fontStyleUnderline = false;

  constructor() {}

  ngOnInit() {}

  onColorChange(newColor: TinycolorInstance) {
    // console.log(newColor);
    this.color = newColor;
  }
}
