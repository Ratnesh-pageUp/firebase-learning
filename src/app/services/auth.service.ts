import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, User, UserCredential, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Observable for real-time auth user
  user$: Observable<User | null>;

  constructor(private auth: Auth) {
    this.user$ = user(this.auth); // Real-time user updates
  }

  // --- Email/Password Authentication ---

  /**
   * Registers a new user using email and password.
   * @param email Email address
   * @param password Password
   * @returns Promise of UserCredential
   */
  async signUp(email: string, password: string): Promise<UserCredential> {
    try {
      return await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error('Sign-up error:', error);
      throw error;
    }
  }

  /**
   * Logs in user with email and password.
   * @param email Email address
   * @param password Password
   * @returns Promise of UserCredential
   */
  async signIn(email: string, password: string): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      console.error('Sign-in error:', error);
      throw error;
    }
  }

  // --- Google Authentication ---

  /**
   * Signs in using Google popup.
   * @returns Promise of UserCredential
   */
  async googleSignIn(): Promise<UserCredential> {
    try {
      const provider = new GoogleAuthProvider();
      return await signInWithPopup(this.auth, provider);
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  }

  // --- Logout ---

  /**
   * Signs out the current user.
   */
  async signOut(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Sign-out error:', error);
      throw error;
    }
  }

  // --- User State ---

  /**
   * Observable of the currently signed-in user.
   * @returns Observable<User | null>
   */
  getCurrentUser(): Observable<User | null> {
    return this.user$;
  }

  /**
   * Synchronously returns the current user (may be null).
   * Useful for quick checks (e.g., in guards).
   * @returns User or null
   */
  getCurrentUserSync(): User | null {
    return this.auth.currentUser;
  }

   /**
   * Checks if a user is currently logged in.
   * @returns A Promise resolving to true if logged in, false otherwise.
   */
   async isLoggedIn(): Promise<boolean> {
    return new Promise((resolve) => {
      // onAuthStateChanged is reliable for getting the current auth state.
      // It also handles the initial state check.
      this.auth.onAuthStateChanged(user => {
        resolve(!!user); // Resolve with true if user exists, false otherwise
      });
    });
  }
}
