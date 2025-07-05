import { Component } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  emailOrPhone: string = '';
  message: string = '';
  loading: boolean = false;
  googleLoading: boolean = false;

  constructor(
    private albumService: AlbumService, 
    private authService: AuthService,
    private router: Router
  ) {}

  sendOtp() {
    this.loading = true;
    const data = { phoneOrEmail: this.emailOrPhone }; // Updated key to match back-end expectation
    this.albumService.sendOtp(data).subscribe(
      (response) => {
        this.loading = false;
        this.message = 'OTP sent successfully!';
        this.router.navigate(['/verify']);
      },
      (error) => {
        this.loading = false;
        this.message = 'Error sending OTP. Please try again.';
        console.error('OTP Error:', error);
      }
    );
  }

  async signInWithGoogle() {
    this.googleLoading = true;
    try {
      const result = await this.authService.signInWithGoogle();
      console.log('Google Sign-In Successful:', result.user);
      
      // Create user profile object
      const userProfile = {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
        providerId: result.user.providerData[0]?.providerId || 'google.com',
        loginTime: new Date().toISOString()
      };
      
      // Save to localStorage
      localStorage.setItem('userProfile', JSON.stringify(userProfile));
      
      this.message = 'Google Sign-In successful! Redirecting...';
      
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 1000);
      
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      this.message = 'Google Sign-In failed. Please try again.';
    } finally {
      this.googleLoading = false;
    }
  }
}