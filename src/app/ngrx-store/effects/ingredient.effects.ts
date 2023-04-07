import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, exhaustMap, map, of} from "rxjs";
import {Store} from "@ngrx/store";
import {ApiExceptionHandlerService} from "../../shared/service/util/api-exception-handler.service";
import {IngredientActions} from "../actions";
import {IngredientService} from "../../shared/service/ingredient.service";

@Injectable()
export class IngredientEffects {

  constructor(private actions$: Actions, private ingredientService: IngredientService, private readonly store: Store, private apiExceptionHandlerService: ApiExceptionHandlerService) {
  }


  getIngredientList$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(IngredientActions.getIngredientList),
        exhaustMap(() =>
          this.ingredientService.getIngredientList().pipe(
            map(response => {
              console.log("get ingredient list response:::", response);

              if (response.data) {
                return IngredientActions.getIngredientListSuccess({payload: response.data});
              }

              const message = this.apiExceptionHandlerService.handleError(response.error);
              return IngredientActions.getIngredientListFailure({error: response.error, msg: message});
            }),
            catchError((error: any) => {
              const message = this.apiExceptionHandlerService.handleError(error);
              return of(IngredientActions.getIngredientListFailure({error: error, msg: message}));
            }))
        )
      )

    }
  );


}
