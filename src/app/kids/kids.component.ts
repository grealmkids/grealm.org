import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class KidsComponent implements OnInit {
  selectedImage: string | null = null;
  galleryImages: string[] = Array.from({ length: 12 }, (_, i) => `/assets/gallery/${i + 1}.jpg`);

  // Video Modal State
  showVideoModal: boolean = false;
  safeVideoUrl: SafeResourceUrl | null = null;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void { }

  openImageModal(imageSrc: string): void {
    this.selectedImage = imageSrc;
  }

  closeImageModal(): void {
    this.selectedImage = null;
  }

  showPreviousImage(): void {
    if (this.selectedImage) {
      const currentIndex = this.galleryImages.indexOf(this.selectedImage);
      const previousIndex = (currentIndex - 1 + this.galleryImages.length) % this.galleryImages.length;
      this.selectedImage = this.galleryImages[previousIndex];
    }
  }

  showNextImage(): void {
    if (this.selectedImage) {
      const currentIndex = this.galleryImages.indexOf(this.selectedImage);
      const nextIndex = (currentIndex + 1) % this.galleryImages.length;
      this.selectedImage = this.galleryImages[nextIndex];
    }
  }

  // Video Modal Methods
  openVideoModal(videoId: string): void {
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0`;
    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
    this.showVideoModal = true;
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  }

  closeVideoModal(): void {
    this.showVideoModal = false;
    this.safeVideoUrl = null;
    document.body.style.overflow = 'auto'; // Restore scrolling
  }
}
