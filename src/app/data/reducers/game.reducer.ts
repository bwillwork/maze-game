import {initGameData} from '../../util/data.util';
import {createReducer} from '@ngrx/store';
import { Game } from '../../types/data.types';


const initialState:Game = initGameData();

export const gameReducer = createReducer(
  initialState,

);
