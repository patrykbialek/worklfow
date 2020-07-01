import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromProcesses from '../reducers/processes.reducer';

export const getProcessesState = createSelector(
  fromFeature.getMyProcessesState,
  (state: fromFeature.MyProcessesState) => state.processes
);

export const getProcesses = createSelector(
  getProcessesState,
  fromProcesses.getProcesses,
);

