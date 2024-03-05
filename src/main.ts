import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { rxState } from '@rx-angular/state';
import { RxLet } from '@rx-angular/template/let';

import 'zone.js';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RxLet],
  standalone: true,
  template: `
  <!-- display the value => structural directive rxlet to bind the state property of our component -->
  <div *rxLet="state$; let state">
   Value:{{state.count}}
</div>
  <button (click)="onClick($event)">Add One</button>
  <button (click)="remove($event)">Remove One</button>

  `,
})
export class App {
  //state: { count: number } = { count: 0 }; //set initnial value to zero in our state
  // rxState function. The component's state is a simple interface: { count: number }. Inside the class we expose our state as Observable
  readonly state = rxState<{ count: number }>(({ set }) => set({ count: 0 }));
  readonly state$ = this.state.select();

  onClick(e: any) {
    console.log(e);
    this.state.set('count', (state) => state.count + 1);
    // this.state.count = this.state.count + 1; // will add +1 to the value state
  }

  remove(e: any) {
    this.state.set('count', (state) => state.count - 1);
    // this.state.count = this.state.count - 1;
  }
}

bootstrapApplication(App);
