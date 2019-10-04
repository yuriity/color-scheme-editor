import { ColorSchemeMetadata } from '../../models/color-scheme-metadata';
import { createReducer, Action, on } from '@ngrx/store';
import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import * as tinycolor from 'tinycolor2';

import {
  updateToken,
  updateTokens,
  loadFile,
  loadColorSchemeSuccess,
  parseJson,
  loadColorSchemeError
} from './tokens.actions';
import { TokenColor } from '../../models/token-color';

export interface TokenColorState extends EntityState<TokenColor> {
  loading: boolean;
  error?: Error;
  metadata?: ColorSchemeMetadata;
}

export const tokensAdapter: EntityAdapter<TokenColor> = createEntityAdapter<TokenColor>();

const initialTokensState: TokenColorState = tokensAdapter.getInitialState({
  ids: [],
  entities: {},
  metadata: { name: '', background: tinycolor() },
  loading: false,
  error: null
});

// const initialTokensState: TokenColorState = tokensAdapter.getInitialState({
//   ids: [5, 6, 0, 1, 2, 3, 4],
//   entities: {
//     0: {
//       id: 0,
//       originalName: 'fail',
//       originalScope: 'scope',
//       originalColor: tinycolor('#000000'),
//       originalFontStyle: 'bold',
//       fontStyle: 'bold italic underline'
//     },
//     1: {
//       id: 1,
//       originalName: 'aa-large',
//       originalScope: 'scope1, scope2',
//       originalColor: tinycolor('#7F7F7F'),
//       originalFontStyle: 'italic'
//     },
//     2: {
//       id: 2,
//       originalName: 'aa',
//       originalScope: 'scope1, scope2, scope3',
//       originalColor: tinycolor('#8F8F8F'),
//       originalFontStyle: 'underline'
//     },
//     3: {
//       id: 3,
//       originalName: 'aaa',
//       originalScope: 'scope1, scope2, scope3, scope4',
//       originalColor: tinycolor('#FFFFFF'),
//       originalFontStyle: 'bold italic underline'
//     },
//     4: {
//       id: 4,
//       originalName: 'transparent',
//       originalScope: 'scope1, scope2, scope3',
//       originalColor: tinycolor('#FFFFFFB0')
//     },
//     5: {
//       id: 5,
//       originalName:
//         'Very long name and scope, very very very very very very very very very very very very very very very long',
//       originalScope:
//         'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur',
//       originalColor: tinycolor('#FFFFFFB0')
//     },
//     6: {
//       id: 6,
//       originalName:
//         'Very_long_name_and_scope,_very_very_very_very_very_very_very_very_very_very_very_very_very_very_very_long',
//       originalScope:
//         'Lorem_ipsum_dolor_sit_amet_consectetuer_adipiscing_elit._Aenean_commodo_ligula_eget_dolor._Aenean_massa._Cum_sociis_natoque_penatibus_et_magnis_dis_parturient_montes,_nascetur',
//       originalColor: tinycolor('#FFFFFFB0')
//     }
//   },
//   metadata: { name: 'Test Theme', background: tinycolor('#1E1E1E') },
//   loading: false,
//   error: null
// });

const reducer = createReducer(
  initialTokensState,
  on(updateToken, (state, { token }) => {
    return tokensAdapter.updateOne(token, state);
  }),
  on(updateTokens, (state, { tokens }) => {
    return tokensAdapter.updateMany(tokens, state);
  }),
  on(loadFile, state => ({
    ...state,
    ids: [],
    entities: {},
    loading: true,
    error: null,
    metadata: null
  })),
  on(parseJson, state => ({
    ...state,
    ids: [],
    entities: {},
    loading: true,
    error: null,
    metadata: null
  })),
  on(loadColorSchemeSuccess, (state, { colorScheme }) =>
    tokensAdapter.addAll(colorScheme.tokenColors, {
      ...state,
      loading: false,
      error: null,
      metadata: colorScheme.metadata
    })
  ),
  on(loadColorSchemeError, (state, { error }) => ({
    ...state,
    ids: [],
    entities: {},
    loading: false,
    error,
    metadata: null
  }))
);

export function tokensReducer(state: TokenColorState | undefined, action: Action) {
  return reducer(state, action);
}
