import { MazeSize } from './maze.types';

export type GameState = "Needs Setup" | "Started" | "Finished";

// Time is in minutes
export type TimeLimit = -1 | 20 | 10 | 5;

export const NoTimeLimit: TimeLimit = -1;
export const EasyTimeLimit: TimeLimit = 20;
export const ChallengingTimeLimit: TimeLimit = 10;
export const HardTimeLimit:TimeLimit = 5;

export type SetUp = {
  timeLimit: TimeLimit,
  size: MazeSize,
};

export type Game = {
  timer: number,
  total: number,
  score: number,
  gameState: GameState
};
