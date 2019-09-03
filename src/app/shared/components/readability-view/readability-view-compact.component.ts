import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

import { ReadabilityLevel, getReadabilityLevel } from './readability';

@Component({
  selector: 'cse-readability-view-compact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './readability-view-compact.component.html',
  styleUrls: ['./readability-view-compact.component.scss']
})
export class ReadabilityViewCompactComponent implements OnInit {
  readabilityLevel: ReadabilityLevel;

  private _readability: number;
  get readability(): number {
    return this._readability;
  }
  @Input()
  set readability(value: number) {
    this._readability = value;

    this.readabilityLevel = getReadabilityLevel(this.readability);
  }

  constructor() {}

  ngOnInit() {}
}
