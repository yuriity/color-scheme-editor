import { createAction, props } from '@ngrx/store';

import { ColorScheme } from '../models/color-scheme';

export const actionTokensLoad = createAction(
  '[Tokens] Load',
  props<{ file: File }>()
);

export const actionTokensLoadSuccess = createAction(
  '[Tokens] Load Success',
  props<{ colorScheme: ColorScheme }>()
);

export const actionTokensLoadError = createAction(
  '[Tokens] Load Error',
  props<{ error: string }>()
);
