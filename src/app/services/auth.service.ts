import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from '../model/user';

export interface AuthResponseData {
  id: string,
  admin: boolean,
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);

  private loginUrl = "http://localhost:8080/sign-in";
  private signUpUrl = "http://localhost:8080/sign-up"

  constructor(private http: HttpClient) { }

  logout() {
    this.user.next(null);
    localStorage.setItem('user', '');
  }

  autoLogin() {
    const userData: {
      id: string,
      username: string;
      _token: string;
      _isAdmin: boolean;
    } = JSON.parse(localStorage.getItem('user'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.id, userData.username, userData._token, userData._isAdmin);
    this.user.next(loadedUser);
  }

  login(username: string, password: string) {
    return this.http.post<AuthResponseData>(this.loginUrl, {
      username: username,
      password: password
    }).pipe(catchError(this.handleError), tap(authResponse => {
      const user = new User(authResponse.id, username, authResponse.token, authResponse.admin);
      localStorage.setItem('user', JSON.stringify(user));
      this.user.next(user);
    }));
  }

  signUp(username: string, password: string){
    return this.http.post<AuthResponseData>(this.signUpUrl, {
      username: username,
      password: password
    }).pipe(catchError(this.handleError), tap(authResponse => {
      const user = new User(authResponse.id, username, authResponse.token, authResponse.admin);
      localStorage.setItem('user', JSON.stringify(user));
      this.user.next(user);
    }));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMes = 'Something went wrong';
    if (errorRes.status == 403) {
      errorMes = 'Forbidden';
    }
    if (errorRes.status == 409){
      errorMes = 'User already exists';
    }
    if( errorRes.status == 404){
      errorMes = 'User not Found try to Signup'
    }
    return throwError(errorMes);
  }

}
