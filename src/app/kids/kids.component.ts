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
}
