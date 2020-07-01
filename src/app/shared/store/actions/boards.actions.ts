import { Action } from '@ngrx/store';

// Load
export const LOAD_BOARDS          = '[Main] Load boards';
export const LOAD_BOARDS_SUCCESS  = '[Main] Load boards success';
export const LOAD_BOARDS_FAILURE  = '[Main] Load boards fail';

export class LoadBoards implements Action {
  readonly type = LOAD_BOARDS;
}

export class LoadBoardsSuccess implements Action {
  readonly type = LOAD_BOARDS_SUCCESS;
  constructor(public payload: any, ) { }
}

export class LoadBoardsFailure implements Action {
  readonly type = LOAD_BOARDS_FAILURE;
  constructor(public payload: any, ) { }
}


// Reset
export const RESET_BOARDS         = '[Main] Reset boards';

export class ResetBoards implements Action {
  readonly type = RESET_BOARDS;
}


export type BoardAction =
  | LoadBoards
  | LoadBoardsSuccess
  | LoadBoardsFailure

  | ResetBoards
  ;
