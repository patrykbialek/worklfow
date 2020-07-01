import { Action } from '@ngrx/store';

// Load
export const LOAD_TASKS          = '[Main] Load tasks';
export const LOAD_TASKS_SUCCESS  = '[Main] Load tasks success';
export const LOAD_TASKS_FAILURE  = '[Main] Load tasks fail';

export class LoadTasks implements Action {
  readonly type = LOAD_TASKS;
  constructor(public payload: any, ) { }  
}

export class LoadTasksSuccess implements Action {
  readonly type = LOAD_TASKS_SUCCESS;
  constructor(public payload: any, ) { }  
}

export class LoadTasksFailure implements Action {
  readonly type = LOAD_TASKS_FAILURE;
  constructor(public payload: any, ) { }
}

// Create
export const CREATE_TASK          = '[Main] Create task';
export const CREATE_TASK_SUCCESS  = '[Main] Create task success';
export const CREATE_TASK_FAILURE  = '[Main] Create task fail';

export class CreateTask implements Action {
  readonly type = CREATE_TASK;
  constructor(public payload: any, ) { }  
}

export class CreateTaskSuccess implements Action {
  readonly type = CREATE_TASK_SUCCESS;
  // constructor(public payload: any, ) { }  
}

export class CreateTaskFailure implements Action {
  readonly type = CREATE_TASK_FAILURE;
  constructor(public payload: any, ) { }
}


export type TasksAction =
  | LoadTasks
  | LoadTasksSuccess
  | LoadTasksFailure

  | CreateTask
  | CreateTaskSuccess
  | CreateTaskFailure

  ;
