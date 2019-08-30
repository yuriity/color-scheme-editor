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
      originalName: 'fail',
      originalScope: 'scope',
      originalColor: tinycolor('#000000'),
      originalFontStyle: 'bold'
    },
    1: {
      id: 1,
      originalName: 'aa-large',
      originalScope: 'scope1, scope2',
      originalColor: tinycolor('#7F7F7F'),
      originalFontStyle: 'italic'
    },
    2: {
      id: 2,
      originalName: 'aa',
      originalScope: 'scope1, scope2, scope3',
      originalColor: tinycolor('#8F8F8F'),
      originalFontStyle: 'underline'
    },
    3: {
      id: 3,
      originalName: 'aaa',
      originalScope: 'scope1, scope2, scope3, scope4',
      originalColor: tinycolor('#FFFFFF'),
      originalFontStyle: 'bold italic underline'
    },
    4: {
      id: 4,
      originalName: 'transparent',
      originalScope: 'scope1, scope2, scope3',
      originalColor: tinycolor('#FFFFFFB0')
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
