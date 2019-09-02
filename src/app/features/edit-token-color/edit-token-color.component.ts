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
  color = tinycolor('#ff0000');

  constructor() {}

  ngOnInit() {}

  onColorChange(newColor: TinycolorInstance) {
    // console.log(newColor);
    this.color = newColor;
  }
}
