import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Constants } from '../Config/constants';
import { HttpClient } from '@angular/common/http';

import { LoginRequest } from './Interfaces/LoginRequest';
import { RegisterRequest } from './Interfaces/RegisterRequest';
import { TokenResponse } from './Interfaces/TokenResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router, private http: HttpClient) {}

  publicUrlAuth = Constants.API_URL_AUTH;

  login(email: string, password: string): void {
    // Sett Session and token
    console.log('Login In')

    const data: LoginRequest = {
      email: email,
      password: password,
    };

    // this.http.post<TokenResponse>(this.publicUrlAuth + 'login', data).subscribe(
    //   (res) => {
    //     console.log(res);
    //     localStorage.setItem('isLoggedIn', 'true');
    //     localStorage.setItem('access_token', res.access_token);
    //     localStorage.setItem('refresh_token', res.refresh_token);
    //     this.router.navigate(['/dashboard']);
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );

  }

  isLoggedIn(): boolean {
    // this.router.navigate(['dashboard/home']);
    return true;
    // return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
  }
}
