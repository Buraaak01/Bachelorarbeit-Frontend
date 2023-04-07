import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppConfigService} from "./app-config.service";
import {HttpClientModule} from "@angular/common/http";
import {RecipeListComponent} from './features/recipe-list/recipe-list.component';
import {AppRoutingModule} from "./app-routing.module";
import {RouterModule} from "@angular/router";
import {metaReducers, reducers} from "./ngrx-store/state/ngrx-store.state";
import {StoreModule} from "@ngrx/store";
import {CommonModule} from "@angular/common";
import {EffectsModule} from "@ngrx/effects";
import {IngredientEffects, RecipeEffects, StatusEffects} from "./ngrx-store/effects";
import {SharedModule} from "./shared/shared.module";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LayoutModule} from "./layout/layout.module";
import {NgSelectModule} from '@ng-select/ng-select';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RecipeAddComponent } from './features/recipe-add/recipe-add.component';
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import { RecipeDetailComponent } from './features/recipe-detail/recipe-detail.component';
const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};


@NgModule({
  declarations: [
    AppComponent,
    RecipeListComponent,
    RecipeAddComponent,
    RecipeDetailComponent,
  ],
  imports: [
    BrowserModule,
    NgSelectModule,
    HttpClientModule,
    AppRoutingModule,
    CommonModule,
    StoreDevtoolsModule.instrument(),
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule,
    LayoutModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([
      RecipeEffects.RecipeEffects,
      StatusEffects.StatusEffects,
      IngredientEffects.IngredientEffects
    ])
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: appInitializerFn,
    multi: true,
    deps: [AppConfigService]
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
