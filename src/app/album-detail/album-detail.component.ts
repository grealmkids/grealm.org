import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AlbumService } from '../services/album.service';
import { HttpClientModule } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-album-detail',
  imports: [CommonModule, RouterLink, HttpClientModule],
  templateUrl: './album-detail.component.html',
  styleUrl: './album-detail.component.css'
})
export class AlbumDetailComponent implements OnInit {
  album: any;
  albumNotFound: boolean = false;
  showVideoModal: boolean = false;
  safeVideoUrl: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute, 
    private albumService: AlbumService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('Album ID from route:', id);
    if (id) {
      console.log('Making API call to:', `${this.albumService['baseUrl']}/api/client/albums/${id}`);
      this.albumService.getAlbumById(id).subscribe(
        album => {
          if (album) {
            this.album = album;
            this.albumNotFound = false;
            console.log('Fetched album details:', album);
          } else {
            this.albumNotFound = true;
          }
        },
        error => {
          console.error('Error fetching album details:', error);
          console.error('Error status:', error.status);
          console.error('Error message:', error.message);
          console.error('Error url:', error.url);
          console.error('Full error object:', JSON.stringify(error, null, 2));
          this.albumNotFound = true;
        }
      );
    } else {
      this.albumNotFound = true;
    }
  }

  playPreview(): void {
    if (this.album && this.album.previewvideo) {
      // Extract YouTube video ID and create embed URL
      const videoId = this.extractYouTubeVideoId(this.album.previewvideo);
      if (videoId) {
        const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&controls=0&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&cc_load_policy=0&start=0&end=0&loop=0&disablekb=1`;
        this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
        this.showVideoModal = true;
        // Prevent body scrolling
        document.body.classList.add('modal-open');
      } else {
        console.error('Invalid YouTube URL:', this.album.previewvideo);
        alert('Sorry, the preview video is not available.');
      }
    } else {
      // Fallback for albums without preview video - using a sample video
      console.warn('No preview video URL found for album:', this.album?.title);
      const sampleVideoId = 'yU-jk2j9dJ0'; // Sample video from kids component
      const embedUrl = `https://www.youtube-nocookie.com/embed/${sampleVideoId}?autoplay=1&controls=0&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&cc_load_policy=0&start=0&end=0&loop=0&disablekb=1`;
      this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
      this.showVideoModal = true;
      // Prevent body scrolling
      document.body.classList.add('modal-open');
    }
  }

  closeVideoModal(): void {
    this.showVideoModal = false;
    this.safeVideoUrl = null;
    // Restore body scrolling
    document.body.classList.remove('modal-open');
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(event: KeyboardEvent): void {
    if (this.showVideoModal) {
      this.closeVideoModal();
    }
  }

  private extractYouTubeVideoId(url: string): string | null {
    if (!url) return null;
    
    // Handle various YouTube URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  }

  // Optional: Method to open video in a modal
  private openVideoModal(videoUrl: string): void {
    // This method is now replaced by the playPreview implementation above
  }
}
