import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {BioDareRestService} from '../../backend/biodare-rest.service';

@Injectable({
  providedIn: 'root'
})
export class StaticContentService {

  constructor(private http: HttpClient) {
  }

  getDocs(name: string): Promise<string> {


    const options = this.makeOptions();
    const url = 'assets/' + name + '.html';

    return this.OKTxt(this.http.get(url, options as any)).toPromise();
  }

  protected makeOptions() {
    const headers = new HttpHeaders({
      Accept: 'text/html'
      // 'X-Requested-With':'XMLHttpRequest' // to prevent the basic auth popup
    });

    return {
      headers,
      responseType: 'text',
      withCredentials: true,
    };
  }

  protected OKTxt(resp$: Observable<any>): Observable<string> {
    return resp$.pipe(
      map(resp => {
        let txt: string;
        if (resp.body) {
          txt = resp.txt;
        } else {
          txt = resp;
        }
        return txt;
      }),
      catchError(this.handleBadResponse)
    );
  }


  protected handleBadResponse(resp: HttpErrorResponse) {

    console.error('Response error', resp);


    let message: string;

    switch (resp.status) {
      case 401: {
        message = 'Bad credentials, locked or not activated account';
        break;
      }
      default: {
        message = BioDareRestService.extractMessage(resp, 'No error details');
      }

    }
    return throwError(message);
  }

}
