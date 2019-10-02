import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  TokenColorSort,
  FieldType,
  DirectionType
} from '../token-colors-list/token-colors-list.component';

@Component({
  selector: 'cse-sort-by',
  templateUrl: './sort-by.component.html',
  styleUrls: ['./sort-by.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortByComponent {
  @Input() sort: TokenColorSort;

  @Output() changeSortEvent = new EventEmitter<TokenColorSort>();

  constructor() {}

  changeSorting(field: FieldType, direction: DirectionType) {
    if (
      this.sort &&
      field === this.sort.field &&
      direction === this.sort.direction
    ) {
      this.sort = null;
    } else {
      this.sort = { field, direction };
    }

    this.changeSortEvent.emit(this.sort);
  }

  isActive(field: FieldType, direction: DirectionType) {
    return (
      this.sort &&
      field === this.sort.field &&
      direction === this.sort.direction
    );
  }
}
