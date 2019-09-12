import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { AppState } from 'app/core/store/core.state';
import { TokenColorResource } from 'app/core/models/token-color.resource';
import { ColorSchemeMetadata } from 'app/core/models/color-scheme-metadata';
import {
  selectColorSchemeMetadata,
  selectTokenColors
} from 'app/core/store/tokens.selectors';
import { Update } from '@ngrx/entity';
import { TokenColor } from 'app/core/models/token-color';
import { updateToken } from 'app/core/store/tokens.actions';

@Component({
  selector: 'cse-token-colors',
  templateUrl: './token-colors.component.html',
  styleUrls: ['./token-colors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TokenColorsComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

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
  metadata$: Observable<ColorSchemeMetadata>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private store: Store<AppState>, private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.metadata$ = this.store.pipe(select(selectColorSchemeMetadata));
    this.store
      .pipe(
        takeUntil(this.unsubscribe$),
        select(selectTokenColors)
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

  resetToOriginal(token: TokenColorResource) {
    const editedToken: Update<TokenColor> = {
      id: token.id,
      changes: {
        name: null,
        scope: null,
        color: null,
        fontStyle: null
      }
    };
    this.store.dispatch(updateToken({ token: editedToken }));
  }

  private updateDataSource(tokens: TokenColorResource[]) {
    console.log(
      'ColorSchemeTableComponent.updateDataSource(tokens: TokenColor[])'
    );
    this.dataSource = new MatTableDataSource<TokenColorResource>(tokens);
    this.dataSource.sort = this.sort;

    // TODO: Move DataTable to separate dumb component
    this.cd.markForCheck();
  }
}
