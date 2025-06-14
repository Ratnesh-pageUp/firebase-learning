import { Directive, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Directive()
export class BaseComponent {
    protected readonly authService: AuthService = inject(AuthService);
    protected readonly router: Router = inject(Router);
    protected readonly user$ = this.authService.user$;
}
