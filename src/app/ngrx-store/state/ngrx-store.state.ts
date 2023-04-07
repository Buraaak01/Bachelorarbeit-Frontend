import { ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import { reducer, storeFeatureKey } from '../reducer/store.reducer';
import { NgrxState } from "./ngrx-store.state.model";

export interface AppState {
  [storeFeatureKey]: NgrxState
}

export const reducers: ActionReducerMap<AppState> = {
  [storeFeatureKey]: reducer
};

// console.log alle actions
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state: any, action: any) {
    console.debug('action', action);
    console.debug('state', state);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = [debug];
