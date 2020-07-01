import { Action } from '@ngrx/store';

// Load
export const LOAD_SECTIONS          = '[Main] Load sections';
export const LOAD_SECTIONS_SUCCESS  = '[Main] Load sections success';
export const LOAD_SECTIONS_FAILURE  = '[Main] Load sections fail';

export class LoadSections implements Action {
  readonly type = LOAD_SECTIONS;
}

export class LoadSectionsSuccess implements Action {
  readonly type = LOAD_SECTIONS_SUCCESS;
  constructor(public payload: any, ) { }
}

export class LoadSectionsFailure implements Action {
  readonly type = LOAD_SECTIONS_FAILURE;
  constructor(public payload: any, ) { }
}


// Reset
export const RESET_SECTIONS         = '[Main] Reset sections';

export class ResetSections implements Action {
  readonly type = RESET_SECTIONS;
}


export type SectionAction =
  | LoadSections
  | LoadSectionsSuccess
  | LoadSectionsFailure

  | ResetSections
  ;
