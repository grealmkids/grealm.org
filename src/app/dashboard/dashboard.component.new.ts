import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PurchasedAlbumsComponent } from '../client/purchased-albums/purchased-albums.component';
import { BillingAddressComponent } from './billing-address/billing-address.component';
import { CommonModule } from '@angular/common';

interface UserProfile {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  providerId: string;
  loginTime: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [PurchasedAlbumsComponent, BillingAddressComponent, CommonModule],
  standalone: true,
})
export class DashboardComponent implements OnInit {
  role: string | null = null;
  isSidebarCollapsed: boolean = false;
  userProfile: UserProfile | null = null;
  currentTime: string = '';
  activeView: string = 'home';
  isMobile: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkMobile();
  }

  ngOnInit(): void {
    this.checkMobile();
    this.loadUserProfile();
    this.updateCurrentTime();
    
    // Update time every minute
    setInterval(() => {
      this.updateCurrentTime();
    }, 60000);

    // Check if user is authenticated
    this.authService.currentUser$.subscribe(user => {
      if (!user && !this.userProfile) {
        console.log('No authenticated user. Redirecting to login.');
        this.router.navigate(['/login']);
      }
    });
  }

  private checkMobile(): void {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.isSidebarCollapsed = true;
    }
  }

  private loadUserProfile(): void {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      this.userProfile = JSON.parse(savedProfile);
      this.role = 'client'; // Set default role for Google users
    } else {
      // Try to get current user from auth service
      const currentUser = this.authService.getCurrentUser();
      if (currentUser) {
        this.userProfile = {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          email: currentUser.email,
          photoURL: currentUser.photoURL,
          providerId: currentUser.providerData[0]?.providerId || 'unknown',
          loginTime: new Date().toISOString()
        };
        this.saveUserProfile();
        this.role = 'client';
      }
    }
  }

  private saveUserProfile(): void {
    if (this.userProfile) {
      localStorage.setItem('userProfile', JSON.stringify(this.userProfile));
    }
  }

  private updateCurrentTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  }

  getLoginDuration(): string {
    if (!this.userProfile?.loginTime) return '';
    
    const loginTime = new Date(this.userProfile.loginTime);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - loginTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  closeSidebarOnMobile(): void {
    if (this.isMobile) {
      this.isSidebarCollapsed = true;
    }
  }

  setActiveView(view: string): void {
    this.activeView = view;
  }

  getPageTitle(): string {
    const titles: { [key: string]: string } = {
      'home': 'Dashboard',
      'albums': 'My Albums',
      'billing': 'Billing Address',
      'settings': 'Settings',
      'profile': 'Profile'
    };
    return titles[this.activeView] || 'Dashboard';
  }

  getPageSubtitle(): string {
    const subtitles: { [key: string]: string } = {
      'home': 'Overview of your account and quick actions',
      'albums': 'Manage your purchased albums and content',
      'billing': 'Update your billing information and address',
      'settings': 'Configure your account preferences',
      'profile': 'View and manage your profile information'
    };
    return subtitles[this.activeView] || 'Welcome to your dashboard';
  }

  async logout(): Promise<void> {
    try {
      console.log('Logging out...');
      
      // Sign out from Firebase
      await this.authService.signOut();
      
      // Clear local storage
      localStorage.removeItem('userProfile');
      localStorage.clear();
      sessionStorage.clear();
      
      // Reset component state
      this.userProfile = null;
      this.role = null;
      
      // Redirect to homepage
      this.router.navigate(['/']);
      
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
}
