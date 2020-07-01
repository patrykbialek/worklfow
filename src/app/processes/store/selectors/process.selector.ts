import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromProcess from '../reducers/process.reducer';

export const getProcessState = createSelector(
  fromFeature.getProcessesState,
  (state: fromFeature.ProcessesState) => state.process
);

export const getProcess = createSelector(
  getProcessState,
  fromProcess.getProcess,
);

