import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {
  private fb = inject(FormBuilder);
  private users = inject(UserService);
  private router = inject(Router);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  submitting = false;
  error = '';

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.error = '';

    this.users.loginUser(this.form.value).subscribe({
      next: ({ token, user }) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigate(['/home']);
      },
      error: err => {
        const message = err.error?.message ?? 'Credenciales inválidas';
        this.error = message;

        const passwordControl = this.form.get('password');
        passwordControl?.setErrors({ invalidCredentials: true });
        passwordControl?.markAsTouched();
        this.form.updateValueAndValidity({ onlySelf: false });

        this.submitting = false;
      }
    });
  }
}
