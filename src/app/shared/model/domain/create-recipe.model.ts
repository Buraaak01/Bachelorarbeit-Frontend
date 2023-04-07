import {CreateIngredientModel} from "./create-ingredient.model";

export interface CreateRecipeModel {
  title: string;
  portions: number;
  ingredients: CreateIngredientModel[];
  preparation: string;
  image: string;

}
