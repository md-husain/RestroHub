import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { DashBoardOverview } from '../models/dashboard.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardsService {
  constructor(private httpClient: HttpClient) {}
  
  getDashBoardOverview(): Observable<DashBoardOverview> {
    return this.httpClient.get<DashBoardOverview>(
      `${environment.apiURL}/dashboards/get/overview`
    );
  }
}
