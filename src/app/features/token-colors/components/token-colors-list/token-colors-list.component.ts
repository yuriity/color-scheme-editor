import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
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

  private _search: string;
  get search(): string {
    return this._search;
  }
  @Input() set search(value: string) {
    if (this._search === value) {
      return;
    }

    this._search = value;
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
    const data = this.sortData(this.searchData(this.tokens.slice()));
    this.dataSource$.next(data);
  }

  private sortData(data: TokenColorResource[]): TokenColorResource[] {
    return !this.sort ? data : data.sort((a, b) => this.compareTokens(a, b));
  }

  private searchData(data: TokenColorResource[]): TokenColorResource[] {
    return !this.search ? data : data.filter(token => this.searchPredicate(token));
  }

  private compareTokens(a: TokenColorResource, b: TokenColorResource): number {
    const valueA = this.getSortingValue(a);
    const valueB = this.getSortingValue(b);

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
  }

  private getSortingValue(token: TokenColorResource): string | number {
    let value: string | number;
    switch (this.sort.field) {
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

  private searchPredicate(token: TokenColorResource): boolean {
    // Use an obscure Unicode character to delimit the words in the concatenated string.
    // This avoids matches where the values of two columns combined will match the user's query
    // (e.g. `Flute` and `Stop` will match `Test`). The character is intended to be something
    // that has a very low chance of being typed in by somebody in a text field. This one in
    // particular is "White up-pointing triangle with dot" from
    // https://en.wikipedia.org/wiki/List_of_Unicode_characters
    const obscureCharacter = '◬';

    // Transform the data into a lowercase string of all property values.
    let dataStr = '';
    if (token.name) {
      dataStr += token.name + obscureCharacter;
    }
    if (token.scope) {
      dataStr += token.scope + obscureCharacter;
    }
    if (token.color.getAlpha() === 1) {
      dataStr += token.color.toHexString() + obscureCharacter;
    } else {
      dataStr += token.color.toHex8String() + obscureCharacter;
    }
    dataStr += token.readability.toFixed(1) + obscureCharacter;

    dataStr = dataStr.toLowerCase();

    // Transform the search term by converting it to lowercase and removing whitespace.
    const transformedSearch = this.search.trim().toLowerCase();

    const result = dataStr.indexOf(transformedSearch) !== -1;
    return result;
  }
}
