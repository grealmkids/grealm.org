import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-shop',
  imports: [CommonModule,RouterLink],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {
  albums: any[] = [];

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albums = this.albumService.getAllAlbums();
  }
}
