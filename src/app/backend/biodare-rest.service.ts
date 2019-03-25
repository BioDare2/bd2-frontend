import {Injectable} from '@angular/core';
import {BioDareEndPoints} from './biodare-rest.dom';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {SystemEventsService} from '../system/system-events.service';
import {BD2User} from '../auth/user.dom';

@Injectable({
  providedIn: 'root'
})
export class BioDareRestService {

  constructor(private endPoints: BioDareEndPoints,
              private systemEvents: SystemEventsService,
              private http: HttpClient) {

  }

  // it is static as the this was missinging in handleBadResponse
  protected static extractMessage(resp: HttpErrorResponse, def: string): string {
    if (!resp) {
      return '' + def;
    }

    if (resp.error && resp.error.message) {
      return resp.error.message;
    }

    if (resp.message) {
      return resp.message + ':' + def;
    }

    return def;
  }

  login(username: string, password: string): Observable<BD2User> {

    const options = this.makeOptions();

    // must be like this as headers are immutatble
    options.headers = options.headers.append('authorization',
      'Basic ' + btoa(username + ':' + password));
    options.headers = options.headers.append('X-Requested-With',
      'XMLHttpRequest'); // to prevent the basic auth popup

    const url = this.endPoints.login_url;

    return this.OKJson(this.http.get<BD2User>(url, options));

  }

  logout(): Observable<boolean> {
    const options = this.makeOptions();
    const url = this.endPoints.logout_url;

    return this.OK(this.http.post(url, undefined, options));
  }

  refreshUser(): Observable<BD2User> {
    const options = this.makeOptions();
    const url = this.endPoints.user_url;

    return this.OKJson(this.http.get<BD2User>(url, options));

  }

  protected makeOptions() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
      // 'X-Requested-With':'XMLHttpRequest' // to prevent the basic auth popup
    });

    return {
      headers,
      withCredentials: true
    };
  }

  protected OKJson<T>(resp$: Observable<T>): Observable<T> {

    return resp$.pipe(
      catchError(this.handleBadResponse)
    );
  }


  protected OK(resp$: Observable<any>): Observable<boolean> {

    return resp$.pipe(
      map(_ => true),
      catchError(this.handleBadResponse)
    );
  }

  protected handleBadResponse(resp: HttpErrorResponse) {
    // console.log('HandleBadResponse: '+resp.status+'; '+resp.statusText);
    // console.log('Body: '+resp.text());
    // console.log('RESP: '+JSON.stringify(resp));
    // console.log('E: '+resp.text());
    // console.log("BR",resp);

    console.error('Response error', resp);


    let message: string;

    switch (resp.status) {
      case 401: {
        message = 'Bad credentials, locked or not activated account';
        break;
      }
      case 403: {
        // console.log('Unauthorised');
        this.systemEvents.emitUnauthorised(resp.url);

        // must be static call as this is not defined in the pipe ??? why???
        message = BioDareRestService.extractMessage(resp, 'Unauthorized');
        break;
      }
      case 400: {
        message = BioDareRestService.extractMessage(resp, 'Handling error');
        break;
      }
      default: {
        message = BioDareRestService.extractMessage(resp, 'No error details');
      }

    }
    return throwError(message);
  }


}
