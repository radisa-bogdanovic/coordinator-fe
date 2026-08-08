import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Button } from '../UI/button/button/button';
import { AuthService } from '../core/auth/auth.service';

type NavItem = {
  label: string;
  path: string;
};

@Component({
  selector: 'side-header',
  imports: [NgClass, RouterLinkActive, RouterLink, Button],
  templateUrl: './sideHeader.html',
})
export class SideNav {
  private readonly auth = inject(AuthService);

  protected readonly collapsed = signal(false);
  protected readonly user = this.auth.currentUser;

  protected readonly navItems: NavItem[] = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Tasks', path: '/tasks' },
    { label: 'Notes', path: '/notes' },
    { label: 'About', path: '/about' },
  ];

  protected toggleCollapsed(): void {
    this.collapsed.update((value) => !value);
  }

  protected logout(): void {
    void this.auth.logout().subscribe({
      next: () => undefined,
      error: () => undefined,
    });
  }
}
