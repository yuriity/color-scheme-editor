import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';

import { MatSort, MatTableDataSource } from '@angular/material';
import { TokenColorResource } from 'app/core/models/token-color.resource';

@Component({
  selector: 'cse-token-colors-table',
  templateUrl: './token-colors-table.component.html',
  styleUrls: ['./token-colors-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TokenColorsTableComponent implements OnInit {
  @Input() colorSchemeName: string;
  @Input() set tokens(value: TokenColorResource[]) {
    console.log('TokenColorsTableComponent.tokens', value);
    this.dataSource = new MatTableDataSource<TokenColorResource>(value);
    this.dataSource.sort = this.sort;
  }

  @Output() resetItemEvent = new EventEmitter<number>();

  dataSource: MatTableDataSource<TokenColorResource>;
  displayedColumns = [
    'readability',
    'color',
    'fontStyle',
    'name',
    'scope',
    'modified',
    'edit'
  ];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() {}

  ngOnInit() {}

  applyFilter(filterValue: string) {
    if (this.dataSource) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
    }
  }

  resetToOriginal(tokenId: number) {
    this.resetItemEvent.emit(tokenId);
  }
}
