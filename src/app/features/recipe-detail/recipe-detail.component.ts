import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RecipeSelectors} from "../../ngrx-store/selectors";
import {Subscription, withLatestFrom} from "rxjs";
import {Store} from "@ngrx/store";
import {RecipeActions} from "../../ngrx-store/actions";
import {GetRecipeDetailModel} from "../../shared/model/domain/get-recipe-detail.model";
import {DomSanitizer, SafeHtml, SafeUrl} from "@angular/platform-browser";
import clone from "just-clone";
import {Actions, ofType} from "@ngrx/effects";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  id: number = null as any
  recipe: GetRecipeDetailModel = null as any;

  sanitizedPreparation: SafeHtml = null as any

  subscriptions: Subscription = new Subscription();
  loading: boolean = true;

  constructor(private readonly store: Store, private route: ActivatedRoute, private sanitizer: DomSanitizer, private actions$: Actions) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params => {
      this.id = params['id']
    }))
    this.loadInitialData()
    this.selectFromStore()
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  private loadInitialData() {
    this.store.dispatch(RecipeActions.getRecipeSingle({recipeId: this.id}))
  }

  private selectFromStore() {
    // Detail Erfolgsfall
    this.subscriptions.add(
      this.actions$.pipe(
        ofType(RecipeActions.getRecipeSingleSuccess),
        withLatestFrom(this.store.select(RecipeSelectors.selectRecipeDetail)),
      ).subscribe(([, response]) => {
        this.recipe = response.single.data;
        this.sanitizedPreparation = this.sanitizer.bypassSecurityTrustHtml(this.parseTextWithLinks(this.recipe.preparation));
        this.loading = false;
      })
    );


    // Detail Fehlerfall
    this.subscriptions.add(
      this.actions$.pipe(
        ofType(RecipeActions.getRecipeSingleFailure),
      ).subscribe(() => {
        this.loading = false;
      })
    );

    // Favoriten Erfolgsfall
    this.subscriptions.add(
      this.actions$.pipe(
        ofType(RecipeActions.updateFavoriteStatusSuccess),
      ).subscribe(() => {
        this.recipe = clone(this.recipe)
        this.recipe.favorite = !this.recipe.favorite
      })
    );

  }

  private parseTextWithLinks(text: string): string {
    // Schaut, ob im Text ein Link vorhanden ist, wenn ja wird dieser zu einem klickbaren a tag
    const linkRegex = /(http|https):\/\/[^\s]+/gi;
    return text.replace(linkRegex, (match) => {
      return `<a href="${match}" style="color: #ffffff" target="_blank">${match}</a>`;
    });
  }

  createImageFromUint8Array(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl("data:image/jpeg;base64, " + this.recipe.image);
  }

  toggleFavoriteStatus() {
    this.store.dispatch(RecipeActions.updateFavoriteStatus({recipeId: this.id}));
  }
}
