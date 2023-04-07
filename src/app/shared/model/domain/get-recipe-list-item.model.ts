import {NutrientModel} from "./nutrient.model";

export interface GetRecipeListItemModel {

  id: number;
  title: string;
  nutrients: NutrientModel;
  portions: number;
  image: Uint8Array;
  favorite: boolean;

}
