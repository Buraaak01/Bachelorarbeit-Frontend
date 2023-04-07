import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {IngredientActions, RecipeActions} from "../../ngrx-store/actions";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {IngredientSelectors} from "../../ngrx-store/selectors";
import {Subscription, withLatestFrom} from "rxjs";
import {CreateRecipeModel} from "../../shared/model/domain/create-recipe.model";
import {GetIngredientModel} from "../../shared/model/domain/get-ingredient.model";
import {Actions, ofType} from "@ngrx/effects";
import clone from "just-clone";


@Component({
  selector: 'app-recipe-add',
  templateUrl: './recipe-add.component.html',
  styleUrls: ['./recipe-add.component.css']
})
export class RecipeAddComponent implements OnInit, OnDestroy {
  recipeFormGroup = new FormGroup({
    title: new FormControl(),
    portions: new FormControl(),
    ingredients: new FormArray([
      new FormGroup({
        foodId: new FormControl(),
        name: new FormControl(),
        quantity: new FormControl(),
        unit: new FormControl(),
      })
    ]),
    preparation: new FormControl(),
    image: new FormControl(),
  });

  loading: boolean = true;

  ingredients: GetIngredientModel[] = []
  unitOptions: string[] = [];
  unitOptionsLoading: boolean = true;

  subscriptions: Subscription = new Subscription();

  constructor(private readonly store: Store, private router: Router, private cdr: ChangeDetectorRef, private actions$: Actions) {
  }

  ngOnInit() {
    this.loadInitialData();
    this.selectFromStore();
    this.addValidators();
  }

  private loadInitialData() {
    this.store.dispatch(IngredientActions.getIngredientList())
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private selectFromStore() {
    // Get Zutat Liste Erfolgsfall
    this.subscriptions.add(
      this.actions$.pipe(
        ofType(IngredientActions.getIngredientListSuccess),
        withLatestFrom(this.store.select(IngredientSelectors.selectIngredientList)),
      ).subscribe(([, response]) => {
        this.ingredients = response.list.data
        //Klonen, da Store nur read-only ist
        this.ingredients = clone(this.ingredients)
        this.ingredients.sort((a, b) => a.name.localeCompare(b.name));
        this.loading = false;
      })
    );


    // Get Zutat Liste Fehlerfall
    this.subscriptions.add(
      this.actions$.pipe(
        ofType(IngredientActions.getIngredientListFailure),
      ).subscribe(() => {
        this.ingredients = []
        this.loading = false;
      })
    );

  // Erstellen Rezept erfolgreich
    this.subscriptions.add(
      this.actions$.pipe(
        ofType(RecipeActions.createRecipeSuccess),
      ).subscribe(() => {
        this.router.navigateByUrl('/recipes');
      })
    );

  }

  private createIngredientFormGroup(): FormGroup {
    return new FormGroup({
      foodId: new FormControl(),
      name: new FormControl(),
      quantity: new FormControl(),
      unit: new FormControl(),
    });
  }

  private addValidators(): void {
    this.recipeFormGroup.get('portions')?.setValidators([Validators.pattern(/^\d+(\.\d+)?$/)]);
    this.ingredientsFormArray.controls[0].get("quantity")?.setValidators([Validators.pattern(/^\d+(\.\d+)?$/)]);
  }


  private encodeImage(): Promise<string> {
    // Wandelt ein Bild in einen Base64-kodierten String um.
      return new Promise<string>((resolve, reject) => {
      const image = this.recipeFormGroup.controls["image"].value;

      if (image) {
        // Falls der User ein Bild gesetzt hat
        const reader = new FileReader();
        reader.onload = function () {
          const base64Data = reader.result as string;
          resolve(base64Data);
        };
        reader.onerror = function (error) {
          reject(new Error('Error reading image: ' + error));
        };
        reader.readAsDataURL(image);
      } else {
        // Setzt das Default-Bild
        let defaultImagePath = 'assets/images/default-recipe-picture.jpg';
        let xhr = new XMLHttpRequest();
        xhr.open('GET', defaultImagePath);
        xhr.responseType = 'blob';
        xhr.onload = () => {
          if (xhr.status === 200) {
            const reader = new FileReader();
            reader.onload = function () {
              const base64Data = reader.result as string;
              resolve(base64Data);
            };
            reader.onerror = function (error) {
              reject(new Error('Error reading default image: ' + error));
            };
            reader.readAsDataURL(xhr.response);
          } else {
            reject(new Error('Failed to load default image'));
          }
        };
        xhr.onerror = () => {
          reject(new Error('Failed to load default image'));
        };
        xhr.send();
      }
    });
  }

  handleImageChange(event: any) {
    this.recipeFormGroup.patchValue({
      image: event.target.files[0]
    });
  }

  updateIngredientNameAndUnitOptions(foodId: any, index: number) {
    // Updated die verfügbaren Units der Zutat
    const ingredientToBeChanged: AbstractControl = this.ingredientsFormArray.at(index);

    if (foodId) { // falls ein Eintrag selected wird
      const ingredient = this.ingredients.find(ingredient => ingredient.foodId == foodId);

      ingredientToBeChanged.patchValue({
        name: ingredient?.name,
        unit: null
      });
      if (ingredient?.units) {
        this.unitOptions = ingredient.units; //Setzt die Moeglichen Einheits-Moeglichkeiten fuer die jeweilige Zutat
        this.unitOptions.sort((a, b) => a.localeCompare(b));
        this.unitOptionsLoading = false;
      }
    } else { // falls ein Eintrag geloescht wird
      ingredientToBeChanged.patchValue({
        name: null,
        unit: null,
        quantity: null
      });
      this.unitOptions = [];
      this.unitOptionsLoading = true;
    }
  }


  addIngredient() {
    const ingredientFormGroup = this.createIngredientFormGroup();
    this.ingredientsFormArray.push(ingredientFormGroup);
    this.ingredientsFormArray.at(-1).get("quantity")?.setValidators([Validators.pattern(/^\d+(\.\d+)?$/)]);
    this.cdr.detectChanges();
  }

  removeIngredient(index: number) {
    this.ingredientsFormArray.removeAt(index);
  }

  private mapToModel(): Promise<CreateRecipeModel> {
    return new Promise<CreateRecipeModel>((resolve, reject) => {
      this.encodeImage()
        .then((imageData) => {
          const recipe: CreateRecipeModel = {
            title: this.recipeFormGroup.controls['title'].value,
            preparation: this.recipeFormGroup.controls['preparation'].value,
            portions: this.recipeFormGroup.controls['portions'].value,
            ingredients: this.ingredientsFormArray.value,
            image: imageData.split(',')[1]
          } as CreateRecipeModel;
          resolve(recipe);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  isIngredientAlreadyUsed(ingredientId: string): boolean {
    const selectedIngredients = this.ingredientsFormArray.controls.map((control: AbstractControl) => control.get("foodId")?.value);
    return selectedIngredients.includes(ingredientId);
  }


  saveRecipe() {
    this.mapToModel()
      .then((recipe) => {
        this.store.dispatch(RecipeActions.createRecipe({payload: recipe}))
      })
  }

  get ingredientsFormArray(): FormArray {
    return this.recipeFormGroup.controls['ingredients'] as FormArray;
  }

  get title() {
    return this.recipeFormGroup.controls['title'];
  }

  get portions() {
    return this.recipeFormGroup.controls['portions'];
  }

  get preparation() {
    return this.recipeFormGroup.controls['preparation'];
  }

}
