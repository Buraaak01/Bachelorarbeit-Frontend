import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {RecipeListComponent} from "./features/recipe-list/recipe-list.component";
import {RecipeAddComponent} from "./features/recipe-add/recipe-add.component";
import {RecipeDetailComponent} from "./features/recipe-detail/recipe-detail.component";


const routes: Routes = [
  {
    path: 'recipes',
    component: RecipeListComponent
  },
  {
    path: 'recipes/add',
    component: RecipeAddComponent
  },
  {
    path: 'recipes/:id',
    component: RecipeDetailComponent,
  },
  {
    path: '**',
    redirectTo: 'recipes'
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)]
})
export class AppRoutingModule {
}
