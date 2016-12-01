/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';
import { SimpleNotificationsComponent } from 'angular2-notifications'

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './scss/application.scss'
  ],
  template: `
  <simple-notifications [options]="options"></simple-notifications>
  <router-outlet></router-outlet>
  `
})
export class App {

  constructor(
    public appState: AppState) {

  }

  ngOnInit() {
    console.log('Initial App State', this.appState.state);
  }

  public options = {
      position: ["bottom", "right"],
      timeOut: 5000,
      lastOnBottom: true
  }

}
