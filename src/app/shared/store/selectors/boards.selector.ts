import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromBoards from '../reducers/boards.reducer';

export const getBoardsState = createSelector(
  fromFeature.getSettingsState,
  (state: fromFeature.SettingsState) => state.boards
);

export const getBoards = createSelector(
  getBoardsState,
  fromBoards.getBoards,
);

