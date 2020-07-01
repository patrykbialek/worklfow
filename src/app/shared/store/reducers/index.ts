import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromBoards from './boards.reducer';
import * as fromSections from './sections.reducer';

export interface MainState {
  boards: fromBoards.BoardsState;
  sections: fromSections.SectionsState;
}

export const reducers: ActionReducerMap<MainState> = {
  boards: fromBoards.reducer,
  sections: fromSections.reducer,
};

export const getMainState = createFeatureSelector<MainState>(
  'main'
);
