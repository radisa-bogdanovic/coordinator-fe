import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Button } from '../../UI/button/button';
import { AuthService } from '../../core/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { safeReturnUrl } from '../../core/auth/auth.utils';

@Component({
  selector: 'app-login',
  imports: [Button, ReactiveFormsModule],
  templateUrl: './login.html',
  standalone: true,
})
export class Login implements OnInit {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly loading = signal(false);
  protected readonly errorMsg = signal<string | null>(null);

  protected readonly form = new FormGroup({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5)],
    }),
  });

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      void this.router.navigate(['/dashboard']);
    }
  }

  protected onSubmit(): void {
    this.errorMsg.set(null);
    this.form.markAllAsTouched();
    if (this.form.invalid) {
      return;
    }
    this.loading.set(true);

    // const { email, password } = this.form.getRawValue();
    console.log(this.form.getRawValue());
    const success = this.auth.login(this.form.getRawValue());

    if (!success) {
      this.errorMsg.set('Pogresan email ili lozinka');
      this.loading.set(false);
      return;
    }
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    (console.log(returnUrl), console.log(safeReturnUrl(returnUrl)));
    void this.router.navigateByUrl(safeReturnUrl(returnUrl));
  }
}
