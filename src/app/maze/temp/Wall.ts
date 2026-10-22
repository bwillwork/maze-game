import { MazeCell } from '../SimpleMaze';
import { Cell } from './Cell';

export class Wall {
  private path: boolean = false;
  public readonly a: Cell;
  public readonly b: Cell;

  constructor(a: Cell, b: Cell) {
    this.a = a;
    this.b = b;
  }

  equals(other: Wall): boolean {
    const _a = other.a;
    const _b = other.b;
    return (_a.equals(this.a) && _b.equals(this.b)) || (_a.equals(this.b) && _b.equals(this.a));
  }

  isPath(): boolean {
    return this.path;
  }
  setPath(path: boolean): void {
    this.path = path;
  }

  getOther(node: Cell): Cell {
    return this.a.equals(node) ? this.b : this.a;
  }

  has(node: Cell): boolean {
    return this.a.equals(node) || this.b.equals(node);
  }

  hasAll(a: Cell, b: Cell): boolean {
    return this.has(a) && this.has(b);
  }

}
