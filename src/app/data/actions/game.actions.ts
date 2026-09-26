import {GameActionsType} from '../../types/redux.types';

const testKey = '[Seduction]';

export const GameActions: GameActionsType = {
  setupGame: `${testKey} Setup Game`,
  updateScore: `${testKey} Update Score`,
  resetScore: `${testKey} Reset Score`,
};

