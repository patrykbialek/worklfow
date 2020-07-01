import * as fromBoards from '../actions/boards.actions';

export interface BoardsState {
  entities: any[];
  isFailed: boolean;
  isLoading: boolean;
}

export const initialState: BoardsState = {
  entities: null,
  isFailed: false,
  isLoading: false,
};

export function reducer(
  state = initialState,
  action: fromBoards.BoardAction
): BoardsState {

  switch (action.type) {

    case fromBoards.LOAD_BOARDS: {
      return {
        ...state,
        entities: null,
        isFailed: false,
        isLoading: true,
      };
    }

    case fromBoards.LOAD_BOARDS_SUCCESS: {
      const process = action.payload;

      return {
        ...state,
        entities: process,
        isFailed: false,
        isLoading: false,
      };
    }

    case fromBoards.LOAD_BOARDS_FAILURE: {
      return {
        ...state,
        entities: null,
        isFailed: true,
        isLoading: false,
      };
    }

    case fromBoards.RESET_BOARDS: {
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

export const getIsFailed = (state: BoardsState) => state.isFailed;
export const getIsLoading = (state: BoardsState) => state.isLoading;
export const getBoards = (state: BoardsState) => state.entities;
