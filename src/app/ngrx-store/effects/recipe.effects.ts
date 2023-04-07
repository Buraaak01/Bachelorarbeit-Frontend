import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, exhaustMap, map, of} from "rxjs";
import {RecipeService} from "../../shared/service/recipe.service";
import {Store} from "@ngrx/store";
import {ApiExceptionHandlerService} from "../../shared/service/util/api-exception-handler.service";
import {RecipeActions} from "../actions";

@Injectable()
export class RecipeEffects {

  constructor(private actions$: Actions, private recipeService: RecipeService, private readonly store: Store, private apiExceptionHandlerService: ApiExceptionHandlerService) {
  }


  getRecipeList$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RecipeActions.getRecipeList),
        exhaustMap(() =>
          this.recipeService.getRecipeList().pipe(
            map(response => {
              console.log("get recipe list response:::", response);

              if (response.data) {
                return RecipeActions.getRecipeListSuccess({payload: response.data});
              }

              const message = this.apiExceptionHandlerService.handleError(response.error);
              return RecipeActions.getRecipeListFailure({error: response.error, msg: message});
            }),
            catchError((error: any) => {
              const message = this.apiExceptionHandlerService.handleError(error);
              return of(RecipeActions.getRecipeListFailure({error: error, msg: message}));
            }))
        )
      )

    }
  );

  getRecipeSingle = createEffect(() => {
      return this.actions$.pipe(
        ofType(RecipeActions.getRecipeSingle),
        exhaustMap(action =>
          this.recipeService.getRecipeDetail(action.recipeId).pipe(
            map(response => {
              console.log("get recipe single response:::", response)

              if (response.data) {
                return RecipeActions.getRecipeSingleSuccess({payload: response.data});
              }

              const message = this.apiExceptionHandlerService.handleError(response.error);
              return RecipeActions.getRecipeSingleFailure({error: response.error, msg: message});
            }),
            catchError((error: any) => {
              const message = this.apiExceptionHandlerService.handleError(error);
              return of(RecipeActions.getRecipeSingleFailure({error: error, msg: message}));
            }))
        )
      )
    }
  );

  createFavorite$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RecipeActions.updateFavoriteStatus),
        exhaustMap(action => this.recipeService.updateFavoriteStatus(action.recipeId).pipe(
          map(() => {
            return RecipeActions.updateFavoriteStatusSuccess({
              recipeId: action.recipeId,
              msg: 'Recipe status updated successfully.'
            });
          }),
          catchError((error: any) => {
            const message = this.apiExceptionHandlerService.handleError(error);
            return of(RecipeActions.updateFavoriteStatusFailure({error: error, msg: message}));
          }))
        )
      )
    }
  );

  getFilteredRecipes = createEffect(() => {
      return this.actions$.pipe(
        ofType(RecipeActions.getFilteredRecipes),
        exhaustMap((action) =>
          this.recipeService.getFilteredRecipes(action.calories, action.proteins, action.fats, action.carbohydrates, action.epsilon,).pipe(
            map(response => {
              console.log("get filtered recipes response:::", response);

              if (response.data) {
                return RecipeActions.getFilteredRecipesSuccess({payload: response.data});
              }

              const message = this.apiExceptionHandlerService.handleError(response.error);
              return RecipeActions.getFilteredRecipesFailure({error: response.error, msg: message});
            }),
            catchError((error: any) => {
              const message = this.apiExceptionHandlerService.handleError(error);
              return of(RecipeActions.getFilteredRecipesFailure({error: error, msg: message}));
            }))
        )
      )

    }
  );

  createRecipe$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(RecipeActions.createRecipe),
        exhaustMap(action =>
          this.recipeService.createRecipe(action.payload).pipe(
            map(response => {
              console.log("post recipe response:::", response);

              return RecipeActions.createRecipeSuccess({
                payload: action.payload,
                msg: 'Recipe '+ action.payload.title +' created successfully.'
              });
            }),
            catchError((error: any) => {
              let message = this.apiExceptionHandlerService.handleError(error);
              return of(RecipeActions.createRecipeFailure({
                error: error,
                msg: message
              }));
            })
          ))
      )
    }
  );


}
