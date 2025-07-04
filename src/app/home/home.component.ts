import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
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
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('backgroundVideo', { static: false }) backgroundVideo!: ElementRef<HTMLVideoElement>;

  constructor(private albumService: AlbumService) {}

  ngOnInit(): void {
    this.albumService.getAllAlbums().subscribe((albums: any[]) => {
      console.log('Fetched albums in HomeComponent:', albums);
    });
  }

  ngAfterViewInit(): void {
    // Handle video autoplay
    this.handleVideoAutoplay();
  }

  private handleVideoAutoplay(): void {
    const video = this.backgroundVideo?.nativeElement;
    if (video) {
      video.addEventListener('loadeddata', () => {
        console.log('Video loaded, attempting to play...');
        this.playVideo(video);
      });

      // If video is already loaded
      if (video.readyState >= 3) {
        console.log('Video already loaded, attempting to play...');
        this.playVideo(video);
      }
    }
  }

  private playVideo(video: HTMLVideoElement): void {
    video.play().then(() => {
      console.log('Video autoplay successful');
    }).catch((error) => {
      console.error('Video autoplay failed:', error);
      // Fallback: Try to play on user interaction
      document.addEventListener('click', () => {
        video.play().then(() => {
          console.log('Video play on user interaction successful');
        }).catch((err) => {
          console.error('Video play on user interaction failed:', err);
        });
      }, { once: true });
    });
  }
}
