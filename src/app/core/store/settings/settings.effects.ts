import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '../core.state';
import { OverlayContainer } from '@angular/cdk/overlay';
import { selectTheme } from './settings.selectors';
import { settingsChangeTheme } from './settings.actions';
import { tap, withLatestFrom } from 'rxjs/operators';
import { of, merge } from 'rxjs';

const INIT = of('cse-init-effect-trigger');

@Injectable()
export class SettingsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private overlayContainer: OverlayContainer
  ) {}

  updateTheme$ = createEffect(
    () =>
      merge(INIT, this.actions$.pipe(ofType(settingsChangeTheme))).pipe(
        withLatestFrom(this.store.pipe(select(selectTheme))),
        tap(([_, theme]) => {
          const classList = this.overlayContainer.getContainerElement()
            .classList;
          const toRemove = Array.from(classList).filter((item: string) =>
            item.includes('-theme')
          );
          if (toRemove.length) {
            classList.remove(...toRemove);
          }
          classList.add(theme);
        })
      ),
    { dispatch: false }
  );
}
