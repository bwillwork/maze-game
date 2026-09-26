import { Service } from '@angular/core';
import {Maze, MazeGenerator} from '../../types/maze.types';

@Service()
export class MazeGeneratorService implements MazeGenerator {

  generate(): Maze {
    throw new Error("Method not implemented.");
  }

}
