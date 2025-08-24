import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopupsService {
  apiUrl = environment.apiURL;

  constructor(private http: HttpClient) {}

  getPendingRequests() {
    return this.http.get(`${this.apiUrl}/topups/pending`);
  }

  approveRequest(id: string) {
    return this.http.patch(`${this.apiUrl}/topups/approve/${id}`, {});
  }
}