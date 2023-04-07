import {NgrxState} from "../state/ngrx-store.state.model";
import {XhrState} from "../../shared/model/util/XhrState";
import clone from "just-clone";
import {getIngredientListFailure, getIngredientListSuccess} from "../actions/ingredient.actions";


export function onGetIngredientList(state: NgrxState) {
  let newState = clone(state);

  newState.ingredient.xhr = <XhrState>{
    pending: true,
    done: false,
    succeeded: false,
    failed: false,
    payload: null,
    error: null
  };

  return newState;
}

export function onGetIngredientListSuccess(state: NgrxState, action: ReturnType<typeof getIngredientListSuccess>) {
  let newState = clone(state);

  newState.ingredient.xhr = <XhrState>{
    pending: false,
    done: true,
    succeeded: true,
    failed: false,
    payload: action.payload,
    error: null
  };

  newState.ingredient.data = action.payload;

  return newState;
}

export function onGetIngredientListFailure(state: NgrxState,  action: ReturnType<typeof getIngredientListFailure>) {
  let newState = clone(state);

  newState.ingredient.xhr = <XhrState>{
    pending: false,
    done: true,
    succeeded: false,
    failed: true,
    payload: null,
    error: action.error
  };
  newState.ingredient.data = [];

  return newState;
}
