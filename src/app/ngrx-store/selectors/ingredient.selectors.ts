import {createFeatureSelector, createSelector} from '@ngrx/store';
import {NgrxState} from "../state/ngrx-store.state.model";
import {storeFeatureKey} from "../reducer/store.reducer";

export const selectNgrxState = createFeatureSelector<NgrxState>(storeFeatureKey);


export const selectIngredientList = createSelector(
  selectNgrxState,
  (state) => {
    return {list: state?.ingredient};
  }
);




