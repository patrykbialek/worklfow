import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromProcess from './process.reducer';
import * as fromProcesses from './processes.reducer';
import * as fromTasks from './tasks.reducer';

export interface MyProcessesState {
  process: fromProcess.ProcessState;
  processes: fromProcesses.ProcessesState;
  tasks: fromTasks.TasksState;
}

export const reducers: ActionReducerMap<MyProcessesState> = {
  process: fromProcess.reducer,
  processes: fromProcesses.reducer,
  tasks: fromTasks.reducer,
};

export const getMyProcessesState = createFeatureSelector<MyProcessesState>(
  'myProcesses'
);
