import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, } from 'rxjs';
import { map, catchError, mergeMap, } from 'rxjs/operators';


import * as tasksActions from '../actions/tasks.actions';
import { TasksHttpService } from '@processes/services';

@Injectable()
export class TasksEffects {

  constructor(
    private actions$: Actions,
    private tasksService: TasksHttpService,
  ) { }

  @Effect()
  laodTasks$ = this.actions$.pipe(ofType(tasksActions.LOAD_TASKS),
    map((action: tasksActions.LoadTasks) => action.payload),
    mergeMap(params => {
      return this.tasksService
        .getTasks(params)
        .pipe(
          map((response: any) => {
            return new tasksActions.LoadTasksSuccess(response);
          }),
          catchError((error) => {
            return of(new tasksActions.LoadTasksFailure(error));
          })
        );
    })
  );

  // @Effect()
  // createProcess$ = this.actions$.pipe(ofType(processesActions.CREATE_PROCESS),
  //   map((action: processesActions.CreateProcess) => action.payload),
  //   mergeMap(process => {
  //     return this.processesService
  //       .createProcess(process)
  //       .pipe(
  //         map(() => {
  //           return new processesActions.CreateProcessSuccess();
  //         }),
  //         catchError((error) => {
  //           return of(new processesActions.CreateProcessFailure(error));
  //         })
  //       );
  //   })
  // );

}
