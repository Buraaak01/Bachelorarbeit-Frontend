import { Injectable } from '@angular/core';
import {HttpBackend, HttpClient} from '@angular/common/http';
import {environment} from "../environments/environment.development";
import {map} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  private appConfig: any;
  private http : HttpClient;


  constructor(private readonly httpHandler: HttpBackend) {
    this.http = new HttpClient(httpHandler);
  }

  loadAppConfig() {
    return this.http.get(environment.configUrl)
      .pipe(
        map(config =>
          this.appConfig = config
        )
      );
  }

  get apiBaseUrl() : string {
    return this.appConfig.apiBaseUrl;
  }
}
