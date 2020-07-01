import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromProcess from './process.reducer';

export interface ProcessesState {
  process: fromProcess.ProcessState;
}

export const reducers: ActionReducerMap<ProcessesState> = {
  process: fromProcess.reducer,
};

export const getProcessesState = createFeatureSelector<ProcessesState>(
  'processes'
);
