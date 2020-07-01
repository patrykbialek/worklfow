import * as fromProcesses from '../actions/processes.actions';

export interface ProcessesState {
  entities: any;
  isFailed: boolean;
  isLoading: boolean;
}

export const initialState: ProcessesState = {
  entities: null,
  isFailed: false,
  isLoading: false,
};

export function reducer(
  state = initialState,
  action: fromProcesses.ProcessesAction
): ProcessesState {

  switch (action.type) {

    case fromProcesses.LOAD_PROCESSES: {
      return {
        ...state,
        entities: null,
        isFailed: false,
        isLoading: true,
      };
    }

    case fromProcesses.LOAD_PROCESSES_SUCCESS: {
      const processes = action.payload;

      return {
        ...state,
        entities: processes,
        isFailed: false,
        isLoading: false,
      };
    }

    case fromProcesses.LOAD_PROCESSES_FAILURE: {
      return {
        ...state,
        entities: null,
        isFailed: true,
        isLoading: false,
      };
    }

    case fromProcesses.CREATE_PROCESS_SUCCESS: {
      return {
        ...state,
      };
    }

    case fromProcesses.RESET_PROCESSES: {
      return {
        ...state,
        entities: null,
        isFailed: false,
        isLoading: false,
      };
    }

  }

  return state;
}

export const getIsFailed = (state: ProcessesState) => state.isFailed;
export const getIsLoading = (state: ProcessesState) => state.isLoading;
export const getProcesses = (state: ProcessesState) => state.entities;
