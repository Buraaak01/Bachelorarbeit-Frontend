import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AlertContainerComponent} from "./components/alert-container/alert-container.component";
import {NgbToastModule} from "@ng-bootstrap/ng-bootstrap";


@NgModule({
  declarations: [
    AlertContainerComponent,
  ],
  imports: [
    CommonModule,
    NgbToastModule
  ],
  exports: [
    CommonModule,
    AlertContainerComponent,
  ]
})

export class SharedModule {
}
