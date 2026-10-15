import { Game, SetUp } from './data.types';

export type SetupActionsType = {
  setTimeLimit: string,
  setSize: string,
  resetSetup: string
};

export type GameActionsType = {
  setupGame: string,
  countDown: string,
  updateScore: string,
  updateState: string,
  resetGame: string,
};

export interface AppState {
  setup: SetUp,
  game: Game
}
