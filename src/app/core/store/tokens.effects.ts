import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, delay } from 'rxjs/operators';

import { ColorSchemeService } from '../services/color-scheme.service';
import {
  loadTokens,
  loadTokensSuccess,
  loadTokensError
} from './tokens.actions';
import { Router } from '@angular/router';

@Injectable()
export class TokensEffects {
  constructor(
    private actions$: Actions,
    private colorSchemeService: ColorSchemeService,
    private router: Router
  ) {}

  loadColorScheme = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTokens),
      switchMap(action =>
        this.colorSchemeService.loadColorScheme(action.file).pipe(
          tap(() => {
            this.router.navigate(['/', 'token-colors']);
          }),
          // delay(3000),
          map(colorScheme => loadTokensSuccess({ colorScheme })),
          catchError(error => of(loadTokensError({ error })))
        )
      )
    )
  );
}
