import * as fromTasks from '../actions/tasks.actions';

export interface TasksState {
  entities: any;
  isFailed: boolean;
  isLoading: boolean;
}

export const initialState: TasksState = {
  entities: null,
  isFailed: false,
  isLoading: false,
};

export function reducer(
  state = initialState,
  action: fromTasks.TasksAction
): TasksState {

  switch (action.type) {

    case fromTasks.LOAD_TASKS: {
      return {
        ...state,
        entities: null,
        isFailed: false,
        isLoading: true,
      };
    }

    case fromTasks.LOAD_TASKS_SUCCESS: {
      const tasks = action.payload;

      return {
        ...state,
        entities: tasks,
        isFailed: false,
        isLoading: false,
      };
    }

    case fromTasks.LOAD_TASKS_FAILURE: {
      return {
        ...state,
        entities: null,
        isFailed: true,
        isLoading: false,
      };
    }

    case fromTasks.CREATE_TASK_SUCCESS: {
      return {
        ...state,
      };
    }

  }

  return state;
}

export const getIsFailed = (state: TasksState) => state.isFailed;
export const getIsLoading = (state: TasksState) => state.isLoading;
export const getTasks = (state: TasksState) => state.entities;
