import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface BillingAddress {
  email: string;
  branch: string;
  email_address: string;
  phone_number: string;
  country_code: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  line_1: string;
  line_2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  zip_code?: string;
}

export interface BillingAddressResponse {
  id?: number;
  userId?: number;
  branch: string;
  email_address: string;
  phone_number: string;
  country_code: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  line_1: string;
  line_2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  zip_code?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SaveBillingResponse {
  message: string;
  billingAddress: BillingAddressResponse;
}

@Injectable({
  providedIn: 'root'
})
export class BillingService {
  private apiUrl = environment.production ? 'https://your-api-domain.com' : 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  saveBillingAddress(billingData: BillingAddress): Observable<SaveBillingResponse> {
    return this.http.post<SaveBillingResponse>(`${this.apiUrl}/api/client/billing-address`, billingData);
  }

  getBillingAddress(email: string): Observable<BillingAddressResponse> {
    const params = new HttpParams().set('email', email);
    return this.http.get<BillingAddressResponse>(`${this.apiUrl}/api/client/billing-address`, { params });
  }
}
