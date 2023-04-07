import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription, withLatestFrom} from "rxjs";
import {Store} from "@ngrx/store";
import {RecipeActions} from "../../ngrx-store/actions";
import {RecipeSelectors} from "../../ngrx-store/selectors";
import {GetRecipeListItemModel} from "../../shared/model/domain/get-recipe-list-item.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {Actions, ofType} from "@ngrx/effects";
import clone from "just-clone";

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {


  recipeList: GetRecipeListItemModel[] = [];
  temporaryRecipeList: GetRecipeListItemModel[] = []

  isFavoriteOnly = new FormControl(false);

  filterFormGroup = new FormGroup({
    proteins: new FormControl(),
    carbohydrates: new FormControl(),
    fats: new FormControl(),
    calories: new FormControl(),
    epsilon: new FormControl(),
  });

  sortOptions = [
    {value: 'calories_asc', label: 'Calories (Ascending)'},
    {value: 'calories_desc', label: 'Calories (Descending)'},
    {value: 'proteins_asc', label: 'Proteins (Ascending)'},
    {value: 'proteins_desc', label: 'Proteins (Descending)'},
    {value: 'fats_asc', label: 'Fats (Ascending)'},
    {value: 'fats_desc', label: 'Fats (Descending)'},
    {value: 'carbohydrates_asc', label: 'Carbohydrates (Ascending)'},
    {value: 'carbohydrates_desc', label: 'Carbohydrates (Descending)'}
  ];
  selectedSortOption: any;
  loading: boolean = true;
  subscriptions: Subscription = new Subscription();


  // == PAGINATION ==
  pageSize: number = 12;
  page = 1;


  constructor(private readonly store: Store, private router: Router, private sanitizer: DomSanitizer, private actions$: Actions) {
  }

  ngOnInit() {
    this.loadInitialData();
    this.selectFromStore();
    this.initFormGroup()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  loadInitialData() {
    this.store.dispatch(RecipeActions.getRecipeList());
    this.filterFormGroup.reset();
    this.initFormGroup();
  }


  private selectFromStore() {

    this.subscriptions.add(
      this.actions$.pipe(
        ofType(RecipeActions.getRecipeList),
      ).subscribe(() => {
        this.loading = true;
      })
    );

    // Liste Erfolgsfall
    this.subscriptions.add(
      this.actions$.pipe(
        ofType(RecipeActions.getRecipeListSuccess),
        withLatestFrom(this.store.select(RecipeSelectors.selectRecipeList)),
      ).subscribe(([, response]) => {
        this.isFavoriteOnly.patchValue(false)
        this.selectedSortOption = undefined
        this.recipeList = clone(response.list.data);
        this.loading = false;
      })
    );


    // Liste Fehlerfall
    this.subscriptions.add(
      this.actions$.pipe(
        ofType(RecipeActions.getRecipeListFailure),
      ).subscribe(() => {
        this.loading = false;
      })
    );


    // Gefilterte Liste Erfolgsfall
    this.subscriptions.add(
      this.actions$.pipe(
        ofType(RecipeActions.getFilteredRecipesSuccess),
        withLatestFrom(this.store.select(RecipeSelectors.selectFilteredRecipeList)),
      ).subscribe(([, response]) => {
        this.isFavoriteOnly.patchValue(false)
        this.recipeList = clone(response.list.data);
        this.selectedSortOption = undefined
        this.loading = false;
      })
    );


    // Gefilterte Liste Fehlerfall
    this.subscriptions.add(
      this.actions$.pipe(
        ofType(RecipeActions.getFilteredRecipesFailure),
        withLatestFrom(this.store.select(RecipeSelectors.selectFilteredRecipeList)),
      ).subscribe(([, response]) => {
        this.isFavoriteOnly.patchValue(false)
        this.recipeList = clone(response.list.data);//recipeList ist leer [] -> reducer
        this.loading = false;
      })
    );


    // Favoriten Erfolgsfall
    this.subscriptions.add(
      this.actions$.pipe(
        ofType(RecipeActions.updateFavoriteStatusSuccess),
        withLatestFrom(this.store.select(RecipeSelectors.selectUpdateFavoriteStatus)),
      ).subscribe(([, response]) => {
        let recipeId = response.update?.data;
        // aendert den Favoritenstatus des Rezept-Eintrags anhand der id
        this.recipeList = this.recipeList.map(recipe => {
          if (recipe.id === recipeId) {
            return {...recipe, favorite: !recipe.favorite};
          }
          return recipe;
        });
        if (this.isFavoriteOnly.value) {
          this.temporaryRecipeList = this.temporaryRecipeList.map(recipe => {
            if (recipe.id === recipeId) {
              return {...recipe, favorite: !recipe.favorite};
            }
            return recipe;
          });
        }

        // Entferne das Rezept aus der Favoriten-Ansicht, wenn diese Ansicht auch gerade in der Oberfleache angezeigt wird
        if (this.isFavoriteOnly.value) {
          this.recipeList = this.recipeList.filter(recipe => recipe.id !== recipeId);
        }
      })
    );


    this.subscriptions.add(
      this.isFavoriteOnly.valueChanges.subscribe(isFavoriteOnly => {
        if (isFavoriteOnly) {
          this.temporaryRecipeList = this.recipeList
          this.recipeList = this.recipeList.filter(recipe => {
            return recipe.favorite
          })
        } else {
          this.recipeList = this.temporaryRecipeList
        }
        this.sortRecipes()
      })
    )

  }

  private initFormGroup() {
    this.filterFormGroup.patchValue({
      epsilon: 5
    });
    this.addValidators();
  }

  private addValidators() {
    this.filterFormGroup.get("calories")?.addValidators([Validators.pattern('-?[0-9]+'), Validators.min(0)]);
    this.filterFormGroup.get("proteins")?.addValidators([Validators.pattern('-?[0-9]+'), Validators.min(0)]);
    this.filterFormGroup.get("carbohydrates")?.addValidators([Validators.pattern('-?[0-9]+'), Validators.min(0)]);
    this.filterFormGroup.get("fats")?.addValidators([Validators.pattern('-?[0-9]+'), Validators.min(0)]);
    this.filterFormGroup.get("epsilon")?.addValidators([Validators.required, Validators.min(0), Validators.max(100)]);
  }


  filterRecipes(): void {
    this.store.dispatch(RecipeActions.getFilteredRecipes({
      calories: this.filterFormGroup.get("calories")?.value,
      proteins: this.filterFormGroup.get("proteins")?.value,
      carbohydrates: this.filterFormGroup.get("carbohydrates")?.value,
      fats: this.filterFormGroup.get("fats")?.value,
      epsilon: this.filterFormGroup.get("epsilon")?.value
    }));
    this.loading = true;

  }

  sortRecipes() {
    this.recipeList = clone(this.recipeList)
    if (this.selectedSortOption) {
      switch (this.selectedSortOption.value) {
        case 'calories_asc':
          this.recipeList.sort((a, b) => a.nutrients.calories - b.nutrients.calories);
          break;
        case 'calories_desc':
          this.recipeList.sort((a, b) => b.nutrients.calories - a.nutrients.calories);
          break;
        case 'proteins_asc':
          this.recipeList.sort((a, b) => a.nutrients.proteins - b.nutrients.proteins);
          break;
        case 'proteins_desc':
          this.recipeList.sort((a, b) => b.nutrients.proteins - a.nutrients.proteins);
          break;
        case 'fats_asc':
          this.recipeList.sort((a, b) => a.nutrients.fats - b.nutrients.fats);
          break;
        case 'fats_desc':
          this.recipeList.sort((a, b) => b.nutrients.fats - a.nutrients.fats);
          break;
        case 'carbohydrates_asc':
          this.recipeList.sort((a, b) => a.nutrients.carbohydrates - b.nutrients.carbohydrates);
          break;
        case 'carbohydrates_desc':
          this.recipeList.sort((a, b) => b.nutrients.carbohydrates - a.nutrients.carbohydrates);
          break;
        default:
          break;
      }
    } else {
      this.recipeList.sort((a, b) => a.id - b.id);
    }

  }


  toggleFavoriteStatus(recipeId: number): void {
    this.store.dispatch(RecipeActions.updateFavoriteStatus({recipeId: recipeId}));
  }

  isFormGroupNutrientsEmpty(): boolean {
    if (!this.filterFormGroup.get("calories")?.value && this.filterFormGroup.get("calories")?.value !== 0 &&
      !this.filterFormGroup.get("proteins")?.value && this.filterFormGroup.get("proteins")?.value !== 0 &&
      !this.filterFormGroup.get("carbohydrates")?.value && this.filterFormGroup.get("carbohydrates")?.value !== 0 &&
      !this.filterFormGroup.get("fats")?.value && this.filterFormGroup.get("fats")?.value !== 0) {
      return true
    }
    return false;
  }

  createImageFromUint8Array(image: Uint8Array): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64, " + image);
  }


  get calories() {
    return this.filterFormGroup.get('calories');
  }

  get proteins() {
    return this.filterFormGroup.get('proteins');
  }

  get carbohydrates() {
    return this.filterFormGroup.get('carbohydrates');
  }

  get fats() {
    return this.filterFormGroup.get('fats');
  }

}
