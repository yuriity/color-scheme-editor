import { createReducer, on, Action } from '@ngrx/store';

import { EditorState } from './editor.state';
import {
  actionEditorLoadSuccess,
  actionEditorLoadError,
  actionEditorLoad
} from './editor.actions';

export const initialState: EditorState = { loading: false };

const reducer = createReducer(
  initialState,
  on(actionEditorLoad, state => ({
    ...state,
    loading: true,
    colorScheme: null,
    error: null
  })),
  on(actionEditorLoadSuccess, (state, { colorScheme }) => ({
    ...state,
    loading: false,
    colorScheme,
    error: null
  })),
  on(actionEditorLoadError, (state, { error }) => ({
    ...state,
    loading: false,
    colorScheme: null,
    error
  }))
);

export function editorReducer(state: EditorState | undefined, action: Action) {
  return reducer(state, action);
}
