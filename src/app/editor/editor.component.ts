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
import { takeUntil, map } from 'rxjs/operators';

import {
  AppState,
  selectColorSchemeMetadata,
  selectTokensWithBackground
} from 'app/core/store/core.state';
import { TokenColorResource } from 'app/core/models/token-color.resource';
import { ColorSchemeMetadata } from 'app/core/models/color-scheme-metadata';

@Component({
  selector: 'cse-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  dataSource: MatTableDataSource<TokenColorResource>;
  displayedColumns = ['readability', 'color', 'name', 'scope', 'edit'];
  metadata$: Observable<ColorSchemeMetadata>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.metadata$ = this.store.pipe(select(selectColorSchemeMetadata));
    this.store
      .pipe(
        takeUntil(this.unsubscribe$),
        select(selectTokensWithBackground),
        map(data =>
          data.tokens.map(
            token => new TokenColorResource(token, data.metadata.background)
          )
        )
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

  private updateDataSource(tokens: TokenColorResource[]) {
    console.log(
      'ColorSchemeTableComponent.updateDataSource(tokens: TokenColor[])'
    );
    this.dataSource = new MatTableDataSource<TokenColorResource>(tokens);
    this.dataSource.sort = this.sort;
  }
}
