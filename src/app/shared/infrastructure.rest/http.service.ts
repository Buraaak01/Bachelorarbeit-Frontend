import { Injectable } from '@angular/core';
import {map, Observable, of} from "rxjs";
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {AppConfigService} from "../../app-config.service";


export interface Response<T> {

  status: number;
  data?: T;
  error?: HttpErrorResponse;
  headers?: HttpHeaders;

}

export type Result<T> = Observable<Response<T>>;


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  static API_PATH = '/api';
  static API_BASE_ROUTE = '/v1';

  constructor(private appCfg: AppConfigService,
              private http: HttpClient) { }


  get<T>(path: string, params?: HttpParams, headers?: HttpHeaders): Result<T> {
    return this.http
      .get<T>(`${this.baseURL()}/${path}`, {
        responseType: 'json',
        observe: 'response',
        headers: (headers || new HttpHeaders()),
        params: params
      })
      .pipe(
        map(res => HttpService.response<T>(res))
      );
  }

  post<T, B = any>(path: string, body: B, params?: HttpParams, headers?: HttpHeaders): Result<T> {
    return this.http
      .post<T>(`${this.baseURL()}/${path}`, body, {
        observe: 'response',
        responseType: 'json',
        headers: (headers || new HttpHeaders()),
        params: params
      })
      .pipe(
        map(res => HttpService.response<T>(res))
      );
  }

  put<T, B = any>(path: string, body: B, params?: HttpParams, headers?: HttpHeaders): Result<T> {
    return this.http
      .put<T>(`${this.baseURL()}/${path}`, body, {
        observe: 'response',
        headers: (headers || new HttpHeaders().set('Content-Type', 'application/json')),
        params: params
      })
      .pipe(
        map(res => HttpService.response<T>(res))
      );
  }


  static response<T>(value: HttpResponse<any>): Response<T> {
    return {data: value.body, status: value.status, headers: value.headers}
  }


  static error<T>(error: HttpErrorResponse): Result<T> {
    return of({ error, status: error.status, headers: error.headers });
  }


  baseURL(): string {
    let path = HttpService.API_PATH + HttpService.API_BASE_ROUTE;

    return this.appCfg.apiBaseUrl + path;
  }
}
