import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private albums = [
    {
      id: 'domestic-animals',
      title: 'Domestic Animals',
      image: '/assets/domesticanimals.jpg',
      songs: 4,
      video: 4,
      audio: 4,
      coloringPics: 15,
      coloredPics: 15,
      ugx: '10,000',
      usd: 4,
      contents: [
        'Domestic Animal Names',
        'Domestic Animal Sounds',
        'Domestic Animal Homes',
        'Domestic Animal Young Ones',
        '11 Domestic Animals'
      ]
    },
    {
      id: 'wild-animals',
      title: 'Wild Animals',
      image: '/assets/wildanimals.jpg',
      songs: 4,
      video: 4,
      audio: 4,
      coloringPics: 10,
      coloredPics: 10,
      ugx: '10,000',
      usd: 4,
      contents: [
        'Wild Animal Names',
        'Wild Animal Sounds',
        'Wild Animal Homes',
        'Wild vs Domestic',
        '11 Wild Animals'
      ]
    },
    {
      id: 'my-body',
      title: 'My Body',
      image: '/assets/body.jpg',
      songs: 8,
      video: 8,
      audio: 8,
      coloringPics: 20,
      coloredPics: 20,
      ugx: '15,000',
      usd: 5,
      contents: [
        'My Body Parts',
        'Head to Toe Song',
        'Body Functions',
        'Taking Care of My Body',
        'Growing Up'
      ]
    }
  ];

  getAllAlbums() {
    return this.albums;
  }

  getAlbumById(id: string) {
    return this.albums.find(album => album.id === id);
  }
}
