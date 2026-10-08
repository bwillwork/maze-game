import {Game, Setup} from '../types/data.types';

export function initSetupData(): Setup {
  return {
    size: {
      width: 0,
      height: 0,
    },
    time: 0,
  };
}

export function initGameData(): Game {
  return { timer: 0, score: 0, total: 0, state: "Needs Setup" };
}
