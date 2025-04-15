import { Component } from '@angular/core';
import { AlbumService } from '../../services/album.service';
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

  constructor(private albumService: AlbumService, private router: Router) {}

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
        this.message = 'Failed to send OTP. Please try again.';
      }
    );
  }
}