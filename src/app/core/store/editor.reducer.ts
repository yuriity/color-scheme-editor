import { ColorSchemeMetadata } from './../models/color-scheme-metadata';
import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import {
  actionEditorLoadSuccess,
  actionEditorLoadError,
  actionEditorLoad
} from './editor.actions';
import { TokenColor } from '../models/token-color';
import * as tinycolor from 'tinycolor2';

export interface EditorState extends EntityState<TokenColor> {
  loading: boolean;
  error: string | null;
  metadata: ColorSchemeMetadata | null;
}

export const editorAdapter: EntityAdapter<TokenColor> = createEntityAdapter<
  TokenColor
>();

const initialEditorState: EditorState = editorAdapter.getInitialState({
  ids: ['001', '002', '003', '004'],
  entities: {
    '001': {
      id: '001',
      name: 'fail',
      scope: 'scope',
      color: tinycolor('#000000'),
      readability: 1.0006122113242268
    },
    '002': {
      id: '002',
      name: 'aa-large',
      scope: 'scope1, scope2',
      color: tinycolor('#7F7F7F'),
      readability: 4.163514325404547
    },
    '003': {
      id: '003',
      name: 'aa',
      scope: 'scope1, scope2, scope3',
      color: tinycolor('#8F8F8F'),
      readability: 5.15499651233818
    },
    '004': {
      id: '004',
      name: 'aaa',
      scope: 'scope1, scope2, scope3, scope4',
      color: tinycolor('#FFFFFF'),
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

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = editorAdapter.getSelectors();

// select the array of user ids
export const selectTokenColorIds = selectIds;

// select the dictionary of user entities
export const selectTokenColorEntities = selectEntities;

// select the array of users
export const selectAllTokenColors = selectAll;

// select the total user count
export const selectTokenColorsTotal = selectTotal;
