import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent extends BaseComponent {

  async onLogout(): Promise<void> {
    try {
      await this.authService.signOut();
      this.router.navigate(['/login']); // Redirect to login page after successful logout
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally show a user-friendly error message
    }
  }

}
