import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

type NavItem = {
  label: string;
  path: string;
};

@Component({
  selector: 'side-header',
  imports: [NgClass, RouterLinkActive, RouterLink],
  templateUrl: './sideHeader.html',
})
export class SideNav {
  protected readonly collapsed = signal(false);

  protected readonly navItems: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Tasks', path: '/tasks' },
    { label: 'Notes', path: '/notes' },
    { label: 'About', path: '/about' },
  ];

  protected toggleCollapsed(): void {
    this.collapsed.update((value) => !value);
  }
}
