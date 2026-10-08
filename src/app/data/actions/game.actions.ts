import {GameActionsType} from '../../types/redux.types';
import { createAction, props } from '@ngrx/store';
import { GameState, SetUp } from '../../types/data.types';

const testKey = '[Game]';

export const ActionKeys: GameActionsType = {
  setupGame: `${testKey} Setup Game`,
  countDown: `${testKey} Count Down`,
  updateScore: `${testKey} Update Score`,
  updateState: `${testKey} Update State`,
  resetGame: `${testKey} Reset Game`,
};

export const setupGame = createAction(ActionKeys.setupGame, props<{setUp: SetUp}>());
export const countDown = createAction(ActionKeys.countDown);
export const updateScore = createAction(ActionKeys.updateScore, props<{score: number}>());
export const updateState = createAction(ActionKeys.updateState, props<{ gameState: GameState }>());
export const resetGame = createAction(ActionKeys.resetGame);
