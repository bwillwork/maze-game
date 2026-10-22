import { Cell } from './Cell';
import { Wall } from './Wall';
import { Pathway } from './Pathway';
import { MazeSize } from '../../types/maze.types';
import { MazeElement } from './MazeElement';

export class Maze {
  private grid: Array<Array<Cell>> = [];
  private cells: Array<Cell> = [];
  private walls: Array<Wall> = [];
  private paths: Array<Pathway> = [];

  private size: MazeSize;

  constructor(size: MazeSize) {
    this.size = size;
    if (size.width < 1 || size.height < 1)
      throw new Error('width and height must be greater than 0');

    // Create Grid, Cells, and Walls
    for (let r = 0; r < size.height; ++r) {
      const row: Array<Cell> = [];
      for (let c = 0; c < size.width; ++c) {
        const cell = new Cell(r, c, MazeElement.createEmpty());
        row.push(cell);
        this.cells.push(cell);

        if (r > 0) this.walls.push(new Wall(this.grid[r - 1][c], cell));
        if (c > 0) this.walls.push(new Wall(row[c - 1], cell));
      }
      this.grid.push(row);
    }

    // Create Random Maze
    const index = this.getRandomIndex(this.cells);
    this.cells[index].root = true;
    this.backtrack(this.cells[index]);

    // Set Turn Cells
    for (const cell of this.cells) {
      const cells = this.walls
        .filter((c) => c.isPath())
        .filter((p) => p.has(cell))
        .map((p) => p.getOther(cell));

      cell.turn =
        cells.length > 2 ||
        (cells.length === 2 &&
          cells[0].row !== cells[1].row &&
          cells[0].column !== cells[1].column);
    }

    // Create Pathways

    // Reset visited
    for (let r = 0; r < size.height; ++r) {
      for (let c = 1; c < size.width; ++c) {
        this.grid[r][c].visited = false;
      }
    }

    const root = this.cells.find(c => c.root);
    if(root) {
      this.createPathway(root,root);
    }

  }

  private createPathway(start: Cell, current: Cell) {
    current.visited = true;
    let unvisitedPaths = this.unvisitedPaths(current);
    while(unvisitedPaths.length > 0) {
      const next = unvisitedPaths[0];
      if(current.turn || current.leaf) {
        // Create pathway
        const noPath = this.paths.findIndex(p => p.hasAll(start,current)) === -1;
        if(!noPath) this.paths.push(new Pathway(start,current));

        // Continue
        this.createPathway(current, next);
      } else {
        this.createPathway(start,next);
      }

      unvisitedPaths = this.unvisitedPaths(current);
    }
    /*
    const hasPath = this.walls.findIndex(w => w.hasAll(current,last) && w.isPath());
    if((current.turn || current.leaf) && hasPath) {
      // Create pathway
      const noPath = this.paths.findIndex(p => p.hasAll(start,current)) === -1;
      if(!noPath) this.paths.push(new Pathway(start,current));

      // Continue


    } else if(!current.turn && hasPath) {
      // Continue Walking
      const row = current.row + direction.r;
      const column = current.column + direction.c;
      if(this.inBounds(row,column)) {
        const next = this.grid[row][column];
        this.createPathway(start,current,next,direction);
      }
    } else if(current.turn && !hasPath) {
      // Start New Walk
    } else {
      // Skip
    }
    */

  }

  /*
  private inBounds(row: number, column: number): boolean {
    return row < this.size.height && row >= 0 && column < this.size.width && column >= 0;
  }
   */

  private backtrack(cell: Cell) {
    cell.visited = true;
    let unvisitedNeighbors = this.unvisitedNeighbors(cell);
    if (unvisitedNeighbors.length === 0) cell.leaf = true;
    while (unvisitedNeighbors.length > 0) {
      const randIndex = this.getRandomIndex(unvisitedNeighbors);
      const nextCell = unvisitedNeighbors[randIndex];
      this.createPath(cell, nextCell);
      this.backtrack(nextCell);
      unvisitedNeighbors = this.unvisitedNeighbors(cell);
    }
  }

  private getRandomIndex<T>(array: Array<T>): number {
    return Math.floor(Math.random() * array.length);
  }

  private unvisitedNeighbors(cell: Cell): Array<Cell> {
    return this.walls
      .filter((e) => e.a.equals(cell) || e.b.equals(cell))
      .map((e) => (e.a.equals(cell) ? e.b : e.a))
      .filter((c) => !c.visited);
  }

  private unvisitedPaths(cell: Cell): Array<Cell> {
    return this.walls
      .filter((w) => w.has(cell) && w.isPath())
      .map((w) => (w.getOther(cell)))
      .filter((c) => !c.visited);
  }


  private createPath(a: Cell, b: Cell) {
    const index: number = this.walls.findIndex((w) => w.hasAll(a,b));
    if (index !== -1) this.walls[index].setPath(true);
  }
}
