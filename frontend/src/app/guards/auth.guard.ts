import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import type { CanActivateFn, UrlTree } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  if (!isPlatformBrowser(platformId)) {
    return router.parseUrl('/login');
  }

  return localStorage.getItem('token')
    ? true
    : router.parseUrl('/login');
};