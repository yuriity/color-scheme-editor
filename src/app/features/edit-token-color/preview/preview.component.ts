import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import * as tinycolor from 'tinycolor2';

@Component({
  selector: 'cse-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewComponent implements OnInit {
  @Input() background = tinycolor('#1E1E1E');
  @Input() color = tinycolor('#FF0000');
  @Input() fontStyleBold = true;
  @Input() fontStyleItalic = true;
  @Input() fontStyleUnderline = true;

  constructor() {}

  ngOnInit() {}
}
