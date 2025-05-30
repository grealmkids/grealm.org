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
  isLoading: boolean = false; // Added isLoading property

  constructor(private albumService: AlbumService, private router: Router) {}

  verifyOtp(data: any) {
    console.log('Verifying OTP with data:', data);
    this.isLoading = true; // Set isLoading to true when the process starts
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
          const firstname = response.user?.firstname;
          const lastname = response.user?.lastname;
          const email = response.user?.email;
          if (firstname && lastname && email) {
            localStorage.setItem('clientName', `${firstname} ${lastname}`); // Store full name in local storage
            localStorage.setItem('clientEmail', email); // Store email in local storage
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
        this.isLoading = false; // Set isLoading to false when the process ends
      },
      error => {
        console.error('Error during OTP verification:', error);
        this.isLoading = false; // Set isLoading to false in case of error
      }
    );
  }
}