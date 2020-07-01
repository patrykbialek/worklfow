import * as fromSections from '../actions/sections.actions';

export interface SectionsState {
  entities: any[];
  isFailed: boolean;
  isLoading: boolean;
}

export const initialState: SectionsState = {
  entities: null,
  isFailed: false,
  isLoading: false,
};

export function reducer(
  state = initialState,
  action: fromSections.SectionAction
): SectionsState {

  switch (action.type) {

    case fromSections.LOAD_SECTIONS: {
      return {
        ...state,
        entities: null,
        isFailed: false,
        isLoading: true,
      };
    }

    case fromSections.LOAD_SECTIONS_SUCCESS: {
      const process = action.payload;

      return {
        ...state,
        entities: process,
        isFailed: false,
        isLoading: false,
      };
    }

    case fromSections.LOAD_SECTIONS_FAILURE: {
      return {
        ...state,
        entities: null,
        isFailed: true,
        isLoading: false,
      };
    }

    case fromSections.RESET_SECTIONS: {
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

export const getIsFailed = (state: SectionsState) => state.isFailed;
export const getIsLoading = (state: SectionsState) => state.isLoading;
export const getSections = (state: SectionsState) => state.entities;
