import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNav } from '../../sideHeader/sideHeader';

@Component({
  selector: 'app-shell',
  imports: [RouterOutlet, SideNav],
  templateUrl: './app-shell.html',
})
export class AppShell {}
