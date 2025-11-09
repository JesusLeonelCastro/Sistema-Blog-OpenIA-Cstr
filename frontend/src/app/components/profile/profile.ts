import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, Header, Footer],
  templateUrl: './profile.html',
  styleUrl: './profile.css',
})
export class Profile implements OnInit {
  private platformId = inject(PLATFORM_ID);
  private users = inject(UserService);

  profile: any = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const stored = localStorage.getItem('user');
    const userId = stored ? JSON.parse(stored)?._id : null;
    if (!userId) return;

    this.users.getUserProfile(userId).subscribe({
      next: res => (this.profile = res.user ?? res),
      error: err => console.error('No se pudo cargar el perfil', err)
    });
  }
}