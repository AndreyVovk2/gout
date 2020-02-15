import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/do';
import {Observable} from 'rxjs';
import {Api} from '../intefaces/api.interface';
import * as queryString from 'query-string';

@Injectable()

export class RequestProvider implements Api {


  constructor(public http: HttpClient) {

  }
  /**
   * @param url
   * @param body
   * @returns {Observable<ArrayBuffer>}
   */
  public get(url: string, body: Object = null) {
    if (body !== null) {
      if (Object.keys(body).length > 0) {
        url += '?' + queryString.stringify(body);
      }
    }
    return this.http.get(url)
  }

  /**
   *
   * @param url
   * @param credentials
   * @returns {Observable<ArrayBuffer>}
   */
  public post(url: string, credentials: any) {
    return this.http.post(url, credentials)
  }

  /**
   *
   * @param url
   * @returns {Observable<ArrayBuffer>}
   */

  public delete(url: string) {
    return this.http.delete(url)
  }

  /**
   *
   * @param url
   * @param credentials
   * @returns {Promise<ArrayBuffer>|Promise<TResult|ArrayBuffer>}
   */
  public put(url: string, credentials: any): Observable<any> {
    return this.http.put(url, credentials)
  }

  /**
   *
   * @param url
   * @param body
   * @returns {Observable<ArrayBuffer>}
   */
  public next(url: string, body: Object = null) {
    if (body !== null) {
      if (Object.keys(body).length > 0) {
        url += body;
      }
    }
    return this.http.get(url)
  }
}
