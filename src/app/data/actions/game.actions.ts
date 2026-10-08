import {GameActionsType} from '../../types/redux.types';
import { createAction, props } from '@ngrx/store';
import { Setup } from '../../types/data.types';

const testKey = '[Game]';

export const GameActions: GameActionsType = {
  setupGame: `${testKey} Setup Game`,
  updateScore: `${testKey} Update Score`,
  resetScore: `${testKey} Reset Score`,
};

export const setupGame = createAction(GameActions.setupGame, props<Setup>());
