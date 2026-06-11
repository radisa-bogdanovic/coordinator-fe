import { HttpErrorResponse, HttpInterceptor, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { API_CONFIG } from '../api/api.config';
import { catchError, finalize, switchMap, throwError } from 'rxjs';

let refreshInFlight: ReturnType<AuthService['refreshSession']> | null = null;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const withCookies = req.clone({ withCredentials: true });

  const isAuthEndpoint =
    req.url.includes(API_CONFIG.auth.login) ||
    req.url.includes(API_CONFIG.auth.logout) ||
    req.url.includes(API_CONFIG.auth.refresh);

  return next(withCookies).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401 || isAuthEndpoint) {
        return throwError(() => error);
      }

      if (!refreshInFlight) {
        refreshInFlight = auth.refreshSession().pipe(
          finalize(() => {
            refreshInFlight = null;
          }),
          catchError((e) => {
            auth.clearLocalState();
            return throwError(() => e);
          }),
        );
      }

      return refreshInFlight.pipe(
        switchMap((ok) => {
          if (!ok) {
            return throwError(() => error);
          }
          return next(withCookies);
        }),
      );
    }),
  );
};
