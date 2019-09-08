import { TokenColorState, tokensReducer } from './tokens.reducer';
import {
  MetaReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';
import * as fromRouter from '@ngrx/router-store';

import { environment } from 'environments/environment';

export const reducers: ActionReducerMap<AppState> = {
  tokens: tokensReducer,
  router: routerReducer
};

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? []
  : [];

export interface AppState {
  tokens: TokenColorState;
  router: fromRouter.RouterReducerState<any>;
}

export const selectTokens = createFeatureSelector<AppState, TokenColorState>(
  'tokens'
);

export const selectRouter = createFeatureSelector<
  AppState,
  fromRouter.RouterReducerState<any>
>('router');

const {
  selectQueryParams, // select the current route query params
  selectQueryParam, // factory function to select a query param
  selectRouteParams, // select the current route params
  selectRouteParam, // factory function to select a route param
  selectRouteData, // select the current route data
  selectUrl // select the current url
} = fromRouter.getSelectors(selectRouter);

export const selectRouteId = selectRouteParam('tokenId');
