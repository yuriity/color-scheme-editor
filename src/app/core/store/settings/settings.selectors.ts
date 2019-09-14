import { createSelector } from '@ngrx/store';
import { selectSettingsState } from '../core.state';
import { SettingsState } from './settings.reducer';

export const selectSettings = createSelector(
  selectSettingsState,
  (state: SettingsState) => state
);

export const selectTheme = createSelector(
  selectSettings,
  settings => settings.theme
);
