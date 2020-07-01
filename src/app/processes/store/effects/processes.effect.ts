import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of ,  EMPTY } from 'rxjs';
import { map, switchMap, catchError, mergeMap, } from 'rxjs/operators';


import * as processesActions from '../actions/processes.actions';
import { ProcessesHttpService } from '@processes/services';

@Injectable()
export class ProcessesEffects {

  constructor(
    private actions$: Actions,
    private processesService: ProcessesHttpService,
  ) { }

  @Effect()
  loadProcesses$ = this.actions$.pipe(ofType(processesActions.LOAD_PROCESSES),
    // map((action: processesActions.LoadProcesses) => action.payload),
    mergeMap(params => {
      return this.processesService
        .getProcesses()
        .pipe(
          map((response: any) => {
            return new processesActions.LoadProcessesSuccess(response);
          }),
          catchError((error) => {
            return of(new processesActions.LoadProcessesFailure(error));
          })
        );
    })
  );

  @Effect()
  createProcess$ = this.actions$.pipe(ofType(processesActions.CREATE_PROCESS),
    map((action: processesActions.CreateProcess) => action.payload),
    mergeMap(process => {
      return this.processesService
        .createProcess(process)
        .pipe(
          map(() => {
            return new processesActions.CreateProcessSuccess();
          }),
          catchError((error) => {
            return of(new processesActions.CreateProcessFailure(error));
          })
        );
    })
  );

}
