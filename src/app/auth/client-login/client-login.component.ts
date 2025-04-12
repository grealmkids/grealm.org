import { Component } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css'],
  
  imports: [FormsModule,CommonModule,HttpClientModule],
})
export class ClientLoginComponent {
  message: string = '';

  constructor(private albumService: AlbumService) {}

  login(data: any) {
    this.albumService.clientLogin(data).subscribe(response => {
      this.message = response.message;
    });
  }
}