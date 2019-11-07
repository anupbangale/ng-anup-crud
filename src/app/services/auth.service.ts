import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';
// import{Observable} from 'rxjs/Observable';
// import 'rxjs/add/operator/map'

import 'rxjs/Rx';


@Injectable()
export class AuthService {
  constructor(private http: Http) {
  }

  login(credentials) {
    return this.http.post('/api/authenticate',
      JSON.stringify(credentials))
      .map(response => {
        // console.log(response.json());
        const result = response.json();
        if (result && result.token) {
          sessionStorage.setItem('token', result.token);
          return true;
        }
        return false;
      });
  }

  logout() {
    sessionStorage.removeItem('token');
  }

  isLoggedIn() {
    const jwtHelper = new JwtHelper();
    const token = sessionStorage.getItem('token');
    if (!token) {
      return false;
    }
    // const expirationDate = jwtHelper.getTokenExpirationDate(token);
    const isExpired = jwtHelper.isTokenExpired(token);
    // console.log('expirationDate', expirationDate);
    // console.log('isExpired', isExpired);
    return !isExpired;

    // return tokenNotExpired();

  }

  get currentUser() {
    const token = sessionStorage.getItem('token');
    if (!token) { return 'null'; }
    return new JwtHelper().decodeToken(token);

  }
}

