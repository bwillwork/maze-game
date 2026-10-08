import { MazeSize } from './maze.types';

export type GameState = "Needs Setup" | "Started" | "Finished";

// Time is in minutes
export type NoTimeLimit = -1;
export type EasyTimeLimit = 20;
export type ChallengingTimeLimit = 10;
export type HardTimeLimit = 5;

export type TimeLimit = NoTimeLimit | EasyTimeLimit | ChallengingTimeLimit | HardTimeLimit;

export type Setup = {
  time: TimeLimit,
  size: MazeSize,
};

export type Game = {
  timer: number,
  total: number,
  score: number,
  state: GameState
};
