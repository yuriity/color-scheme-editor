import { MetaReducer, ActionReducerMap } from '@ngrx/store';

import { environment } from 'environments/environment';
import { ColorScheme } from '../models/color-scheme';
import { editorReducer } from './editor.reducer';

export interface EditorState {
  loading: boolean;
  colorScheme: ColorScheme | null;
  error: string | null;
}

export interface AppState {
  editor: EditorState;
}

export const selectEditorState = (state: AppState) => state.editor;
export const selectColorScheme = (state: AppState) => state.editor.colorScheme;

export const reducers: ActionReducerMap<AppState> = {
  editor: editorReducer
};

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? []
  : [];
