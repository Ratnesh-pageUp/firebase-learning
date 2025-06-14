import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for *ngIf
import { FormsModule } from '@angular/forms';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent {
  email!: string;
  password!: string;
  errorMessage: string | null = null;

  async onLogin() {
    this.errorMessage = null; // Clear previous errors
    try {
      await this.authService.signIn(this.email, this.password);
      // Upon successful login, the publicAuthGuard should technically redirect
      // but explicitly navigate to home as a fallback/confirmation.
      this.router.navigate(['/home']);
    } catch (error: any) {
      // Firebase errors have a 'code' and 'message' property
      this.errorMessage = error.message || 'Login failed. Please check your credentials.';
      console.error('Login error:', error);
    }
  }

  async onGoogleLogin() {
    this.errorMessage = null; // Clear previous errors
    try {
      await this.authService.googleSignIn();
      this.router.navigate(['/home']);
    } catch (error: any) {
      this.errorMessage = error.message || 'Google login failed.';
      console.error('Google login error:', error);
    }
  }
}
