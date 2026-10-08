import { SetUp } from '../../types/data.types';
import { initSetupData } from '../../util/data.util';
import { createReducer, on } from '@ngrx/store';
import * as SetUpActions from '../actions/setup.actions';

const initialState: SetUp = initSetupData();

export const setupReducer = createReducer(
  initialState,
  on(SetUpActions.resetSetup, () => {
    return { ...initSetupData() };
  }),
  on(SetUpActions.setSize, (state,{size}) => {
    return { ...state,size };
  }),
  on(SetUpActions.setTimeLimit, (state,{timeLimit}) => {
    return { ...state,timeLimit };
  }),
);
