import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromBoards from './boards.reducer';
import * as fromSections from './sections.reducer';

export interface SettingsState {
  boards: fromBoards.BoardsState;
  sections: fromSections.SectionsState;
}

export const reducers: ActionReducerMap<SettingsState> = {
  boards: fromBoards.reducer,
  sections: fromSections.reducer,
};

export const getSettingsState = createFeatureSelector<SettingsState>(
  'settings'
);
