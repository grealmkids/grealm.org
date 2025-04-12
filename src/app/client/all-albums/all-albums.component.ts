import { Component } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-all-albums',
  templateUrl: './all-albums.component.html',
  styleUrls: ['./all-albums.component.css'],
  imports: [HttpClientModule],
})
export class AllAlbumsComponent {
  albums: any[] = [];

  constructor(private albumService: AlbumService) {
    this.getAllAlbums();
  }

  getAllAlbums() {
    this.albumService.getAllAlbums().subscribe(response => {
      this.albums = response;
      console.log('Fetched all albums:', response); // Log the fetched albums
    });
  }
}