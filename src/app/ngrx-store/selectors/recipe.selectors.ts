import {createFeatureSelector, createSelector} from '@ngrx/store';
import {NgrxState} from "../state/ngrx-store.state.model";
import {storeFeatureKey} from "../reducer/store.reducer";

export const selectNgrxState = createFeatureSelector<NgrxState>(storeFeatureKey);


export const selectRecipeList = createSelector(
  selectNgrxState,
  (state) => {
    return {list: state?.recipe.list};
  }
);
export const selectFilteredRecipeList = createSelector(
  selectNgrxState,
  (state) => {
    return {list: state?.recipe.filteredList};
  }
);

export const selectRecipeDetail = createSelector(
  selectNgrxState,
  (state) => {
    return {single: state?.recipe.single};
  }
);
export const selectCreateRecipe = createSelector(
  selectNgrxState,
  (state) => {
    return {add: state?.recipe.add};
  }
);


export const selectUpdateFavoriteStatus = createSelector(
  selectNgrxState,
  (state) => {
    return {update: state?.recipe.updateFavoriteStatus};
  }
);





