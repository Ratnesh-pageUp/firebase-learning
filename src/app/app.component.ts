import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './core/base/base.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent extends BaseComponent {
  title = 'firebase-learning';
  
  async onLogout(): Promise<void> {
    try {
      await this.authService.signOut();
      this.router.navigate(['/login']); // Redirect to login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

}
