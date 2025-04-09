import { Component } from '@angular/core';
import { NewAlbumsComponent } from "../new-albums/new-albums.component";

@Component({
  selector: 'app-home',
  imports: [NewAlbumsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
