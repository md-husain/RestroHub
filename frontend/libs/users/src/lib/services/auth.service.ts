import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from '@frontend/utilities';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { User } from '../models/user.model';
import { AuthInfo } from '../models/auth-info.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}
  logIn(user: User): Observable<User> {
    return this.httpClient.post<User>(
      `${environment.apiURL}/users/login`,
      user
    );
  }
  logOut(): void {
    this.localStorageService.removeToken();
    this.router.navigateByUrl('/');
  }
  getId(): string {
    const token = this.localStorageService.getToken();
    if (token !== '') {
      const decoded: AuthInfo = JSON.parse(atob(token.split('.')[1]));
      console.log(decoded)
      return decoded.id;
    }
    return '';
  }
}
