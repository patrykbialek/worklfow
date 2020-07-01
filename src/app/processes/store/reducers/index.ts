import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromProcess from './process.reducer';
import * as fromProcesses from './processes.reducer';

export interface MyProcessesState {
  process: fromProcess.ProcessState;
  processes: fromProcesses.ProcessesState;
}

export const reducers: ActionReducerMap<MyProcessesState> = {
  process: fromProcess.reducer,
  processes: fromProcesses.reducer,
};

export const getMyProcessesState = createFeatureSelector<MyProcessesState>(
  'myProcesses'
);
