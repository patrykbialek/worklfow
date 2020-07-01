import { Action } from '@ngrx/store';

// Load
export const LOAD_PROCESSES          = '[Main] Load processes';
export const LOAD_PROCESSES_SUCCESS  = '[Main] Load processes success';
export const LOAD_PROCESSES_FAILURE  = '[Main] Load processes fail';

export class LoadProcesses implements Action {
  readonly type = LOAD_PROCESSES;
}

export class LoadProcessesSuccess implements Action {
  readonly type = LOAD_PROCESSES_SUCCESS;
  constructor(public payload: any, ) { }  
}

export class LoadProcessesFailure implements Action {
  readonly type = LOAD_PROCESSES_FAILURE;
  constructor(public payload: any, ) { }
}

// Create
export const CREATE_PROCESS          = '[Main] Create process';
export const CREATE_PROCESS_SUCCESS  = '[Main] Create process success';
export const CREATE_PROCESS_FAILURE  = '[Main] Create process fail';

export class CreateProcess implements Action {
  readonly type = CREATE_PROCESS;
  constructor(public payload: any, ) { }  
}

export class CreateProcessSuccess implements Action {
  readonly type = CREATE_PROCESS_SUCCESS;
  // constructor(public payload: any, ) { }  
}

export class CreateProcessFailure implements Action {
  readonly type = CREATE_PROCESS_FAILURE;
  constructor(public payload: any, ) { }
}


// Reset
export const RESET_PROCESSES          = '[Main] Reset processes';

export class ResetProcesses implements Action {
  readonly type = RESET_PROCESSES;
}


export type ProcessesAction =
  | LoadProcesses
  | LoadProcessesSuccess
  | LoadProcessesFailure

  | CreateProcess
  | CreateProcessSuccess
  | CreateProcessFailure

  | ResetProcesses
  ;
