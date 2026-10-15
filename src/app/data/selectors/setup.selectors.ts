import { createSelector } from '@ngrx/store';
import { AppState } from '../../types/redux.types';
import { SetUp } from '../../types/data.types';


export const selectSetup = (state: AppState) => state.setup;

export const selectSetupState =  createSelector(selectSetup, (state: SetUp) => state);

