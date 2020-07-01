import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Store, select, Action } from '@ngrx/store';

import * as fromModels from '../../models';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';

import * as fromMainSelectors from '../../../shared/store';

@Injectable({
  providedIn: 'root'
})
export class TasksFacadeService {
  tasks$: Observable<fromModels.Task[]>;
  tasksBySection$: Observable<any>;
  tasksByBoard$: Observable<any>;
  isFailed$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isSuccess$: Observable<boolean>;

  constructor(
    private store: Store<fromReducers.MyProcessesState>,
  ) {
    this.tasks$ = this.store.pipe(select(fromSelectors.getTasks));
    this.tasksBySection$ = this.store.pipe(select(fromSelectors.getTasksBySection));

    const boards$ = this.store.pipe(select(fromMainSelectors.getBoards));
    this.tasksByBoard$ = boards$
      .pipe(
        flatMap((boards) => this.store.pipe(select(fromSelectors.getTasksByBoard, { boards })))
      );

    //   this.isFailed$ = this.store.pipe(select(fromSelectors.));
    //   this.isLoading$ = this.store.pipe(select(fromSelectors.));
    //   this.isSuccess$ = this.store.pipe(select(fromSelectors.));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

}
