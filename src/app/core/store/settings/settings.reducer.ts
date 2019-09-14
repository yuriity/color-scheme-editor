import { createReducer, on, Action } from '@ngrx/store';

import { settingsChangeTheme } from './settings.actions';

export interface SettingsState {
  theme: string;
}

export const initialState: SettingsState = {
  theme: 'light-theme'
};

const reducer = createReducer(
  initialState,
  on(settingsChangeTheme, (state, action) => ({ ...state, ...action }))
);

export function settingsReducer(
  state: SettingsState | undefined,
  action: Action
) {
  return reducer(state, action);
}
