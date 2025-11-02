import { Component , inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.html',
  styleUrl: './create.css'
})
export class Create {
  private fb = inject(FormBuilder);
  private users = inject(UserService);
  private router = inject(Router);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(60)]],
    surname: ['', [Validators.required, Validators.maxLength(60)]],
    nick: ['', [Validators.required, Validators.maxLength(40)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  submitting = false;
  error = '';

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.submitting = true;
    this.error = '';

    this.users.createUser(this.form.value).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => {
        const message = err.error?.message ?? 'No se pudo registrar';
        this.error = message;

        this.form.get('nick')?.setErrors({ backend: true });
        this.form.get('email')?.setErrors({ backend: true });
        this.form.markAllAsTouched();
        this.submitting = false;
      }
    });
  }
}