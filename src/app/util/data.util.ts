import { Game, NoTimeLimit, SetUp } from '../types/data.types';
import { SmallMaze } from '../types/maze.types';

export function initSetupData(): SetUp {
  return {
    size: SmallMaze,
    time: NoTimeLimit,
  };
}

export function initGameData(): Game {
  return { timer: 0, score: 0, total: 0, gameState: "Needs Setup" };
}
