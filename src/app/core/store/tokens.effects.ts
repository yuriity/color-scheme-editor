import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, delay, take } from 'rxjs/operators';

import { ColorSchemeService } from '../services/color-scheme.service';
import {
  loadTokens,
  loadTokensSuccess,
  loadTokensError,
  parseTokens,
  parseTokensSuccess,
  resetAllTokens,
  updateTokens
} from './tokens.actions';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { selectModifiedTokens } from './tokens.selectors';
import { AppState } from './core.state';
import { Update } from '@ngrx/entity';
import { TokenColor } from '../models/token-color';

@Injectable()
export class TokensEffects {
  constructor(
    private store: Store<AppState>,
    private actions$: Actions,
    private colorSchemeService: ColorSchemeService,
    private router: Router
  ) {}

  loadColorScheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTokens),
      tap(() => {
        this.router.navigate(['/', 'token-colors']);
      }),
      switchMap(action =>
        this.colorSchemeService.loadColorScheme(action.file).pipe(
          // delay(3000),
          map(colorScheme => loadTokensSuccess({ colorScheme })),
          catchError(error => of(loadTokensError({ error })))
        )
      )
    )
  );

  parseColorScheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(parseTokens),
      tap(() => {
        this.router.navigate(['/', 'token-colors']);
      }),
      map(({ json }) => {
        const colorScheme = this.colorSchemeService.parseColorScheme(json);
        return parseTokensSuccess({ colorScheme });
      })
    )
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
        const tokensToUpdate: Update<TokenColor>[] = modifiedTokens.map(
          token => {
            return {
              id: token.id,
              changes: {
                name: null,
                scope: null,
                color: null,
                fontStyle: null
              }
            };
          }
        );
        return updateTokens({ tokens: tokensToUpdate });
      })
    )
  );
}
