import { Component } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-update-album',
  templateUrl: './update-album.component.html',
  styleUrls: ['./update-album.component.css'],
  
  imports: [FormsModule,CommonModule,HttpClientModule],
})
export class UpdateAlbumComponent {
  album: any = null;

  constructor(private albumService: AlbumService) {}

  updateAlbum(id: string, data: any) {
    this.albumService.updateAlbum(id, data).subscribe(response => {
      this.album = response;
    });
  }
}