import { PLATFORM_ID, REQUEST } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { API_CONFIG } from '../api/api.config';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: PLATFORM_ID, useValue: 'server' },
        { provide: REQUEST, useValue: { headers: { cookie: 'session=abc123' } } },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('forwards the request cookie when resolving the current session on the server', () => {
    service.loadSession().subscribe();

    const req = httpMock.expectOne(`${API_CONFIG.baseUrl}${API_CONFIG.auth.me}`);
    expect(req.request.headers.get('cookie')).toBe('session=abc123');

    req.flush({ id: 1, email: 'user@example.com' });
  });
});
