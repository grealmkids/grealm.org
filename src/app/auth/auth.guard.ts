import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = !!localStorage.getItem('clientId'); // Check if clientId exists in localStorage
    if (!isAuthenticated) {
      this.router.navigate(['/']); // Redirect to homepage if not authenticated
    }
    return isAuthenticated;
  }
}
