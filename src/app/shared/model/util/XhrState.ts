export interface XhrState {
  pending: boolean;
  done: boolean;
  succeeded: boolean;
  failed: boolean;
  payload: any;
  error?: any;
}

export const initialXhrState: XhrState = {
  pending: false,
  done: false,
  succeeded: false,
  failed: false,
  payload: null,
  error: null
}
