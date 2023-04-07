import {Injectable} from '@angular/core';
import {HttpService, Result} from "../infrastructure.rest/http.service";
import {GetIngredientModel} from "../model/domain/get-ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private httpService: HttpService) {
  }

  static readonly BASE_ENDPOINT: string = 'ingredients';

  getIngredientList(): Result<GetIngredientModel[]> {
    return this.httpService.get(IngredientService.BASE_ENDPOINT);
  }
}
