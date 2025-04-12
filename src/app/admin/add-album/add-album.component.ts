import { Component } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css'],
  
  imports: [FormsModule,CommonModule],
})
export class AddAlbumComponent {
  message: string = '';

  constructor(private albumService: AlbumService) {}

  addAlbum(data: any) {
    this.albumService.addAlbum(data).subscribe(response => {
      this.message = response.message;
    });
  }
}