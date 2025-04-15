import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddAlbumComponent } from './admin/add-album/add-album.component';
import { CreateAlbumComponent } from './admin/create-album/create-album.component';
import { DeleteAlbumComponent } from './admin/delete-album/delete-album.component';
import { UpdateAlbumComponent } from './admin/update-album/update-album.component';
import { AdminLoginComponent } from './auth/admin-login/admin-login.component';
import { ClientLoginComponent } from './auth/client-login/client-login.component';
import { SendOtpComponent } from './auth/send-otp/send-otp.component';
import { VerifyOtpComponent } from './auth/verify-otp/verify-otp.component';
import { AllAlbumsComponent } from './client/all-albums/all-albums.component';
import { PurchasedAlbumsComponent } from './client/purchased-albums/purchased-albums.component';



@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AdminLoginComponent,
    ClientLoginComponent,
    SendOtpComponent,
    VerifyOtpComponent,
    AddAlbumComponent,
    CreateAlbumComponent,
    UpdateAlbumComponent,
    DeleteAlbumComponent,
    PurchasedAlbumsComponent,
    AllAlbumsComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }