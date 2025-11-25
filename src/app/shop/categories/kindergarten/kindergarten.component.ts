import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlbumService } from '../../../services/album.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-kindergarten',
  imports: [CommonModule, RouterLink],
  templateUrl: './kindergarten.component.html',
  styleUrl: './kindergarten.component.css'
})
export class KindergartenComponent {
  albums: any[] = [];

  constructor(private albumService: AlbumService) { }

  ngOnInit(): void {
    console.log('KindergartenComponent initialized');
    this.albumService.getAllAlbums().subscribe(
      (response: any) => {
        console.log('Kindergarten raw response:', response);

        if (Array.isArray(response)) {
          this.albums = response;
        } else if (response && Array.isArray(response.data)) {
          this.albums = response.data;
        } else if (response && Array.isArray(response.albums)) {
          this.albums = response.albums;
        } else {
          console.error('Kindergarten: Unexpected response format', response);
          this.albums = [];
        }

        console.log('Kindergarten processed albums:', this.albums);
      },
      error => {
        console.error('Kindergarten error:', error);
      }
    );
  }
}
