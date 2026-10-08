
export type MazeSize = {
  width: number,
  height: number
};

export const SmallMaze: MazeSize = { height: 10, width: 10 };
export const MediumMaze: MazeSize = { height: 25, width: 25 };
export const LargeMaze: MazeSize = { height: 100, width: 75 };

export type Maze = {
  size: MazeSize
};

export interface MazeGenerator {
  generate(): Maze;
}


