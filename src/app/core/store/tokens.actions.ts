import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { ColorScheme } from '../models/color-scheme';
import { TokenColor } from '../models/token-color';

export const loadTokens = createAction(
  '[Tokens] Load',
  props<{ file: File }>()
);

export const loadTokensSuccess = createAction(
  '[Tokens] Load Success',
  props<{ colorScheme: ColorScheme }>()
);

export const loadTokensError = createAction(
  '[Tokens] Load Error',
  props<{ error: string }>()
);

export const parseTokens = createAction(
  '[Tokens] Parse',
  props<{ json: string }>()
);

export const parseTokensSuccess = createAction(
  '[Tokens] Parse Success',
  props<{ colorScheme: ColorScheme }>()
);

export const updateToken = createAction(
  '[Tokens] Update Token',
  props<{ token: Update<TokenColor> }>()
);
