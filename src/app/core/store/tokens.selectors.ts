import { createSelector } from '@ngrx/store';

import { tokensAdapter, TokenColorState } from './tokens.reducer';
import { selectTokens, selectRouteId } from './core.state';
import {
  TokenColorResource,
  ReadonlyTokenColorResource
} from '../models/token-color.resource';

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

export const selectReadonlyTokens = createSelector(
  selectAllTokens,
  selectColorSchemeMetadata,
  (tokens, metadata) => {
    return tokens.map(
      token =>
        new TokenColorResource(
          token,
          metadata.background
        ) as ReadonlyTokenColorResource
    );
  }
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
