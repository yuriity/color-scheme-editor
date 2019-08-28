import { MetaReducer, ActionReducerMap, createSelector } from '@ngrx/store';

import { environment } from 'environments/environment';
import {
  editorReducer,
  EditorState,
  selectAllTokenColors
} from './editor.reducer';

export interface AppState {
  editor: EditorState;
}

export const selectEditorState = (state: AppState) => state.editor;
export const selectAllTokens = createSelector(
  selectEditorState,
  selectAllTokenColors
);

export const reducers: ActionReducerMap<AppState> = {
  editor: editorReducer
};

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? []
  : [];
