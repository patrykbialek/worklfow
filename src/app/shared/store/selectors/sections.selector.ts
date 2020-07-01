import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromSections from '../reducers/sections.reducer';

export const getSectionsState = createSelector(
  fromFeature.getMainState,
  (state: fromFeature.MainState) => state.sections
);

export const getSections = createSelector(
  getSectionsState,
  fromSections.getSections,
);

