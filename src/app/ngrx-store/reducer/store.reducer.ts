import {Action, createReducer, on} from "@ngrx/store";

import {IngredientReducers, RecipeReducers} from "./index";
import {IngredientActions, RecipeActions} from "../actions";
import {initialState, NgrxState} from "../state/ngrx-store.state.model";

export const storeFeatureKey = "ngrx-store";

const storeReducer = createReducer(
  initialState,

  // == RECIPES ==
  on(RecipeActions.getRecipeList, (state) => {
    return RecipeReducers.onGetRecipeList(state);
  }),
  on(RecipeActions.getRecipeListSuccess, (state, action) => {
    return RecipeReducers.onGetRecipeListSuccess(state, action);
  }),
  on(RecipeActions.getRecipeListFailure, (state, action) => {
    return RecipeReducers.onGetRecipeListFailure(state, action);
  }),
  on(RecipeActions.getRecipeSingle, (state) => {
    return RecipeReducers.onGetRecipeSingle(state);
  }),
  on(RecipeActions.getRecipeSingleSuccess, (state, action) => {
    return RecipeReducers.onGetRecipeSingleSuccess(state, action);
  }),
  on(RecipeActions.getRecipeSingleFailure, (state, action) => {
    return RecipeReducers.onGetRecipeSingleFailure(state, action);
  }),
  on(RecipeActions.getFilteredRecipes, (state) => {
    return RecipeReducers.onGetFilteredRecipeList(state);
  }),
  on(RecipeActions.getFilteredRecipesSuccess, (state, action) => {
    return RecipeReducers.onGetFilteredRecipeListSuccess(state, action);
  }),
  on(RecipeActions.getFilteredRecipesFailure, (state, action) => {
    return RecipeReducers.onGetFilteredRecipeListFailure(state, action);
  }),
  on(RecipeActions.updateFavoriteStatus, (state) => {
    return RecipeReducers.onUpdateFavoriteStatus(state);
  }),
  on(RecipeActions.updateFavoriteStatusSuccess, (state, action) => {
    return RecipeReducers.onUpdateFavoriteStatusSuccess(state, action);
  }),
  on(RecipeActions.updateFavoriteStatusFailure, (state, action) => {
    return RecipeReducers.onUpdateFavoriteStatusFailure(state, action);
  }),
  on(RecipeActions.createRecipe, (state) => {
    return RecipeReducers.onCreateRecipe(state);
  }),
  on(RecipeActions.createRecipeSuccess, (state,action) => {
    return RecipeReducers.onCreateRecipeSuccess(state, action);
  }),
  on(RecipeActions.createRecipeFailure, (state, action) => {
    return RecipeReducers.onCreateRecipeFailure(state, action);
  }),

  // == INGREDIENTS ==
  on(IngredientActions.getIngredientList, (state) => {
    return IngredientReducers.onGetIngredientList(state);
  }),
  on(IngredientActions.getIngredientListSuccess, (state, action) => {
    return IngredientReducers.onGetIngredientListSuccess(state, action);
  }),
  on(IngredientActions.getIngredientListFailure, (state, action) => {
    return IngredientReducers.onGetIngredientListFailure(state, action);
  }),
);

export function reducer(state: NgrxState | undefined, action: Action): any {
  return storeReducer(state, action);
}
