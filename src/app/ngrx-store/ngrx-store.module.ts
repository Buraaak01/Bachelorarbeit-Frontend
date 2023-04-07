import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from "@ngrx/store";
import {storeFeatureKey} from "./reducer/store.reducer";
import {reducers} from "./state/ngrx-store.state";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(storeFeatureKey, reducers),
  ]
})
export class NgrxStoreModule {
}
