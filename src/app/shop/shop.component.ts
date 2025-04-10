import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AlbumService } from '../services/album.service';

@Component({
  selector: 'app-shop',
  imports: [CommonModule,RouterLink,RouterOutlet],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class ShopComponent {

}
