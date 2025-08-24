import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private httpClient: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${environment.apiURL}/categories`);
  }

  getCategory(id: string): Observable<Category> {
    return this.httpClient.get<Category>(
      `${environment.apiURL}/categories/${id}`
    );
  }

  addCategory(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(
      `${environment.apiURL}/categories/`,
      category
    );
  }

  updateCategory(id: string, category: Category): Observable<Category> {
    return this.httpClient.put<Category>(
      `${environment.apiURL}/categories/${id}`,
      category
    );
  }

  deleteCategory(id: string): Observable<unknown> {
    return this.httpClient.delete<unknown>(
      `${environment.apiURL}/categories/${id}`
    );
  }
}
