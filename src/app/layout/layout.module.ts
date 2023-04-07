import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "./header/header.component";
import {AppRoutingModule} from "../app-routing.module";
import {FooterComponent} from './footer/footer.component';
import {SharedModule} from "../shared/shared.module";
import {NgbNavModule} from "@ng-bootstrap/ng-bootstrap";
import {LayoutComponent} from "./layout.component";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    NgbNavModule,
    AppRoutingModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ]
})
export class LayoutModule {
}
