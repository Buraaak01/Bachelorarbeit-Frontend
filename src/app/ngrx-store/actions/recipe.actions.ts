import { createAction, props } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import {GetRecipeListItemModel} from "../../shared/model/domain/get-recipe-list-item.model";
import {CreateRecipeModel} from "../../shared/model/domain/create-recipe.model";
import {GetRecipeDetailModel} from "../../shared/model/domain/get-recipe-detail.model";

export const GET_RECIPE_SINGLE = '[RECIPE] GET single init';
export const GET_RECIPE_SINGLE_SUCCESS = '[RECIPE] GET single success';
export const GET_RECIPE_SINGLE_FAILURE = '[RECIPE] GET single failure';

export const getRecipeSingle = createAction(GET_RECIPE_SINGLE, props<{ recipeId: number }>());
export const getRecipeSingleSuccess = createAction(GET_RECIPE_SINGLE_SUCCESS, props<{ payload: GetRecipeDetailModel}>());
export const getRecipeSingleFailure = createAction(GET_RECIPE_SINGLE_FAILURE, props<{ error: HttpErrorResponse | undefined, msg: string }>());


export const GET_RECIPE_LIST = '[RECIPE] GET list init';
export const GET_RECIPE_LIST_SUCCESS = '[RECIPE] GET list success';
export const GET_RECIPE_LIST_FAILURE = '[RECIPE] GET list failure';

export const getRecipeList = createAction(GET_RECIPE_LIST);
export const getRecipeListSuccess = createAction(GET_RECIPE_LIST_SUCCESS, props<{ payload: GetRecipeListItemModel[]}>());
export const getRecipeListFailure = createAction(GET_RECIPE_LIST_FAILURE, props<{ error: HttpErrorResponse | undefined, msg: string }>());

export const UPDATE_FAVORITE_STATUS = '[RECIPE] PUT FAVORITE init';
export const UPDATE_FAVORITE_STATUS_SUCCESS = '[RECIPE] PUT FAVORITE success';
export const UPDATE_FAVORITE_STATUS_FAILURE = '[RECIPE] PUT FAVORITE failure';

export const updateFavoriteStatus = createAction(UPDATE_FAVORITE_STATUS, props<{ recipeId: number }>());
export const updateFavoriteStatusSuccess = createAction(UPDATE_FAVORITE_STATUS_SUCCESS, props<{ recipeId: number, msg: string}>());
export const updateFavoriteStatusFailure = createAction(UPDATE_FAVORITE_STATUS_FAILURE, props<{ error: HttpErrorResponse | undefined, msg: string }>());

export const GET_FILTERED_RECIPES = '[RECIPE] GET FILTERED-RECIPES ';
export const GET_FILTERED_RECIPES_SUCCESS = '[RECIPE] GET FILTERED-RECIPES success';
export const GET_FILTERED_RECIPES_FAILURE = '[RECIPE] GET FILTERED-RECIPES failure';

export const getFilteredRecipes = createAction(GET_FILTERED_RECIPES, props<{ calories: number, proteins: number, fats: number, carbohydrates: number, epsilon: number}>());
export const getFilteredRecipesSuccess = createAction(GET_FILTERED_RECIPES_SUCCESS, props<{ payload: GetRecipeListItemModel[]}>());
export const getFilteredRecipesFailure = createAction(GET_FILTERED_RECIPES_FAILURE, props<{ error: HttpErrorResponse | undefined, msg: string }>());

export const CREATE_RECIPE = '[RECIPE] POST RECIPE init';
export const CREATE_RECIPE_SUCCESS = '[RECIPE] POST RECIPE  success';
export const CREATE_RECIPE_FAILURE = '[RECIPE] POST RECIPE  failure';

export const createRecipe = createAction(CREATE_RECIPE, props<{ payload: CreateRecipeModel }>());
export const createRecipeSuccess = createAction(CREATE_RECIPE_SUCCESS, props<{ payload: CreateRecipeModel, msg: string }>());
export const createRecipeFailure = createAction(CREATE_RECIPE_FAILURE, props<{ error: HttpErrorResponse | undefined, msg: string }>());
