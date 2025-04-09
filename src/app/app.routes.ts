import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    
        { path: '', component: HomeComponent,
           },
           {
                path: 'albums/:id',
  component: AlbumDetailComponent
           },{
                path:'about',component:AboutComponent
           }
           
      
];
