import { createSelector } from '@ngrx/store';

import { tokensAdapter, TokenColorState } from './tokens.reducer';
import { selectTokens, selectRouteId } from './core.state';

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

export const selectTokensWithBackground = createSelector(
  selectAllTokens,
  selectColorSchemeMetadata,
  (tokens, metadata) => {
    return { tokens, metadata };
  }
);

export const selectSelectedToken = createSelector(
  selectTokens,
  selectRouteId,
  (entities, routeId) => routeId && entities[routeId]
);
