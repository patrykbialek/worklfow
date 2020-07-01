import { Action } from '@ngrx/store';

// Load
export const LOAD_PROCESS          = '[Main] Load process';
export const LOAD_PROCESS_SUCCESS  = '[Main] Load process success';
export const LOAD_PROCESS_FAILURE  = '[Main] Load process fail';

export class LoadProcess implements Action {
  readonly type = LOAD_PROCESS;
  constructor(public payload: string, ) { }
}

export class LoadProcessSuccess implements Action {
  readonly type = LOAD_PROCESS_SUCCESS;
  constructor(public payload: any, ) { }
  
}

export class LoadProcessFailure implements Action {
  readonly type = LOAD_PROCESS_FAILURE;
  constructor(public payload: any, ) { }
}


// Reset
export const RESET_PROCESS          = '[Main] Reset consultation';

export class ResetProcess implements Action {
  readonly type = RESET_PROCESS;
}


export type ProcessAction =
  | LoadProcess
  | LoadProcessSuccess
  | LoadProcessFailure

  | ResetProcess
  ;
