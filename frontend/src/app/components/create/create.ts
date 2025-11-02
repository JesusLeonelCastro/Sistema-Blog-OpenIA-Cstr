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
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

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
    if (this.form.invalid) return;
    this.submitting = true;
    this.error = '';

    this.userService.createUser(this.form.value).subscribe({
      next: () => this.router.navigate(['/home']),
      error: err => {
        this.error = err.error?.message ?? 'No se pudo crear el usuario';
        this.submitting = false;
      }
    });
  }
}