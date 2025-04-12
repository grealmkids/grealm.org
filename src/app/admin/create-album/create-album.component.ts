import { Component } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css'],
  
  imports: [FormsModule,CommonModule,HttpClientModule],
})
export class CreateAlbumComponent {
  album: any = null;

  constructor(private albumService: AlbumService) {}

  createAlbum(data: any) {
    this.albumService.createAlbum(data).subscribe(response => {
      this.album = response;
    });
  }
}