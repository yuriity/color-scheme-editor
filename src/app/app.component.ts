import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from './core/store/core.state';
import {
  loadTokens,
  parseTokens,
  resetAllTokens
} from './core/store/tokens.actions';
import {
  selectTokensLoading,
  selectModifiedTokensTotal
} from './core/store/tokens.selectors';
import { TokenColor } from './core/models/token-color';
import { ParseColorSchemeDialogComponent } from './features/parse-color-scheme-dialog/parse-color-scheme-dialog.component';

@Component({
  selector: 'cse-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tokensLoading$: Observable<boolean>;
  modifiedTokensTotal$: Observable<number>;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit() {
    this.tokensLoading$ = this.store.pipe(select(selectTokensLoading));
    this.modifiedTokensTotal$ = this.store.pipe(
      select(selectModifiedTokensTotal)
    );
  }

  loadFile(file: File) {
    this.store.dispatch(loadTokens({ file }));
  }

  generateColorScheme() {
    // TODO: This should be moved to separate NgRx Effect
    const dialogRef = this.dialog.open(ParseColorSchemeDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(parseTokens({ json: result }));
      }
    });
  }

  undoAllChanges(tokens: TokenColor[]) {
    this.store.dispatch(resetAllTokens());
  }
}
