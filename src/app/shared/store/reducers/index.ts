import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as bromBoards from './boards.reducer';

export interface SettingsState {
  boards: bromBoards.BoardsState;
}

export const reducers: ActionReducerMap<SettingsState> = {
  boards: bromBoards.reducer,
};

export const getSettingsState = createFeatureSelector<SettingsState>(
  'settings'
);
