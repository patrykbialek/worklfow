import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Store, select, Action } from '@ngrx/store';

// import * as fromModels from '../../models';
import * as fromReducers from '../reducers';
import * as fromSelectors from '../selectors';

@Injectable({
  providedIn: 'root'
})
export class BoardsFacadeService {
  boards$: Observable<any>;
  isFailed$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isSuccess$: Observable<boolean>;

  constructor(
    private store: Store<fromReducers.SettingsState>,
  ) {
    this.boards$ = this.store.pipe(select(fromSelectors.getBoards));
  //   this.isFailed$ = this.store.pipe(select(fromSelectors.));
  //   this.isLoading$ = this.store.pipe(select(fromSelectors.));
  //   this.isSuccess$ = this.store.pipe(select(fromSelectors.));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }

}
