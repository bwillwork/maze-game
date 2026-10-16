import { Component, computed, inject, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSetup, selectSetupState } from '../../data/selectors/setup.selectors';
import { map, Subscription } from 'rxjs';
import { AppState } from '../../types/redux.types';
import { Character, Maze, MazeCell, MazeElement, SimpleMaze } from '../../maze/SimpleMaze';
import { toSignal } from '@angular/core/rxjs-interop';
import { NgClass } from '@angular/common';

@Component({
  imports: [NgClass],
  selector: 'app-game-page',
  styleUrl: './game-page.css',
  templateUrl: './game-page.html',
})
export class GamePage implements OnDestroy {
  private store: Store<AppState> = inject(Store<AppState>);
  private setup$ = this.store.select(selectSetupState);
  private subs: Array<Subscription> = [];

  maze = toSignal(this.setup$.pipe(map((s) => new SimpleMaze<MazeElement>(s.size))));
  grid = computed(() => {
    const graph = this.maze();
    if (graph) return graph.getGrid();
    else return [[]] as Array<Array<MazeCell<MazeElement>>>;
  });
  characterCell = computed(() => {
    return this.maze()?.find(new Character());
  });

  constructor() {
    this.setup$.subscribe((s) => {
      console.log('Yo ----- ', s);

      const sm = new SimpleMaze<MazeElement>(s.size);

      sm.getRoot()?.setData(new Character());

      console.log(sm.getGrid());
      console.log(sm.getPaths());

      console.log('Root: ', sm.getRoot());
      console.log('Leaves: ', sm.getLeaves());
    });
  }

  hasPathUp(cell: MazeCell<MazeElement>): boolean {
    const maze = this.maze();
    return maze ? this.hasPath(maze, cell, cell.getRow() - 1, cell.getColumn()) : false;
  }
  hasPathRight(cell: MazeCell<MazeElement>): boolean {
    const maze = this.maze();
    return maze ? this.hasPath(maze, cell, cell.getRow(), cell.getColumn() + 1) : false;
  }
  hasPathDown(cell: MazeCell<MazeElement>): boolean {
    const maze = this.maze();
    return maze ? this.hasPath(maze, cell, cell.getRow() + 1, cell.getColumn()) : false;
  }
  hasPathLeft(cell: MazeCell<MazeElement>): boolean {
    const maze = this.maze();
    return maze ? this.hasPath(maze, cell, cell.getRow(), cell.getColumn() - 1) : false;
  }

  private hasPath(
    maze: Maze<MazeElement>,
    cell: MazeCell<MazeElement>,
    row: number,
    column: number,
  ) {
    return (
      maze
        .getPaths()
        .filter((p) => p.getA().equals(cell) || p.getB().equals(cell))
        .map((p) => (p.getA().equals(cell) ? p.getB() : p.getA()))
        .findIndex((c) => c.getRow() === row && c.getColumn() === column) !== -1
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
    while (this.subs.length > 0) this.subs.pop();
  }

  protected readonly MazeCell = MazeCell;
}
