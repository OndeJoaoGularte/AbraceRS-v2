import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth';

export const authGuard: CanActivateFn = (_route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.whenReady().then(() => {
    if (authService.isLoggedIn()) {
      return true;
    }

    return router.createUrlTree(['/login'], {
      queryParams: { returnUrl: state.url },
    });
  });
};
