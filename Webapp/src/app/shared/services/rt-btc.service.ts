import { Injectable } from '@angular/core';

import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import { Socket } from 'ng-socket-io';

import {BitcoinModel} from '../model/BitcoinModel';

@Injectable()
export class RtBtcService {

  private url = '/api/rtbtc';

  constructor(private socket: Socket, private http: Http) { }

  //  Get value from rest

  getInitValue(): Observable<BitcoinModel> {
    return this.http
      .get(this.url)
      .map((response: Response) => {
        return <BitcoinModel> response.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

  //  get value from socket io

  getValue() {
    return this.socket
      .fromEvent<any>('rtbtc')
      .map(data => data.msg);
  }
}
