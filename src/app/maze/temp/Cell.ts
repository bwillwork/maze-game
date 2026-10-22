import { MazeElement } from './MazeElement';
import { Equals } from './Equals';

export class Cell implements Equals<Cell> {
  public readonly row: number;
  public readonly column: number;
  public data: MazeElement | undefined;

  public root: boolean = false;
  public leaf: boolean = false;

  public visited: boolean = false;
  public turn: boolean = false;

  constructor(row: number, column: number, data: MazeElement) {
    this.row = row;
    this.column = column;
    this.data = data;
  }

  equals(other: Cell): boolean {
    return this.row === other.row && this.column === other.column;
  }
}
