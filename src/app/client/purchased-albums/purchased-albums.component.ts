import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-purchased-albums',
  templateUrl: './purchased-albums.component.html',
  styleUrls: ['./purchased-albums.component.css'],
  imports: [HttpClientModule, CommonModule], // Add CommonModule to resolve *ngFor error
})
export class PurchasedAlbumsComponent implements OnInit {
  purchasedAlbums: any[] = [];
  message: string = '';
  clientDetails: { name: string; email: string } | null = null; // Add a property for client details

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.fetchClientDetails(); // Fetch client details
    this.fetchPurchasedAlbums();
  }

  fetchClientDetails(): void {
    const clientName = localStorage.getItem('clientName'); // Retrieve client name from local storage
    const clientEmail = localStorage.getItem('clientEmail'); // Retrieve client email from local storage

    if (clientName && clientEmail) {
      this.clientDetails = { name: clientName, email: clientEmail };
    } else {
      this.message = 'Client details not found. Please log in again.';
    }
  }

  fetchPurchasedAlbums(): void {
    const clientId = localStorage.getItem('clientId'); // Retrieve clientId from local storage
    if (!clientId) {
      this.message = 'Client ID not found. Please log in again.';
      return;
    }
    this.albumService.getPurchasedAlbums(clientId).subscribe(
      (albums) => {
        this.purchasedAlbums = albums.map(album => ({
          id: album.id,
          title: album.Album.title,
          downloadLink: album.Album.downloadLink // Add downloadLink to the album object
        }));
        console.log('Fetched purchased albums:', albums);
      },
      (error) => {
        this.message = 'Failed to load purchased albums. Please try again later.';
      }
    );
  }

  downloadAlbum(albumId: string): void {
    const album = this.purchasedAlbums.find(a => a.id === albumId);
    if (album && album.downloadLink) {
      const link = document.createElement('a');
      link.href = album.downloadLink;
      link.download = album.title;
      link.click();
      console.log(`Downloading album: ${album.title}`);
    } else {
      console.error('Download link not found for album ID:', albumId);
    }
  }
}