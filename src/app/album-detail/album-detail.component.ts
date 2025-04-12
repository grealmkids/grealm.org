import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-album-detail',
  imports: [CommonModule,RouterLink,HttpClientModule],
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.css'
})
export class AlbumDetailComponent {
  album: any;

  constructor(private route: ActivatedRoute, private albumService: AlbumService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.albumService.getAlbumById(id).subscribe(album => {
        this.album = album;
        console.log('Fetched album details:', album); // Log the fetched album details
      });
    }
  }
}
