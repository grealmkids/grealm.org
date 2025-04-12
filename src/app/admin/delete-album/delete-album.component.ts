import { Component } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-delete-album',
  templateUrl: './delete-album.component.html',
  styleUrls: ['./delete-album.component.css'],
  
  imports: [FormsModule,CommonModule,HttpClientModule],
})
export class DeleteAlbumComponent {
  message: string = '';

  constructor(private albumService: AlbumService) {}

  deleteAlbum(id: string) {
    this.albumService.deleteAlbum(id).subscribe(response => {
      this.message = response.message;
    });
  }
}