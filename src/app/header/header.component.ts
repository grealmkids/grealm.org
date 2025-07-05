import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { AuthService } from '../services/auth.service';

interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  providerId: string;
  loginTime: string;
}

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;
  userProfile: UserProfile | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.checkAuthenticationState();
    
    // Listen for auth state changes
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user || !!this.getUserProfileFromStorage();
      if (this.isAuthenticated) {
        this.userProfile = this.getUserProfileFromStorage();
      }
    });
  }

  private checkAuthenticationState(): void {
    this.userProfile = this.getUserProfileFromStorage();
    this.isAuthenticated = !!this.userProfile;
  }

  private getUserProfileFromStorage(): UserProfile | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null; // Skip localStorage operations during SSR
    }
    const savedProfile = localStorage.getItem('userProfile');
    return savedProfile ? JSON.parse(savedProfile) : null;
  }

  async logout(): Promise<void> {
    try {
      // Sign out from Firebase
      await this.authService.signOut();
      
      // Clear local storage (only in browser)
      if (isPlatformBrowser(this.platformId)) {
        localStorage.removeItem('userProfile');
        localStorage.clear();
        sessionStorage.clear();
      }
      
      // Reset component state
      this.userProfile = null;
      this.isAuthenticated = false;
      
      // Redirect to homepage
      this.router.navigate(['/']);
      
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
}
