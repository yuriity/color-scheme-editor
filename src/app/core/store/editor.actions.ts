import { createAction, props } from '@ngrx/store';

import { ColorScheme } from '../models/color-scheme';

export const actionEditorLoad = createAction(
  '[Editor] Load',
  props<{ file: File }>()
);

export const actionEditorLoadSuccess = createAction(
  '[Editor] Load Success',
  props<{ colorScheme: ColorScheme }>()
);

export const actionEditorLoadError = createAction(
  '[Editor] Load Error',
  props<{ error: string }>()
);
