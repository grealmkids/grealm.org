import { Component } from '@angular/core';
import { NewAlbumsComponent } from "../new-albums/new-albums.component";
import { HttpClientModule } from '@angular/common/http';
import { AlbumService } from '../services/album.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [HttpClientModule, NewAlbumsComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService.getAllAlbums().subscribe((albums: any[]) => {
      console.log('Fetched albums in HomeComponent:', albums);
    });
  }
}
