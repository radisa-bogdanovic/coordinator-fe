import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginCredentials, Role, User } from './auth.models';
import { isPlatformBrowser } from '@angular/common';

const TOKEN_KEY = 'coordinator_access_token';
const USER_KEY = 'coordinator_user';

const MOCK_EMAIL = 'tictac992@gmail.com';
const MOCK_PASSWORD = 'test123';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  readonly token = signal<string | null>(this.readToken());

  readonly currentUser = signal<User | null>(this.readUser());

  readonly isAuthenticated = computed(() => !!this.token());

  login(credentials: LoginCredentials): boolean {
    const email = credentials.email.trim().toLowerCase();
    const password = credentials.password;

    if (email !== MOCK_EMAIL || password !== MOCK_PASSWORD) {
      this.clearSession();
      return false;
    }
    const user: User = {
      id: 1,
      email: MOCK_EMAIL,
      role: Role.ADMIN,
    };
    this.persistSession('mock-access-token', user);
    return true;
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return this.token();
  }

  private persistSession(accessToken: string, user: User): void {
    this.token.set(accessToken);
    this.currentUser.set(user);

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private clearSession(): void {
    this.token.set(null);
    this.currentUser.set(null);

    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  //   private readFromLs(key: string) {
  //     if (!isPlatformBrowser(this.platformId)) {
  //       return null;
  //     }
  //     const rawData = localStorage.getItem(key);

  //     if (key === TOKEN_KEY) return rawData;

  //     if (!rawData) {
  //       return null;
  //     }
  //     try {
  //       return JSON.parse(rawData) as User;
  //     } catch {
  //       return null;
  //     }
  //   }

  private readToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return localStorage.getItem(TOKEN_KEY);
  }

  private readUser(): User | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    const rawData = localStorage.getItem(USER_KEY);

    if (!rawData) {
      return null;
    }
    try {
      return JSON.parse(rawData) as User;
    } catch {
      return null;
    }
  }
}
