import { VSCodeSettings } from './../../models/vscode-settings';
import { createSelector } from '@ngrx/store';

import { tokensAdapter, TokenColorState } from './tokens.reducer';
import { selectTokens, selectRouteId } from '../core.state';
import { TokenColorResource } from '../../models/token-color.resource';
import { ColorSchemeResource } from '../../models/color-scheme.resource';
import { isTokenModified } from '../../models/token-color';

const { selectEntities, selectAll, selectTotal } = tokensAdapter.getSelectors();

export const selectAllTokens = createSelector(
  selectTokens,
  selectAll
);

export const selectTokensTotal = createSelector(
  selectTokens,
  selectTotal
);

export const selectTokensEntities = createSelector(
  selectTokens,
  selectEntities
);

export const selectTokensLoading = createSelector(
  selectTokens,
  (state: TokenColorState) => state.loading
);

export const selectColorSchemeMetadata = createSelector(
  selectTokens,
  (state: TokenColorState) => state.metadata
);

export const selectColorScheme = createSelector(
  selectAllTokens,
  selectColorSchemeMetadata,
  (tokens, metadata) => {
    if (!metadata) {
      return new ColorSchemeResource('', []);
    }
    return new ColorSchemeResource(
      metadata.name,
      tokens.map(token => new TokenColorResource(token, metadata.background))
    );
  }
);

export const selectModifiedTokens = createSelector(
  selectAllTokens,
  tokens => tokens.filter(token => isTokenModified(token))
);

export const selectModifiedTokensTotal = createSelector(
  selectModifiedTokens,
  tokens => tokens.length
);

export const selectSelectedToken = createSelector(
  selectTokensEntities,
  selectRouteId,
  (entities, routeId) => entities[Number(routeId)]
);

export const selectSelectedTokenResource = createSelector(
  selectSelectedToken,
  selectColorSchemeMetadata,
  (token, metadata) => {
    if (token) {
      return new TokenColorResource(token, metadata.background);
    }
    return null;
  }
);

export const selectVSCodeSettings = createSelector(
  selectModifiedTokens,
  selectColorSchemeMetadata,
  (tokens, metadata) => {
    return new VSCodeSettings(tokens, metadata.name);
  }
);
