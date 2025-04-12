import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  adminLogin(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/admin/login`, data);
  }

  clientLogin(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/client/login`, data);
  }

  sendOtp(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/client/send-otp`, data);
  }

  verifyOtp(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/verify-otp`, data);
  }

  addClient(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/admin/add-client`, data);
  }

  addAlbum(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/admin/add-album`, data);
  }

  getPurchasedAlbums(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/client/purchased-albums`);
  }

  getAllAlbums(): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/client/albums`);
  }

  getAlbumById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/api/client/albums/${id}`);
  }

  createAlbum(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/admin/album`, data);
  }

  updateAlbum(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/api/admin/album/${id}`, data);
  }

  deleteAlbum(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/admin/album/${id}`);
  }
}