import { ColorSchemeMetadata } from './../models/color-scheme-metadata';
import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as tinycolor from 'tinycolor2';

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
  ids: [0, 1, 2, 3, 4],
  entities: {
    0: {
      id: 0,
      name: 'fail',
      scope: 'scope',
      color: tinycolor('#000000'),
      readability: 1.0006122113242268
    },
    1: {
      id: 1,
      name: 'aa-large',
      scope: 'scope1, scope2',
      color: tinycolor('#7F7F7F'),
      readability: 4.163514325404547
    },
    2: {
      id: 2,
      name: 'aa',
      scope: 'scope1, scope2, scope3',
      color: tinycolor('#8F8F8F'),
      readability: 5.15499651233818
    },
    3: {
      id: 3,
      name: 'aaa',
      scope: 'scope1, scope2, scope3, scope4',
      color: tinycolor('#FFFFFF'),
      readability: 16.67115667431794
    },
    4: {
      id: 4,
      name: 'transparent',
      scope: 'scope1, scope2, scope3',
      color: tinycolor('#FFFFFFB0'),
      readability: 16.67115667431794
    }
  },
  loading: false,
  error: null,
  metadata: { name: 'Test Theme', background: tinycolor('#1E1E1E') }
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

const { selectAll, selectTotal } = editorAdapter.getSelectors();

export const selectAllTokenColors = selectAll;

export const selectTokenColorsTotal = selectTotal;
