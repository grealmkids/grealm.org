import { Component } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css'],
  
  imports: [FormsModule,CommonModule,HttpClientModule],
})
export class VerifyOtpComponent {
  message: string = '';

  constructor(private albumService: AlbumService, private router: Router) {}

  verifyOtp(data: any) {
    console.log('Verifying OTP with data:', data);
    this.albumService.verifyOtp(data).subscribe(
      response => {
        console.log('API response:', response);
        this.message = response.message;
        if (response.message === 'OTP verified successfully.') {
          const role = response.user?.role;
          const clientId = response.user?.id; // Extract clientId from the response
          if (clientId) {
            localStorage.setItem('clientId', clientId); // Store clientId in local storage
          }
          console.log('User role:', role);
          if (role === 'client') {
            console.log('Redirecting to dashboard...');
            this.router.navigate(['/dashboard'], { state: { role: 'client' } });
          } else {
            console.log('Unhandled role:', role);
            alert(`Unhandled role. Please contact support. Role: ${role}`);
          }
        } else {
          console.log('OTP verification failed:', response.message);
        }
      },
      error => {
        console.error('Error during OTP verification:', error);
      }
    );
  }
}