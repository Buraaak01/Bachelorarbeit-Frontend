import {createAction, props} from "@ngrx/store";
import {HttpErrorResponse} from "@angular/common/http";
import {GetIngredientModel} from "../../shared/model/domain/get-ingredient.model";

export const GET_INGREDIENT_LIST = '[INGREDIENT] GET list init';
export const GET_INGREDIENT_LIST_SUCCESS = '[INGREDIENT] GET list success';
export const GET_INGREDIENT_LIST_FAILURE = '[INGREDIENT] GET list failure';

export const getIngredientList = createAction(GET_INGREDIENT_LIST);
export const getIngredientListSuccess = createAction(GET_INGREDIENT_LIST_SUCCESS, props<{ payload: GetIngredientModel[]}>());
export const getIngredientListFailure = createAction(GET_INGREDIENT_LIST_FAILURE, props<{ error: HttpErrorResponse | undefined, msg: string }>());
