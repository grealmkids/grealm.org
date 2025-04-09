import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';

export const routes: Routes = [
    
        { path: '', component: HomeComponent,
           },
           {
                path: 'albums/:id',
  component: AlbumDetailComponent
           }
           
      
];
