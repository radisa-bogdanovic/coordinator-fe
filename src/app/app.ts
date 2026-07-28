import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/auth/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('coordinator-fe');
  protected readonly isInitializing = signal(true);

  private readonly auth = inject(AuthService);

  constructor() {
    void this.auth.ensureSession().finally(() => {
      this.isInitializing.set(false);
    });
  }
}
