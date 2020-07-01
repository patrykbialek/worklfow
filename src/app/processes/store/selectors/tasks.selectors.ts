import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromTasks from '../reducers/tasks.reducer';

export const getTasksState = createSelector(
  fromFeature.getMyProcessesState,
  (state: fromFeature.MyProcessesState) => state.tasks
);

export const getTasks = createSelector(
  getTasksState,
  fromTasks.getTasks,
);

export const getTasksByBoard = createSelector(
  getTasksState,
  (state, props) => {
    const tasks = state.entities;
    let boardDictionary = props.boards;
    let tasksByBoard = [];
    if (tasks) {
      tasksByBoard = boardDictionary.map(board => {
        return {
          column: {
            name: board.name,
            key: board.key,
            order: board.order,
          },
          tasks: [],
        }
      });

      tasks.forEach(task => {
        tasksByBoard.forEach(board => {
          if (board.column.name === task.board.name) {
            board.tasks.push(task);
          }
        });
      });
    }

    return tasksByBoard;
  }
);

export const getTasksBySection = createSelector(
  getTasksState,
  state => {
    const tasks = state.entities;
    let tasksBySection = [];
    if (tasks) {
      tasks.forEach(task => {
        tasksBySection.push(task.section);
      });
      tasksBySection = [...new Set(tasksBySection)];
      tasksBySection = tasksBySection.map(section => {
        return {
          key: section.key,
          name: section.name,
          tasks: [],
        }
      });

      tasks.forEach(task => {
        tasksBySection.forEach(section => {
          if (section.key === task.section.key) {
            section.tasks.push(task);
          }
        });
      });
    }

    return tasksBySection;
  }
);

