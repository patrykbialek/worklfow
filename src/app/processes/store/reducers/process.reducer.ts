import * as fromProcess from '../actions/process.actions';

export interface ProcessState {
  entity: any;
  isFailed: boolean;
  isLoading: boolean;
}

export const initialState: ProcessState = {
  entity: null,
  isFailed: false,
  isLoading: false,
};

export function reducer(
  state = initialState,
  action: fromProcess.ProcessAction
): ProcessState {

  switch (action.type) {

    case fromProcess.LOAD_PROCESS: {
      return {
        ...state,
        entity: null,
        isFailed: false,
        isLoading: true,
      };
    }

    case fromProcess.LOAD_PROCESS_SUCCESS: {
      const process = action.payload;

      return {
        ...state,
        entity: process,
        isFailed: false,
        isLoading: false,
      };
    }

    case fromProcess.LOAD_PROCESS_FAILURE: {
      return {
        ...state,
        entity: null,
        isFailed: true,
        isLoading: false,
      };
    }

    case fromProcess.RESET_PROCESS: {
      return {
        ...state,
        entity: null,
        isFailed: false,
        isLoading: false,
      };
    }

  }

  return state;
}

export const getIsFailed = (state: ProcessState) => state.isFailed;
export const getIsLoading = (state: ProcessState) => state.isLoading;
export const getProcess = (state: ProcessState) => state.entity;
