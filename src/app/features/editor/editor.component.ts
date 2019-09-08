import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { MatTableDataSource, MatSort, MatDialog } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { AppState } from 'app/core/store/core.state';
import { ReadonlyTokenColorResource } from 'app/core/models/token-color.resource';
import { ColorSchemeMetadata } from 'app/core/models/color-scheme-metadata';
import {
  selectColorSchemeMetadata,
  selectReadonlyTokens
} from 'app/core/store/tokens.selectors';
import { TokenEditorDialogComponent } from './components/token-editor-dialog/token-editor-dialog.component';

@Component({
  selector: 'cse-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  dataSource: MatTableDataSource<ReadonlyTokenColorResource>;
  displayedColumns = [
    'readability',
    'color',
    'fontStyle',
    'name',
    'scope',
    'edit'
  ];
  metadata$: Observable<ColorSchemeMetadata>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit() {
    this.metadata$ = this.store.pipe(select(selectColorSchemeMetadata));
    this.store
      .pipe(
        takeUntil(this.unsubscribe$),
        select(selectReadonlyTokens)
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

  openDialog(token: ReadonlyTokenColorResource): void {
    const dialogRef = this.dialog.open(TokenEditorDialogComponent, {
      width: '250px',
      data: { token }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed:', result);
    });
  }

  private updateDataSource(tokens: ReadonlyTokenColorResource[]) {
    console.log(
      'ColorSchemeTableComponent.updateDataSource(tokens: TokenColor[])'
    );
    this.dataSource = new MatTableDataSource<ReadonlyTokenColorResource>(
      tokens
    );
    this.dataSource.sort = this.sort;
  }
}
