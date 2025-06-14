import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent extends BaseComponent {

  email!: string;
  password!: string;
  errorMessage: string | null = null;

  async onRegister() {
    this.errorMessage = null; // Clear previous errors
    try {
      await this.authService.signUp(this.email, this.password);
      this.router.navigate(['/home']); // Navigate to home after successful registration
    } catch (error: any) {
      this.errorMessage = error.message || 'Registration failed. Please try again.';
      console.error('Registration error:', error);
    }
  }

}
