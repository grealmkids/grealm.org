import { Component } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-purchased-albums',
  templateUrl: './purchased-albums.component.html',
  styleUrls: ['./purchased-albums.component.css'],
  imports: [HttpClientModule],
})
export class PurchasedAlbumsComponent {
  albums: any[] = [];

  constructor(private albumService: AlbumService) {
    this.getPurchasedAlbums();
  }

  getPurchasedAlbums() {
    this.albumService.getPurchasedAlbums().subscribe(response => {
      this.albums = response;
      console.log('Fetched purchased albums:', response); // Log the fetched purchased albums
    });
  }
}