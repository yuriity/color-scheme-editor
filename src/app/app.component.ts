import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from './core/store/core.state';
import { loadTokens, parseTokens } from './core/store/tokens.actions';
import { selectTokensLoading } from './core/store/tokens.selectors';
import { ParseColorSchemeDialogComponent } from './features/parse-color-scheme-dialog/parse-color-scheme-dialog.component';

@Component({
  selector: 'cse-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  tokensLoading$: Observable<boolean>;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit() {
    this.tokensLoading$ = this.store.pipe(select(selectTokensLoading));
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
      this.store.dispatch(parseTokens({ json: result }));
    });
  }
}
