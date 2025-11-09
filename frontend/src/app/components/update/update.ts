import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, Header, Footer],
  templateUrl: './update.html',
  styleUrl: './update.css',
})
export class Update implements OnInit {
  private platformId = inject(PLATFORM_ID);
  form: FormGroup;
  submitting = false;
  error = '';
  private userId: string | null = null;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      surname: [''],
      nick: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const stored = localStorage.getItem('user');
    this.userId = stored ? JSON.parse(stored)?._id : null;
    if (!this.userId) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.userService.getUserProfile(this.userId).subscribe({
      next: res => {
        const user = res.user ?? res;
        this.form.patchValue({
          name: user.name ?? '',
          surname: user.surname ?? '',
          nick: user.nick ?? '',
          email: user.email ?? ''
        });
      },
      error: err => console.error('Error al cargar perfil:', err)
    });
  }

  submit(): void {
    if (this.form.invalid || !this.userId) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.error = '';

    console.log('update payload', this.form.value, 'userId', this.userId);
    // Usar el método correcto del servicio (updateUser)
    this.userService.updateUser(this.userId, this.form.value).subscribe({
      next: () => {
        this.submitting = false;
        const stored = localStorage.getItem('user');
        if (stored) {
          const u = JSON.parse(stored);
          const updated = { ...u, ...this.form.value };
          localStorage.setItem('user', JSON.stringify(updated));
        }
        this.router.navigateByUrl('/profile');
      },
      error: err => {
        this.submitting = false;
        console.error('update error full:', err);
        // mostrar detalle real si existe
        this.error = err.error?.message ?? err.message ?? JSON.stringify(err);
      }
    });
  }
}