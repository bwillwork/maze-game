import { Equals } from './SimpleMaze';



class Stack<D extends Equals<D>> implements Equals<Stack<D>> {
  private data: Array<D> = [];

  isEmpty() {
    return this.data.length === 0;
  }

  push() {}
  pop() {}
  peak() {}


  equals(other: Stack<D>): boolean {
    return false;
  }
}




class GridCell<D extends Equals<D>> implements Equals<GridCell<D>> {
  private readonly row: number;
  private readonly column: number;
  private data: D | undefined;
  constructor(row: number, column: number) {
    this.row = row;
    this.column = column;
  }
  getData(): D | undefined {
    return this.data;
  }
  setData(data: D) {
    this.data = data;
  }
  getRow() {
    return this.row;
  }
  getColumn() {
    return this.column;
  }
  equals(other: GridCell<D>): boolean {
    const sameRow = this.row === other.getRow();
    const sameColumn = this.getColumn() === other.getColumn();

    const data = this.getData();
    const otherData = other.getData();

    const sameData = (data && otherData) ? data.equals(otherData) : false;
    return sameData && sameRow && sameColumn;
  }
}

class MatrixCell<D extends Equals<D>> implements Equals<MatrixCell<D>> {
  private readonly from: D;
  private readonly to: D;
  constructor(from: D, to: D) {
    this.from = from;
    this.to = to;
  }

  getFrom(): D {
    return this.from;
  }
  getTo(): D {
    return this.to;
  }
  other() {

  }

  equals(other: MatrixCell<D>): boolean {
    return this.from.equals(other.getFrom()) && this.to.equals(other.getTo());
  }
}

export class OtherMaze <D extends Equals<D>> {
  private grid: Array<Array<GridCell<D>>> = [];
  private matrix: Array<Array<MatrixCell<GridCell<D>>>> = [];

  constructor(rows: number, columns: number) {
    if(rows < 1) return;
    if(columns < 1) return;

    for(let r = 0; r < rows; ++r) {
      const row: Array<GridCell<D>> = [];
      for(let c = 0; c < columns; ++c) {
        const cell = new GridCell<D>(r,c);

      }
      this.grid.push(row);
    }
  }

}
