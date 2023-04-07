import {NgrxState} from "../state/ngrx-store.state.model";
import {XhrState} from "../../shared/model/util/XhrState";
import clone from "just-clone";
import {
  createRecipeFailure,
  createRecipeSuccess, getFilteredRecipesFailure, getFilteredRecipesSuccess, getRecipeListFailure, getRecipeListSuccess,
  updateFavoriteStatusFailure,
  updateFavoriteStatusSuccess
} from "../actions/recipe.actions";


export function onGetRecipeList(state: NgrxState) {
  let newState = clone(state);

  newState.recipe.list.xhr = <XhrState>{
    pending: true,
    done: false,
    succeeded: false,
    failed: false,
    payload: null,
    error: null
  };

  return newState;
}

export function onGetRecipeListSuccess(state: NgrxState, action: ReturnType<typeof getRecipeListSuccess>) {
  let newState = clone(state);

  newState.recipe.list.xhr = <XhrState>{
    pending: false,
    done: true,
    succeeded: true,
    failed: false,
    payload: action.payload,
    error: null
  };
  newState.recipe.list.data = action.payload;

  return newState;
}

export function onGetRecipeListFailure(state: NgrxState,  action: ReturnType<typeof getRecipeListFailure>) {
  let newState = clone(state);

  newState.recipe.list.xhr = <XhrState>{
    pending: false,
    done: true,
    succeeded: false,
    failed: true,
    payload: null,
    error: action.error
  };
  newState.recipe.list.data = [];

  return newState;
}

export function onGetRecipeSingle(state: NgrxState) {
  let newState = clone(state);

  newState.recipe.single.xhr = <XhrState>{
    pending: true,
    done: false,
    succeeded: false,
    failed: false,
    payload: null,
    error: null
  };

  return newState;
}

export function onGetRecipeSingleSuccess(state: NgrxState, action: any) {
  let newState = clone(state);

  newState.recipe.single.xhr = <XhrState>{
    pending: false,
    done: true,
    succeeded: true,
    failed: false,
    payload: state.recipe.single.data,
    error: null
  };

  newState.recipe.single.data = action.payload;

  return newState;
}

export function onGetRecipeSingleFailure(state: NgrxState, action: any) {
  let newState = clone(state);

  newState.recipe.single.xhr = <XhrState>{
    pending: false,
    done: true,
    succeeded: false,
    failed: true,
    payload: state.recipe.single.data,
    error: action.error
  };
  newState.recipe.single.data = null as any;

  return newState;
}

export function onGetFilteredRecipeList(state: NgrxState) {
  let newState = clone(state);

  newState.recipe.filteredList.xhr = <XhrState>{
    pending: true,
    done: false,
    succeeded: false,
    failed: false,
    payload: null,
    error: null
  };

  return newState;
}

export function onGetFilteredRecipeListSuccess(state: NgrxState,  action: ReturnType<typeof getFilteredRecipesSuccess>) {
  let newState = clone(state);

  newState.recipe.filteredList.xhr = <XhrState>{
    pending: false,
    done: true,
    succeeded: true,
    failed: false,
    payload: action.payload,
    error: null
  };
  newState.recipe.filteredList.data = action.payload;

  return newState;
}

export function onGetFilteredRecipeListFailure(state: NgrxState, action: ReturnType<typeof getFilteredRecipesFailure>) {
  let newState = clone(state);

  newState.recipe.filteredList.xhr = <XhrState>{
    pending: false,
    done: true,
    succeeded: false,
    failed: true,
    payload: null,
    error: action.error
  };
  newState.recipe.filteredList.data = [];

  return newState;
}


export function onUpdateFavoriteStatus(state: NgrxState) {
  let newState = clone(state);

  newState.recipe.updateFavoriteStatus.xhr = <XhrState>{
    pending: true,
    done: false,
    succeeded: false,
    failed: false,
    payload: null,
    error: null
  };

  return newState;
}

export function onUpdateFavoriteStatusSuccess(state: NgrxState, action: ReturnType<typeof updateFavoriteStatusSuccess>) {
  let newState = clone(state);

  newState.recipe.updateFavoriteStatus.xhr = <XhrState>{
    pending: false,
    done: true,
    succeeded: true,
    failed: false,
    error: null
  };

  newState.recipe.updateFavoriteStatus.data = action.recipeId;


  return newState;
}

export function onUpdateFavoriteStatusFailure(state: NgrxState, action: ReturnType<typeof updateFavoriteStatusFailure>) {
  let newState = clone(state);

  newState.recipe.updateFavoriteStatus.xhr = <XhrState>{
    pending: false,
    done: true,
    succeeded: false,
    failed: true,
    payload: state.recipe.updateFavoriteStatus.data,
    error: action.error
  };

  return newState;
}

export function onCreateRecipe(state: NgrxState) {
  let newState = clone(state);

  newState.recipe.add.xhr = <XhrState>{
    pending: true,
    done: false,
    succeeded: false,
    failed: false,
    payload: null,
    error: null
  };

  return newState;
}

export function onCreateRecipeSuccess(state: NgrxState, action: ReturnType<typeof createRecipeSuccess>) {
  let newState = clone(state);

  newState.recipe.add.xhr = <XhrState>{
    pending: false,
    done: true,
    succeeded: true,
    failed: false,
    payload: action.payload,
    error: null
  };
  newState.recipe.add.data = action.payload;
  return newState;
}

export function onCreateRecipeFailure(state: NgrxState, action: ReturnType<typeof createRecipeFailure>) {
  let newState = clone(state);

  newState.recipe.add.xhr = <XhrState>{
    pending: false,
    done: true,
    succeeded: false,
    failed: true,
    payload: null,
    error: action.error
  };

  return newState;
}


