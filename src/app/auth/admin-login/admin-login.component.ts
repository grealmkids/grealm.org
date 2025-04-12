import { Component } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  
  imports: [FormsModule,CommonModule,HttpClientModule],
})
export class AdminLoginComponent {
  message: string = '';

  constructor(private albumService: AlbumService) {}

  login(data: any) {
    this.albumService.adminLogin(data).subscribe(response => {
      this.message = response.message;
    });
  }
}