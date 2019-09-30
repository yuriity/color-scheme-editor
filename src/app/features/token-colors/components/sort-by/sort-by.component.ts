import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

export type SortType =
  | 'NameAsc'
  | 'NameDesc'
  | 'ScopeAsc'
  | 'ScopeDesc'
  | 'ReadabilityAsc'
  | 'ReadabilityDesc'
  | 'ColorAsc'
  | 'ColorDesc'
  | null;

@Component({
  selector: 'cse-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortByComponent implements OnInit {
  @Input() sortBy: SortType;

  @Output() changeSortByEvent = new EventEmitter<SortType>();

  constructor() {}

  ngOnInit() {}

  changeSorting(sortBy: SortType) {
    if (sortBy === this.sortBy) {
      this.sortBy = null;
    } else {
      this.sortBy = sortBy;
    }

    this.changeSortByEvent.emit(sortBy);
    console.log('changeSorting', this.sortBy);
  }
}
