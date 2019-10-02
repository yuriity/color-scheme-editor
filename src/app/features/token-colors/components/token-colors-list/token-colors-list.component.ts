import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { TokenColorResource } from 'app/core/models/token-color.resource';

export type FieldType = 'NAME' | 'SCOPE' | 'READABILITY' | 'COLOR';

export type DirectionType = 'asc' | 'desc';

export interface TokenColorSort {
  field: FieldType;
  direction: DirectionType;
}

@Component({
  selector: 'cse-token-colors-list',
  templateUrl: './token-colors-list.component.html',
  styleUrls: ['./token-colors-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TokenColorsListComponent {
  readonly dataSource$: BehaviorSubject<TokenColorResource[]>;

  private _tokens: TokenColorResource[];
  get tokens(): TokenColorResource[] {
    return this._tokens;
  }
  @Input() set tokens(value: TokenColorResource[]) {
    if (value) {
      this._tokens = value;
    } else {
      this._tokens = [];
    }
    this.updateDataSource();
  }

  private _sort: TokenColorSort | null;
  get sort(): TokenColorSort | null {
    return this._sort;
  }
  @Input() set sort(value: TokenColorSort | null) {
    if (this._sort === value) {
      return;
    }

    this._sort = value;
    this.updateDataSource();
  }

  @Output() resetItemEvent = new EventEmitter<number>();

  constructor() {
    this.dataSource$ = new BehaviorSubject<TokenColorResource[]>([]);
    this._sort = null;
  }

  resetToOriginal(tokenId: number) {
    this.resetItemEvent.emit(tokenId);
  }

  private updateDataSource() {
    this.dataSource$.next(this.sortData(this.tokens));
  }

  private sortData(tokens: TokenColorResource[]): TokenColorResource[] {
    if (!this.sort) {
      return tokens;
    }

    return tokens.sort((a, b) => {
      const valueA = this.getSortingValue(a, this.sort);
      const valueB = this.getSortingValue(b, this.sort);

      // If both valueA and valueB exist (truthy), then compare the two. Otherwise, check if
      // one value exists while the other doesn't. In this case, existing value should come last.
      // This avoids inconsistent results when comparing values to undefined/null.
      // If neither value exists, return 0 (equal).
      let comparatorResult = 0;
      if (valueA != null && valueB != null) {
        // Check if one value is greater than the other; if equal, comparatorResult should remain 0.
        if (valueA > valueB) {
          comparatorResult = 1;
        } else if (valueA < valueB) {
          comparatorResult = -1;
        }
      } else if (valueA != null) {
        comparatorResult = 1;
      } else if (valueB != null) {
        comparatorResult = -1;
      }

      return comparatorResult * (this.sort.direction === 'asc' ? 1 : -1);
    });
  }

  private getSortingValue(
    token: TokenColorResource,
    sort: TokenColorSort
  ): string | number {
    let value: string | number;
    switch (sort.field) {
      case 'NAME':
        value = token.name;
        break;
      case 'SCOPE':
        value = token.scope;
        break;
      case 'READABILITY':
        value = token.readability;
        break;
      case 'COLOR':
        value = token.color.toHex8String();
        break;
    }

    return value;
  }
}
