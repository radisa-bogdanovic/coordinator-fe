import { isPlatformServer } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { computed, inject, Injectable, PLATFORM_ID, REQUEST, signal } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, firstValueFrom, map, Observable, of, switchMap, tap } from 'rxjs';
import { API_CONFIG } from '../api/api.config';
import { LoginCredentials, User } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly request = inject(REQUEST, { optional: true });

  private readonly baseUrl = API_CONFIG.baseUrl;

  readonly currentUser = signal<User | null>(null);

  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  /** In-flight ensureSession promise — deduplicates concurrent calls. */
  private sessionInFlight: Promise<boolean> | null = null;

  private buildRequestOptions() {
    const headers = new HttpHeaders();

    if (isPlatformServer(this.platformId)) {
      const requestHeaders = this.request?.headers as
        | { get?: (name: string) => string | null; cookie?: string }
        | undefined;
      const cookie = requestHeaders?.get?.('cookie') ?? requestHeaders?.cookie;

      if (cookie) {
        headers.set('cookie', cookie);
      }
    }

    return { headers, withCredentials: true };
  }

  loadSession(): Observable<User | null> {
    return this.http.get<User>(`${this.baseUrl}${API_CONFIG.auth.me}`, this.buildRequestOptions()).pipe(
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
    return this.http.post<any>(`${this.baseUrl}${API_CONFIG.auth.login}`, credentails, this.buildRequestOptions()).pipe(
      switchMap(() => this.loadSession()),
      map((user) => user !== null),
      catchError(() => {
        this.clearLocalState();
        return of(null);
      }),
    );
  }

  refreshSession(): Observable<boolean> {
    return this.http.post<void>(`${this.baseUrl}${API_CONFIG.auth.refresh}`, {}, this.buildRequestOptions()).pipe(
      map(() => true),
      catchError(() => {
        this.clearLocalState();
        return of(false);
      }),
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}${API_CONFIG.auth.logout}`, {}, this.buildRequestOptions()).pipe(
      tap(() => {
        this.clearBrowserSession();
        this.clearLocalState();
        void this.router.navigate(['/login']);
      }),
      catchError(() => {
        this.clearBrowserSession();
        this.clearLocalState();
        void this.router.navigate(['/login']);
        return of(undefined);
      }),
    );
  }

  async ensureSession(): Promise<boolean> {
    if (this.isAuthenticated()) return true;

    // Deduplicate concurrent calls — reuse the same in-flight promise
    if (!this.sessionInFlight) {
      this.sessionInFlight = firstValueFrom(this.loadSession())
        .then((user) => user !== null)
        .finally(() => {
          this.sessionInFlight = null;
        });
    }

    return this.sessionInFlight;
  }

  clearLocalState(): void {
    this.currentUser.set(null);
  }

  clearBrowserSession(): void {
    if (typeof document === 'undefined') {
      return;
    }

    const cookies = document.cookie.split(';');
    cookies.forEach((cookie) => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.slice(0, eqPos).trim() : cookie.trim();
      // Try multiple path/domain combinations to ensure cleanup
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=Lax`;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;SameSite=None;Secure`;
    });
  }
}
