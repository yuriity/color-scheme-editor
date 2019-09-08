import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';

@Component({
  selector: 'cse-font-style-view',
  templateUrl: './font-style-view.component.html',
  styleUrls: ['./font-style-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FontStyleViewComponent implements OnInit {
  @Input() fontStyleBold: boolean;
  @Input() fontStyleItalic: boolean;
  @Input() fontStyleUnderline: boolean;

  constructor() {}

  ngOnInit() {}
}
