import { Component, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterModule , Router} from '@angular/router';
import { signal } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  
  private readonly storageKey = 'theme';
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);

  constructor() {
    if (!isPlatformBrowser(this.platformId)) return;
    const saved = localStorage.getItem(this.storageKey);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved ?? (prefersDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', theme === 'dark');

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.getItem(this.storageKey)) {
        document.documentElement.classList.toggle('dark', e.matches);
      }
    });
  }

  

  menuOpen = signal(false);
  mobileOpen = signal(false);

  toggleMenu(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    setTimeout(() => this.menuOpen.set(false));
  }

   logout(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  toggleMobile(): void {
    this.mobileOpen.update(v => !v);
  }
}
