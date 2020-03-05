import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterOutlet } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from './core/store/core.state';
import { routeAnimation } from './shared/animations/route-animations';
import {
  resetAllTokens,
  loadFile,
  parseJson,
  openExportColorSchemeDialog,
  loadDefaultColorScheme
} from './core/store/tokens/tokens.actions';
import {
  selectTokensLoading,
  selectModifiedTokensTotal
} from './core/store/tokens/tokens.selectors';
import { selectTheme } from './core/store/settings/settings.selectors';
import { ParseColorSchemeDialogComponent } from './features/parse-color-scheme-dialog/parse-color-scheme-dialog.component';
import { settingsChangeTheme } from './core/store/settings/settings.actions';

@Component({
  selector: 'cse-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [routeAnimation]
})
export class AppComponent implements OnInit {
  theme$: Observable<string>;
  tokensLoading$: Observable<boolean>;
  modifiedTokensTotal$: Observable<number>;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit() {
    this.theme$ = this.store.pipe(select(selectTheme));
    this.tokensLoading$ = this.store.pipe(select(selectTokensLoading));
    this.modifiedTokensTotal$ = this.store.pipe(select(selectModifiedTokensTotal));
  }

  loadStandartTheme(fileName: string) {
    this.store.dispatch(loadDefaultColorScheme({ fileName }));
  }

  loadFile(file: File) {
    this.store.dispatch(loadFile({ file }));
  }

  generateColorScheme() {
    // TODO: This should be moved to separate NgRx Effect
    const dialogRef = this.dialog.open(ParseColorSchemeDialogComponent, {
      width: '600px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(parseJson({ json: result }));
      }
    });
  }

  undoAllChanges() {
    this.store.dispatch(resetAllTokens());
  }

  exportChanges() {
    this.store.dispatch(openExportColorSchemeDialog());
  }

  onThemeChange(theme: string) {
    this.store.dispatch(settingsChangeTheme({ theme }));
  }

  public getRouterOutletState(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
