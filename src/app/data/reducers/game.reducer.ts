import {initGameData} from '../../util/data.util';
import {createReducer} from '@ngrx/store';


const initialState = initGameData();

export const gameReducer = createReducer(
  initialState,

);
