import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { ReadabilityLevel, getReadabilityLevel } from './readability';

@Component({
  selector: 'cse-readability-view',
  templateUrl: './readability-view.component.html',
  styleUrls: ['./readability-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReadabilityViewComponent implements OnInit {
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
