import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-new-albums',
  imports: [CommonModule,RouterLink],
  templateUrl: './new-albums.component.html',
  styleUrl: './new-albums.component.css'
})
export class NewAlbumsComponent {
  albums: any[] = [];

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albums = this.albumService.getAllAlbums();
  }
}

