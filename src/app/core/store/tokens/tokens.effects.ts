import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Update } from '@ngrx/entity';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, delay, take } from 'rxjs/operators';

import {
  resetAllTokens,
  updateTokens,
  loadFile,
  parseJson,
  loadColorSchemeSuccess,
  loadColorSchemeError,
  openExportColorSchemeDialog,
  loadDefaultColorScheme
} from './tokens.actions';
import { AppState } from '../core.state';
import { selectModifiedTokens, selectVSCodeSettings } from './tokens.selectors';
import { ColorSchemeService } from '../../services/color-scheme.service';
import { NotificationService } from '../../services/notification.service';
import { TokenColor } from '../../models/token-color';
import { ExportColorSchemeDialogComponent } from 'app/features/export-color-scheme-dialog/export-color-scheme-dialog.component';

@Injectable()
export class TokensEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private dialog: MatDialog,
    private colorSchemeService: ColorSchemeService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  loadStandartColorScheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDefaultColorScheme),
      tap(() => {
        this.router.navigate(['/', 'token-colors']);
      }),
      switchMap(action =>
        this.colorSchemeService.loadDefaultColorScheme(action.fileName).pipe(
          map(colorScheme => loadColorSchemeSuccess({ colorScheme })),
          catchError(error => of(loadColorSchemeError({ error })))
        )
      )
    )
  );

  loadColorScheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadFile),
      tap(() => {
        this.router.navigate(['/', 'token-colors']);
      }),
      switchMap(action =>
        this.colorSchemeService.loadColorScheme(action.file).pipe(
          // delay(3000),
          map(colorScheme => loadColorSchemeSuccess({ colorScheme })),
          catchError(error => of(loadColorSchemeError({ error })))
        )
      )
    )
  );

  parseColorScheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(parseJson),
      tap(() => {
        this.router.navigate(['/', 'token-colors']);
      }),
      map(({ json }) => {
        const colorScheme = this.colorSchemeService.parseColorScheme(json);
        return loadColorSchemeSuccess({ colorScheme });
      }),
      catchError(error => of(loadColorSchemeError({ error })))
    )
  );

  loadColorSchemeError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadColorSchemeError),
        tap(payload => this.notificationService.error(payload.error.message))
      ),
    { dispatch: false }
  );

  resetAllTokens$ = createEffect(() =>
    this.actions$.pipe(
      ofType(resetAllTokens),
      switchMap(() =>
        this.store.pipe(
          take(1),
          select(selectModifiedTokens)
        )
      ),
      map(modifiedTokens => {
        const tokensToUpdate: Update<TokenColor>[] = modifiedTokens.map(token => {
          return {
            id: token.id,
            changes: {
              name: null,
              scope: null,
              color: null,
              fontStyle: null
            }
          };
        });
        return updateTokens({ tokens: tokensToUpdate });
      })
    )
  );

  openExportColorSchemeDialog$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(openExportColorSchemeDialog),
        switchMap(() =>
          this.store.pipe(
            take(1),
            select(selectVSCodeSettings)
          )
        ),
        tap(settings => {
          this.dialog.open(ExportColorSchemeDialogComponent, {
            width: '600px',
            data: { json: JSON.stringify(settings, null, 2) }
          });
        })
      ),
    { dispatch: false }
  );
}
