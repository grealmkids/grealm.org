import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(): boolean {
    // Check for Google Sign-In user profile
    const userProfile = localStorage.getItem('userProfile');
    
    // Check for traditional clientId (for existing users)
    const clientId = localStorage.getItem('clientId');
    
    // Check if user is currently authenticated with Firebase
    const currentUser = this.authService.getCurrentUser();
    
    const isAuthenticated = !!(userProfile || clientId || currentUser);
    
    if (!isAuthenticated) {
      console.log('User not authenticated, redirecting to login');
      this.router.navigate(['/login']); // Redirect to login page
      return false;
    }
    
    console.log('User authenticated, allowing access to dashboard');
    return true;
  }
}
