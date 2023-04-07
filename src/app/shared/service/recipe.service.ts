import {Injectable} from '@angular/core';
import {HttpService, Result} from "../infrastructure.rest/http.service";
import {GetRecipeListItemModel} from "../model/domain/get-recipe-list-item.model";
import {HttpParams} from "@angular/common/http";
import {CreateRecipeModel} from "../model/domain/create-recipe.model";
import {GetRecipeDetailModel} from "../model/domain/get-recipe-detail.model";


@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private httpService: HttpService) {
  }

  static readonly BASE_ENDPOINT: string = 'recipes';
  static readonly FAVORITE: string = RecipeService.BASE_ENDPOINT+'/favorites';
  static readonly FILTER: string = RecipeService.BASE_ENDPOINT+'/filter';



  getRecipeList(): Result<GetRecipeListItemModel[]> {
    return this.httpService.get(RecipeService.BASE_ENDPOINT);
  }

  getFilteredRecipes(calories: number, proteins: number, fats: number, carbohydrates: number, epsilon: number): Result<GetRecipeListItemModel[]> {
    let params = new HttpParams()
      if (calories !== null) {
      params = params.set("calories", calories);
    }
    if (proteins !== null) {
      params = params.set("proteins", proteins);
    }
    if (carbohydrates !== null) {
      params = params.set("carbohydrates", carbohydrates);
    }
    if (fats !== null) {
      params = params.set("fats", fats);
    }
    // Epsilon muss gesetzt werden
    params = params.set("epsilon", epsilon);



    return this.httpService.get(RecipeService.FILTER, params);
  }

  getRecipeDetail(recipeId: number): Result<GetRecipeDetailModel> {
    return this.httpService.get(`${RecipeService.BASE_ENDPOINT}/${recipeId}`);
  }

  updateFavoriteStatus(recipeId: number): Result<void> {
    return this.httpService.put(`${RecipeService.FAVORITE}/${recipeId}`, recipeId);
  }

  createRecipe(recipe: CreateRecipeModel): Result<void> {
    return this.httpService.post(`${RecipeService.BASE_ENDPOINT}`, recipe);
  }


}
