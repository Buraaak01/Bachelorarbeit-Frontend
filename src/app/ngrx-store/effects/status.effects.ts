import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map} from "rxjs";
import {
  IngredientActions,
  RecipeActions,
  StatusActions
} from "../actions";
import {AlertService} from "../../shared/service/util/alert.service";
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class StatusEffects {

  constructor(private actions$: Actions, private alertService: AlertService) {

  }

  handleError$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(
          RecipeActions.getRecipeListFailure,
          RecipeActions.updateFavoriteStatusFailure,
          RecipeActions.getFilteredRecipesFailure,
          RecipeActions.getRecipeSingleFailure,
          RecipeActions.createRecipeFailure,
          IngredientActions.getIngredientListFailure
        ),
        map((action) => {
          return StatusActions.reportGeneralError({
            error: action.error || new HttpErrorResponse({statusText: action.msg}),
            msg: action.msg
          })
        })
      )
    }
  );

  handleSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(
          RecipeActions.updateFavoriteStatusSuccess,
          RecipeActions.createRecipeSuccess,
        ),
        map((action) => StatusActions.reportGeneralSuccess({
            msg: action.msg
          })
        )
      )
    }
  );

  error$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(StatusActions.reportGeneralError),
        map((action) => {
            this.alertService.error(action.msg);
          }
        )
      )
    }, {dispatch: false}
  );


  success$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(StatusActions.reportGeneralSuccess),
        map((action) => {
            this.alertService.success(action.msg);
          }
        )
      )
    }, {dispatch: false}
  );

}
