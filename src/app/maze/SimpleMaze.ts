import { MazeSize } from '../types/maze.types';
import { from } from 'rxjs';

export interface Node<D> {
  getData(): D | undefined;
  setData(data: D | undefined): void;
  isRoot(): boolean;
  setRoot(isRoot: boolean): void;
  isLeaf(): boolean;
  setLeaf(isLeaf: boolean): void;
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
  private root: boolean = false;
  private leaf: boolean = false;
  private data: D | undefined;

  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
  }
  isRoot(): boolean {
    return this.root;
  }
  setRoot(isRoot: boolean): void {
    this.root = isRoot;
  }
  isLeaf(): boolean {
    return this.leaf;
  }
  setLeaf(isLeaf: boolean): void {
    this.leaf = isLeaf;
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
  setData(data: D | undefined): void {
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

export interface MazeElement extends Equals<MazeElement> {
  isCharacter(): boolean;
  isGoal(): boolean;
}

export class Character implements MazeElement {
  equals(other: MazeElement): boolean {
    return this.isCharacter() === other.isCharacter() && this.isGoal() === other.isGoal();
  }
  isCharacter(): boolean {
    return true;
  }

  isGoal(): boolean {
    return false;
  }
}

export class Goal implements MazeElement {
  isCharacter(): boolean {
    return false;
  }

  isGoal(): boolean {
    return true;
  }

  equals(other: MazeElement): boolean {
    return this.isCharacter() === other.isCharacter() && this.isGoal() === other.isGoal();
  }
}


export interface Maze<D extends Equals<D>> {
  getGrid(): Array<Array<MazeCell<D>>>;
  getPaths(): Array<MazeWall<D>>;
  getData(row: number, column: number): D | undefined;
  find(data: D): MazeCell<D> | undefined;

  placeData(data:D, row: number, column: number): void;
  moveData(from: MazeCell<D>, to: MazeCell<D>): boolean;

  getFilledCells(): Array<MazeCell<D>>;
  getWalkedPath(): Array<MazeCell<D>>;

  getRoot(): MazeCell<D> | undefined;
  getLeaves(): Array<MazeCell<D>>;

}

export class SimpleMaze<D extends Equals<D>> implements Maze<D> {
  private grid: Array<Array<MazeCell<D>>> = [];

  private nodes: Array<MazeCell<D>> = [];
  private edges: Array<MazeWall<D>> = [];
  private walkedPaths: Array<MazeWall<D>> = [];

  private readonly size: MazeSize;

  constructor(size: MazeSize) {
    this.size = size;
    for (let r = 0; r < size.height; ++r) {
      const row: Array<MazeCell<D>> = [];
      for (let c = 0; c < size.width; ++c) {
        const cell = new MazeCell<D>(r, c);
        row.push(cell);
        this.nodes.push(cell);

        if (r > 0) this.edges.push(new MazeWall<D>(this.grid[r - 1][c], cell));
        if (c > 0) this.edges.push(new MazeWall<D>(row[c - 1], cell));
      }
      this.grid.push(row);
    }

    console.log('-- Yo --');

    this.randomize();
  }
  find(data: D): MazeCell<D> | undefined {
    for(const row of this.grid) {
      for(const col of row) {
        if(col.getData()?.equals(data)) return col;
      }
    }
    return undefined;
  }
  getRoot(): MazeCell<D> | undefined {
    return this.nodes.find((n) => n.isRoot());
  }
  getLeaves(): MazeCell<D>[] {
    return this.nodes.filter((n) => n.isLeaf());
  }

  private randomize() {
    const index = this.getRandomIndex(this.nodes);
    this.nodes[index].setRoot(true);
    this.backtrack(this.nodes[index]);
  }

  private backtrack(cell: MazeCell<D>) {
    cell.setVisited(true);
    let unvisitedNeighbors = this.unvisitedNeighbors(cell);
    if (unvisitedNeighbors.length === 0) cell.setLeaf(true);
    while (unvisitedNeighbors.length > 0) {
      const randIndex = this.getRandomIndex(unvisitedNeighbors);
      const nextCell = unvisitedNeighbors[randIndex];
      this.createPath(cell, nextCell);
      this.backtrack(nextCell);
      unvisitedNeighbors = this.unvisitedNeighbors(cell);
    }
  }

  private unvisitedNeighbors(cell: MazeCell<D>): Array<MazeCell<D>> {
    return this.edges
      .filter((e) => e.getA().equals(cell) || e.getB().equals(cell))
      .map((e) => (e.getA().equals(cell) ? e.getB() : e.getA()))
      .filter((c) => !c.hasVisited());
  }

  private getRandomIndex<T>(array: Array<T>): number {
    return Math.floor(Math.random() * array.length);
  }

  private createPath(a: MazeCell<D>, b: MazeCell<D>) {
    const temp = new MazeWall<D>(a, b);
    const index: number = this.edges.findIndex((e) => e.equals(temp));
    if (index !== -1) this.edges[index].setPath(true);
  }

  getFilledCells(): Array<MazeCell<D>> {
    return this.nodes.filter((n) => n.getData());
  }

  getGrid(): Array<Array<MazeCell<D>>> {
    return this.grid;
  }

  getPaths(): Array<MazeWall<D>> {
    return this.edges.filter((e) => e.isPath());
  }

  getWalkedPath(): Array<MazeCell<D>> {
    return [];
  }

  moveData(from: MazeCell<D>, to: MazeCell<D>): boolean {
    const temp = new MazeWall<D>(from, to);
    const hasPath = this.getPaths().findIndex((p) => p.equals(temp)) !== -1;
    if (hasPath) {
      const data = from.getData();
      if (data) {
        // TODO: handle the case when there is an other element in the target cell
        to.setData(data);
        from.setData(undefined); // Clear old data
        return true;
      }
    }
    return false;
  }

  placeData(data: D, row: number, column: number): void {
    if (row < 0 && row >= this.grid.length) return;
    if (column < 0 && column >= this.grid[row].length) return;
    this.grid[row][column].setData(data);
  }

  getData(row: number, column: number): D | undefined {
    if (row < 0 && row >= this.grid.length) return undefined;
    if (column < 0 && column >= this.grid[row].length) return undefined;
    return this.grid[row][column].getData();
  }
}
