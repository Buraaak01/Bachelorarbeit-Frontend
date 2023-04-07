import { createAction, props } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";


// Report error
const GENERAL_ERROR = '[ERROR] Reporting general error'
export const reportGeneralError = createAction(GENERAL_ERROR, props<{ msg: string, error: HttpErrorResponse }>());

// Report Success
const GENERAL_SUCCESS = '[ERROR] Reporting general success'
export const reportGeneralSuccess = createAction(GENERAL_SUCCESS, props<{ msg: string }>());
