import { Injectable } from '@angular/core';

import { Effect, Actions, ofType } from '@ngrx/effects';
import { of ,  EMPTY } from 'rxjs';
import { map, switchMap, catchError, } from 'rxjs/operators';

import * as sectionsActions from '../actions/sections.actions';
import { SectionsHttpService } from '@shared/services/sections-http.service';

@Injectable()
export class SectionsEffects {

  constructor(
    private actions$: Actions,
    private sectionsService: SectionsHttpService,
  ) { }

  @Effect()
  loadSections$ = this.actions$.pipe(ofType(sectionsActions.LOAD_SECTIONS),
    // map((action: processActions.LoadBoards) => action.payload),
    switchMap(params => {
      return this.sectionsService
        .getSections()
        .pipe(
          map((response: any) => {
            return new sectionsActions.LoadSectionsSuccess(response);
          }),
          catchError((error) => {
            return of(new sectionsActions.LoadSectionsFailure(error));
          })
        );
    })
  );

}
