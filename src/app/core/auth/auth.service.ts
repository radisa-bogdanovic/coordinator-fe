import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthMeResponse, LoginCredentials, User } from './auth.models';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG } from '../api/api.config';
import { catchError, firstValueFrom, map, Observable, of, switchMap, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly baseUrl = API_CONFIG.baseUrl;

  readonly currentUser = signal<User | null>(null);

  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  loadSession(): Observable<User | null> {
    return this.http.get<User>(`${this.baseUrl}${API_CONFIG.auth.me}`).pipe(
      map((res) => {
        this.currentUser.set(res);

        return res;
      }),
      catchError(() => {
        this.clearLocalState();
        return of(null);
      }),
    );
  }

  login(credentails: LoginCredentials): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}${API_CONFIG.auth.login}`, credentails).pipe(
      switchMap(() => this.loadSession()),
      map((user) => user !== null),
      catchError(() => {
        this.clearLocalState();
        return of(null);
      }),
    );
  }

  refreshSession(): Observable<boolean> {
    return this.http.post<void>(`${this.baseUrl}${API_CONFIG.auth.refresh}`, {}).pipe(
      map(() => true),
      catchError(() => {
        this.clearLocalState();
        return of(false);
      }),
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${API_CONFIG.auth.logout}`, {}).pipe(
      tap(() => {
        this.clearLocalState();
        void this.router.navigate(['/login']);
      }),
      catchError(() => {
        this.clearLocalState();
        void this.router.navigate(['/login']);
        return of(undefined);
      }),
    );
  }

  async ensureSession(): Promise<boolean> {
    if (this.isAuthenticated()) return true;
    const user = await firstValueFrom(this.loadSession());

    return user !== null;
  }

  clearLocalState(): void {
    this.currentUser.set(null);
  }
}
