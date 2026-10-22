import { Cell } from './Cell';

export class Pathway {
  public readonly a: Cell;
  public readonly b: Cell;

  constructor(a: Cell, b: Cell) {
    this.a = a;
    this.b = b;
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
