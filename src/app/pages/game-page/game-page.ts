import { Component, inject, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSetup, selectSetupState } from '../../data/selectors/setup.selectors';
import { Subscription } from 'rxjs';
import { AppState } from '../../types/redux.types';

@Component({
  imports: [],
  selector: 'app-game-page',
  styleUrl: './game-page.css',
  templateUrl: './game-page.html',
})
export class GamePage implements OnDestroy {
  private store: Store<AppState> = inject(Store<AppState>);
  private setup$ = this.store.select(selectSetupState);
  private subs: Array<Subscription> = [];

  constructor() {
    this.setup$.subscribe(s => {
      console.log("Yo ----- ",s);
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
    while (this.subs.length > 0) this.subs.pop();
  }
}
