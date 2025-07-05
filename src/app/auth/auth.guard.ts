import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  canActivate(): boolean {
    // Allow access during SSR (server-side rendering)
    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }
    
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
