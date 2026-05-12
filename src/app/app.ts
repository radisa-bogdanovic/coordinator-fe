import { Component, signal } from '@angular/core';

import { RouterOutlet } from '@angular/router';
import { SideNav } from './sideHeader/sideHeader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideNav],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('coordinator-fe');
}
