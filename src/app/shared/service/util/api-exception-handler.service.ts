import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiExceptionHandlerService {

  constructor() {
  }

  handleError(error?: HttpErrorResponse): string {
    return error?.error?.errorMsg ?? 'Unknown Error';
  }


}
