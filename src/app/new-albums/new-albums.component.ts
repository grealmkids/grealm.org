import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AlbumService } from '../services/album.service';

@Component({
  standalone: true,  // <-- This was missing
  selector: 'app-new-albums',
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './new-albums.component.html',
  styleUrl: './new-albums.component.css'
})
export class NewAlbumsComponent {
  albums: any[] = [];

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService.getAllAlbums().subscribe(albums => {
      this.albums = albums;
      console.log('Fetched albums:', albums); // Log the fetched albums
    });
  }
}
