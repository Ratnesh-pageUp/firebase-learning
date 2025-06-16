import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { authGuard, publicAuthGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    // Public routes (accessible to anyone, but redirect if logged in)
    { path: 'login', component: LoginComponent, canActivate: [publicAuthGuard] },
    { path: 'sign-up', component: SignupComponent, canActivate: [publicAuthGuard] },

    // Protected route (only accessible if logged in)
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },

    // Default redirect (redirects to home if logged in, or login if not)
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    // Wildcard route for any unmatched paths (redirects to login)
    { path: '**', redirectTo: '/login' }
];
