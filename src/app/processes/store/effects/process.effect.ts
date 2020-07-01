import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of ,  EMPTY } from 'rxjs';
import { map, switchMap, catchError, } from 'rxjs/operators';


import * as processActions from '../actions/process.actions';
import { ProcessesHttpService } from '@processes/services';

@Injectable()
export class ProcessEffects {

  constructor(
    private actions$: Actions,
    private processesService: ProcessesHttpService,
  ) { }

  @Effect()
  loadProcess$ = this.actions$.pipe(ofType(processActions.LOAD_PROCESS),
    map((action: processActions.LoadProcess) => action.payload),
    switchMap(params => {
      return this.processesService
        .getProcessByKey(params)
        .pipe(
          map((response: any) => {
            return new processActions.LoadProcessSuccess(response);
          }),
          catchError((error) => {
            return of(new processActions.LoadProcessFailure(error));
          })
        );
    })
  );

}
