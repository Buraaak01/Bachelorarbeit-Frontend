import {NutrientModel} from "./nutrient.model";

export interface GetRecipeDetailModel {

  id: number;
  title: string;
  nutrients: NutrientModel;
  preparation: string
  portions: number;
  ingredients: string[];
  image: Uint8Array;
  favorite: boolean;

}
