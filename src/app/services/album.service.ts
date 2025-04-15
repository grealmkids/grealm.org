import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  adminLogin(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/admin/login`, data);
  }

  clientLogin(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/client/login`, data);
  }

  sendOtp(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/auth/send-otp`, data);
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

  getPurchasedAlbums(clientId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/client/purchased-albums?clientId=${clientId}`);
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