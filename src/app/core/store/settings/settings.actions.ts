import { createAction, props } from '@ngrx/store';

export const settingsChangeTheme = createAction(
  '[Settings] Change Theme',
  props<{ theme: string }>()
);
