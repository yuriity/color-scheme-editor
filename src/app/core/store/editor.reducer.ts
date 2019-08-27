import { createReducer, on, Action } from '@ngrx/store';

import {
  actionEditorLoadSuccess,
  actionEditorLoadError,
  actionEditorLoad
} from './editor.actions';
import { EditorState } from './core.state';

const initialEditorState: EditorState = {
  loading: false,
  colorScheme: null,
  error: null
};

const reducer = createReducer(
  initialEditorState,
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
