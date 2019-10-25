import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import { AuthHttp } from 'angular2-jwt';
import 'rxjs/Rx';


@Injectable()
export class OrderService {

  constructor(
    private authHttp: AuthHttp,   //to accses protected API Services
    private http:Http
  ) { }

  getOrders() {
    return this.authHttp.get('/api/orders')
      .map(response => response.json());
  }
}
