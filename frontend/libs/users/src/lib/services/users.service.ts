import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { SuccessMsg } from '@frontend/utilities';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  signUp(user: User): Observable<User> {
    return this.httpClient.post<User>(
      `${environment.apiURL}/users/signup`,
      user
    );
  }

  login(user: User): Observable<User> {
    return this.httpClient.post<User>(
      `${environment.apiURL}/users/login`,
      user
    );
  }

  changePassword(id: string, password: string): Observable<SuccessMsg> {
    return this.httpClient.put<SuccessMsg>(
      `${environment.apiURL}/users/changePassword/${id}`,
      { password: password }
    );
  }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${environment.apiURL}/users`);
  }

  getUser(id: string): Observable<User> {
    return this.httpClient.get<User>(`${environment.apiURL}/users/${id}`);
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.httpClient.put<User>(`${environment.apiURL}/users/${id}`, user);
  }

  deleteUser(id: string): Observable<SuccessMsg> {
    return this.httpClient.delete<SuccessMsg>(
      `${environment.apiURL}/users/${id}`
    );
  }
}
