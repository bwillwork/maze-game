import {initGameData} from '../../util/data.util';
import {createReducer, on } from '@ngrx/store';
import { Game } from '../../types/data.types';
import * as GameActions from '../actions/game.actions';


const initialState:Game = initGameData();

export const gameReducer = createReducer(
  initialState,
  on(GameActions.setupGame, (state, {setUp}) => {
    return { ...state };
  }),
  on(GameActions.countDown, (state) => {
    const current = state.timer;
    const newTimerVal = (current > 0) ? current - 1 : current;
    return { ...state, timer: newTimerVal};
  }),
  on(GameActions.updateScore, (state, {score}) => {
    return { ...state, score };
  }),
  on(GameActions.updateState, (state, {gameState}) => {
    return { ...state, gameState };
  }),
  on(GameActions.resetGame, () => {
    return { ...initGameData() };
  }),
);
