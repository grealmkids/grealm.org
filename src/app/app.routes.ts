import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AlbumDetailComponent } from './album-detail/album-detail.component';
import { AboutComponent } from './about/about.component';
import { ShopComponent } from './shop/shop.component';
import { BiblesComponent } from './shop/categories/bibles/bibles.component';
import { KindergartenComponent } from './shop/categories/kindergarten/kindergarten.component';
import { StoryBooksComponent } from './shop/categories/story-books/story-books.component';

export const routes: Routes = [
    
     {
          path: '',
          component: HomeComponent
        },
      
        {
          path: 'about',
          component: AboutComponent
        },
    // app-routing.module.ts or shop-routing.module.ts

  {
    path: 'shop',
    component: ShopComponent, // this is the layout
    children: [
      { path: '', redirectTo: 'kindergarten', pathMatch: 'full' },
      { path: 'kindergarten', component: KindergartenComponent },
      { path: 'bibles', component: BiblesComponent },
      {
        path: 'albums/:id',
        component: AlbumDetailComponent
      },
      { path: 'story-books', component: StoryBooksComponent }
    ]
  },
  { path: '', redirectTo: 'shop', pathMatch: 'full' }


];
