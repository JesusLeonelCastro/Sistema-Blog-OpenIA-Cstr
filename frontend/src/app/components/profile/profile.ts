import { Component, OnInit, inject, PLATFORM_ID , ChangeDetectorRef} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { UserService } from '../../service/user.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, Header, Footer, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {

  profile: any = null;
  loading = false;
  error = '';

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
    // ...other injections...
  ) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    const id = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}')._id : null;
    if (!id) {
      this.error = 'Usuario no autenticado';
      this.loading = false;
      try { this.cdr.detectChanges(); } catch (e) { /* noop */ }
      return;
    }
    this.userService.getUserProfile(id).subscribe({
      next: (res) => {
        this.profile = res.user ?? res;
        this.loading = false;
        try { this.cdr.detectChanges(); } catch (e) { /* noop */ }
      },
      error: (err) => {
        console.error('Error cargando perfil', err);
        this.error = err.error?.message ?? err.message ?? 'Error';
        this.loading = false;
        try { this.cdr.detectChanges(); } catch (e) { /* noop */ }
      }
    });
  }
  
}