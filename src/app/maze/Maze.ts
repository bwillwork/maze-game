import { MazeSize } from '../types/maze.types';

export interface Node<D> {
  getData(): D | undefined;
  setData(data: D): void;
}

export interface Cell {
  getRow(): number;
  getColumn(): number;
  hasVisited(): boolean;
  setVisited(visited: boolean): void;
}

export interface Edge<D, N extends Node<D>> {
  getA(): N;
  getB(): N;
}

export interface Path {
  isPath(): boolean;
  setPath(path: boolean): void;
}

export interface Equals<O> {
  equals(other: O): boolean;
}

export class MazeCell<D> implements Node<D>, Cell, Equals<MazeCell<D>> {
  private readonly row: number;
  private readonly column: number;
  private visited: boolean = false;
  private data: D | undefined;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
  }
  equals(other: MazeCell<D>): boolean {
    return this.row === other.getRow() && this.column === other.getColumn();
  }
  getRow(): number {
    return this.row;
  }
  getColumn(): number {
    return this.column;
  }

  hasVisited(): boolean {
    return this.visited;
  }
  setVisited(visited: boolean): void {
    this.visited = visited;
  }

  getData(): D | undefined {
    return this.data;
  }
  setData(data: D): void {
    this.data = data;
  }
}

export class MazeWall<D> implements Edge<D, MazeCell<D>>, Path, Equals<MazeWall<D>> {
  private path: boolean = false;
  private readonly a: MazeCell<D>;
  private readonly b: MazeCell<D>;

  constructor(a: MazeCell<D>, b: MazeCell<D>) {
    this.a = a;
    this.b = b;
  }

  equals(other: MazeWall<D>): boolean {
    const _a = other.getA();
    const _b = other.getB();
    return (
      (_a.equals(this.a) && _b.equals(this.b)) ||
      (_a.equals(this.b) && _b.equals(this.a))
    );
  }

  isPath(): boolean {
    return this.path;
  }
  setPath(path: boolean): void {
    this.path = path;
  }

  getA(): MazeCell<D> {
    return this.a;
  }
  getB(): MazeCell<D> {
    return this.b;
  }
}

export class Maze<D> {
  private grid: Array<Array<MazeCell<D>>> = [];

  private nodes: Array<MazeCell<D>> = [];
  private edges: Array<MazeWall<D>> = [];

  private readonly size: MazeSize;

  constructor(size: MazeSize) {
    this.size = size;
    for(let r = 0; r < size.height; ++r) {
      const row: Array<MazeCell<D>> = [];
      for (let c = 0; c < size.width; ++c) {

        const cell = new MazeCell<D>(r,c);
        row.push(cell);
        this.nodes.push(cell);

        if(r > 0) this.edges.push(new MazeWall<D>(this.grid[r - 1][c],cell));
        if(c > 0) this.edges.push(new MazeWall<D>(this.grid[r][c - 1], cell));
      }
      this.grid.push(row);
    }
  }


}
