import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ConverterService {


  constructor(private http: Http) { }

  //  Get value from rest

  getBtcValue(value: string, name: string): Observable<any> {
    const url = '/api/currencies/' + name + '/' + value;

    return this.http
      .get(url)
      .map((response: Response) => {
        return <string> response.json();
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    return Observable.throw(error.statusText);
  }

}
