import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AlbumService } from '../../../services/album.service';

@Component({
  selector: 'app-kindergarten',
  imports: [CommonModule,RouterLink],
  templateUrl: './kindergarten.component.html',
  styleUrl: './kindergarten.component.css'
})
export class KindergartenComponent {
  albums: any[] = [];

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albums = this.albumService.getAllAlbums();
  }
}
