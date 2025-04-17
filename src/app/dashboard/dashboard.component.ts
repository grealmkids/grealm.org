import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchasedAlbumsComponent } from '../client/purchased-albums/purchased-albums.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [PurchasedAlbumsComponent, CommonModule], // Add CommonModule to resolve *ngIf error
  standalone: true, // Mark this component as standalone
})
export class DashboardComponent implements OnInit {
  role: string | null = null;
  isSidenavVisible: boolean = false; // Hide sidenav by default

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    console.log('Navigation state:', navigation?.extras.state);
    this.role = navigation?.extras.state?.['role'] || null;
    console.log('Role in DashboardComponent:', this.role);
  }

  ngOnInit(): void {
    console.log('DashboardComponent initialized with role:', this.role);
    if (!this.role) {
      console.log('Role is not available. Redirecting to login.');
      this.router.navigate(['/login']);
    }
  }

  toggleSidenav(): void {
    this.isSidenavVisible = !this.isSidenavVisible;
  }

  logout(): void {
    console.log('Logging out...');
    localStorage.clear(); // Clear all local storage
    sessionStorage.clear(); // Clear all session storage
    this.router.navigate(['/']); // Redirect to the homepage
  }
}