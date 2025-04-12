import { Component } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css'],
  
  imports: [FormsModule,CommonModule,HttpClientModule],
})
export class VerifyOtpComponent {
  message: string = '';

  constructor(private albumService: AlbumService) {}

  verifyOtp(data: any) {
    this.albumService.verifyOtp(data).subscribe(response => {
      this.message = response.message;
    });
  }
}