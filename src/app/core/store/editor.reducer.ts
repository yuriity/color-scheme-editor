import { ColorSchemeMetadata } from './../models/color-scheme-metadata';
import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import {
  actionEditorLoadSuccess,
  actionEditorLoadError,
  actionEditorLoad
} from './editor.actions';
import { TokenColor } from '../models/token-color';

export interface EditorState extends EntityState<TokenColor> {
  loading: boolean;
  error: string | null;
  metadata: ColorSchemeMetadata | null;
}

export const editorAdapter: EntityAdapter<TokenColor> = createEntityAdapter<
  TokenColor
>();

const initialEditorState: EditorState = editorAdapter.getInitialState({
  ids: [],
  entities: {},
  loading: false,
  error: null,
  metadata: null
});

const reducer = createReducer(
  initialEditorState,
  on(actionEditorLoad, state => ({
    ...state,
    ids: [],
    entities: {},
    loading: true,
    error: null,
    metadata: null
  })),
  on(actionEditorLoadSuccess, (state, { colorScheme }) =>
    editorAdapter.addAll(colorScheme.tokenColors, {
      ...state,
      loading: false,
      error: null,
      metadata: colorScheme.metadata
    })
  ),
  on(actionEditorLoadError, (state, { error }) => ({
    ...state,
    ids: [],
    entities: {},
    loading: true,
    error,
    metadata: null
  }))
);

export function editorReducer(state: EditorState | undefined, action: Action) {
  return reducer(state, action);
}
