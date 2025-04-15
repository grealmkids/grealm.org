import { Component } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-send-otp',
  templateUrl: './send-otp.component.html',
  styleUrls: ['./send-otp.component.css'],
  
  imports: [FormsModule,CommonModule,HttpClientModule],
})
export class SendOtpComponent {
  message: string = '';
  loading: boolean = false;

  constructor(private albumService: AlbumService) {}

  sendOtp(data: any) {
    this.loading = true;
    this.albumService.sendOtp(data).subscribe(
      response => {
        this.loading = false;
        this.message = response.message;
      },
      error => {
        this.loading = false;
        this.message = 'Failed to send OTP. Please try again later.';
      }
    );
  }
}