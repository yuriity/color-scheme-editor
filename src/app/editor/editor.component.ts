import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  AppState,
  selectAllTokens,
  selectColorSchemeMetadata
} from 'app/core/store/core.state';
import { TokenColor } from 'app/core/models/token-color';
import { ColorSchemeMetadata } from 'app/core/models/color-scheme-metadata';

@Component({
  selector: 'cse-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  value = 'Clear me';
  dataSource: MatTableDataSource<TokenColor>;
  displayedColumns = ['readability', 'color', 'name', 'scope', 'edit'];
  metadata$: Observable<ColorSchemeMetadata>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.metadata$ = this.store.pipe(select(selectColorSchemeMetadata));
    this.store
      .pipe(
        takeUntil(this.unsubscribe$),
        select(selectAllTokens)
      )
      .subscribe(tokens => this.updateDataSource(tokens));
  }

  ngOnDestroy() {
    console.log('ColorSchemeTableComponent.ngOnDestroy()');

    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  applyFilter(filterValue: string) {
    if (this.dataSource) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
      this.dataSource.filter = filterValue;
    }
  }

  private updateDataSource(tokens: TokenColor[]) {
    console.log(
      'ColorSchemeTableComponent.updateDataSource(tokens: TokenColor[])'
    );
    this.dataSource = new MatTableDataSource<TokenColor>(tokens);
    this.dataSource.sort = this.sort;
  }
}
