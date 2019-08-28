import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap, delay } from 'rxjs/operators';

import { EditorService } from '../services/editor.service';
import {
  actionEditorLoad,
  actionEditorLoadSuccess,
  actionEditorLoadError
} from './editor.actions';
import { Router } from '@angular/router';

@Injectable()
export class EditorEffects {
  constructor(
    private actions$: Actions,
    private editorService: EditorService,
    private router: Router
  ) {}

  loadColorScheme = createEffect(() =>
    this.actions$.pipe(
      ofType(actionEditorLoad),
      switchMap(action =>
        this.editorService.loadColorScheme(action.file).pipe(
          tap(() => {
            this.router.navigate(['/', 'editor']);
          }),
          // delay(3000),
          map(colorScheme => actionEditorLoadSuccess({ colorScheme })),
          catchError(error => of(actionEditorLoadError({ error })))
        )
      )
    )
  );
}
