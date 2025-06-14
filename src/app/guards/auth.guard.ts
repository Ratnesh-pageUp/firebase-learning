// This guard protects routes that should only be accessible to logged-in users.
// It also redirects logged-in users away from login/sign up pages.

import { CanActivateFn, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

/**
 * Auth Guard:
 * 1. Protects routes: Allows access only if the user is logged in. If not, redirects to /login.
 * 2. Redirects logged-in users: If a logged-in user tries to access /login or /sign-up,
 * they are redirected to /home.
 */

// A helper function to check if the user is authenticated
const checkAuthStatus = (authService: AuthService, router: Router): Observable<boolean | UrlTree> => {
  return authService.user$.pipe(
    take(1), // Take only the first emission to prevent continuous re-evaluation
    map(user => {
      if (user) {
        // User is logged in
        return true; // Allow access
      } else {
        // User is not logged in, redirect to login
        return router.createUrlTree(['/login']);
      }
    })
  );
};

// A helper function to check if the user is NOT authenticated
const checkNotAuthStatus = (authService: AuthService, router: Router): Observable<boolean | UrlTree> => {
  return authService.user$.pipe(
    take(1),
    map(user => {
      if (user) {
        // User is logged in, redirect to home (home)
        return router.createUrlTree(['/home']);
      } else {
        // User is not logged in, allow access to login/sign-up
        return true;
      }
    })
  );
};


// CanActivate guard for protected routes (e.g., home)
export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return checkAuthStatus(authService, router);
};

// CanActivate guard for login/sign-up pages, to redirect if already logged in
export const publicAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  return checkNotAuthStatus(authService, router);
};
