import { Component } from '@angular/core';
import { AlbumService } from '../../services/album.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css'],
  imports: [FormsModule,CommonModule,HttpClientModule],
  
})
export class AddClientComponent {
  message: string = '';

  constructor(private albumService: AlbumService) {}

  addClient(data: any) {
    this.albumService.addClient(data).subscribe(response => {
      this.message = response.message;
    });
  }
}