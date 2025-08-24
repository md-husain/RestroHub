import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuccessMsg } from '@frontend/utilities';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';

@Injectable({
  providedIn: 'root',
})
export class BillsService {
  constructor(private httpClient: HttpClient) {}

  getBills(): Observable<Bill[]> {
    return this.httpClient.get<Bill[]>(`${environment.apiURL}/bills`);
  }

  deleteBill(id: string): Observable<unknown> {
    return this.httpClient.delete<unknown>(`${environment.apiURL}/bills/${id}`);
  }

  generateReport(bill: Bill): Observable<SuccessMsg> {
    return this.httpClient.post<SuccessMsg>(
      `${environment.apiURL}/bills/generateReport`,
      bill
    );
  }

  getPDF(id: string) {
    return this.httpClient.post(
      `${environment.apiURL}/bills/getPdf/${id}`,
      {},
      { responseType: 'blob' }
    );
  }
}
