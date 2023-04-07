import {GetRecipeListItemModel} from "../../shared/model/domain/get-recipe-list-item.model";
import {initialXhrState, XhrState} from "../../shared/model/util/XhrState";
import {GetIngredientModel} from "../../shared/model/domain/get-ingredient.model";
import {GetRecipeDetailModel} from "../../shared/model/domain/get-recipe-detail.model";
import {CreateRecipeModel} from "../../shared/model/domain/create-recipe.model";


export interface NgrxState {
  errors: any[];
  recipe: {
    list: {
      data: GetRecipeListItemModel[];
      xhr: XhrState;
    },
    filteredList: {
      data: GetRecipeListItemModel[];
      xhr: XhrState;
    },
    single: {
      data: GetRecipeDetailModel;
      xhr: XhrState;
    },
    add:{
      data: CreateRecipeModel;
      xhr: XhrState
    }
    updateFavoriteStatus: {
      data: number;
      xhr: XhrState;
    },
  },
  ingredient: {
    data: GetIngredientModel[];
    xhr: XhrState;
  }
}

export const initialState: NgrxState = {
  errors: [],
  recipe: {
    list: {
      data: [],
      xhr: initialXhrState
    },
    filteredList: {
      data: [],
      xhr: initialXhrState
    },
    single: {
      data: null as any,
      xhr: initialXhrState
    },
    add:{
      data: null as any,
      xhr: initialXhrState
    },
    updateFavoriteStatus: {
      data: null as any,
      xhr: initialXhrState
    }
  },
  ingredient: {
    data: [],
    xhr: initialXhrState
  }
}
