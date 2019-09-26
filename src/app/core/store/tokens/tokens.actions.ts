import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';

import { ColorScheme } from '../../models/color-scheme';
import { TokenColor } from '../../models/token-color';

export const openExportColorSchemeDialog = createAction(
  '[App] Open Export Color Scheme Dialog'
);

export const loadDefaultColorScheme = createAction(
  '[ColorScheme] Load Default Color Scheme',
  props<{ fileName: string }>()
);

export const loadFile = createAction(
  '[ColorScheme] Load From File',
  props<{ file: File }>()
);

export const parseJson = createAction(
  '[ColorScheme] Parse JSON',
  props<{ json: string }>()
);

export const loadColorSchemeSuccess = createAction(
  '[Tokens] Load Color Scheme Success',
  props<{ colorScheme: ColorScheme }>()
);

export const loadColorSchemeError = createAction(
  '[Tokens] Load Color Scheme Error',
  props<{ error: Error }>()
);

export const updateToken = createAction(
  '[Tokens] Update Token',
  props<{ token: Update<TokenColor> }>()
);

export const updateTokens = createAction(
  '[Tokens] Update Tokens',
  props<{ tokens: Update<TokenColor>[] }>()
);

export const resetAllTokens = createAction('[Tokens] Reset All Tokens');
