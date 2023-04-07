import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {AppConfigService} from "./app-config.service";
import {HttpClientModule} from "@angular/common/http";

const appInitializerFn = (appConfig: AppConfigService) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: appInitializerFn,
    multi: true,
    deps: [AppConfigService]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
