import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of ,  EMPTY } from 'rxjs';
import { map, switchMap, catchError, } from 'rxjs/operators';


import * as processActions from '../actions/boards.actions';
import { ProcessesHttpService } from '@processes/services';
import { BoardsHttpService } from '../../services/board-http.service';

@Injectable()
export class ProcessEffects {

  constructor(
    private actions$: Actions,
    private boardsService: BoardsHttpService,
  ) { }

  @Effect()
  laodBoards$ = this.actions$.pipe(ofType(processActions.LOAD_BOARDS),
    // map((action: processActions.LoadBoards) => action.payload),
    switchMap(params => {
      return this.boardsService
        .getBoards()
        .pipe(
          map((response: any) => {
            return new processActions.LoadBoardsSuccess(response);
          }),
          catchError((error) => {
            return of(new processActions.LoadBoardsFailure(error));
          })
        );
    })
  );

}
