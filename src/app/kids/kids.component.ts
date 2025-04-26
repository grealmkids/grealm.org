import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit(): void {}

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
}
