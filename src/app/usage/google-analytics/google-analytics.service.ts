import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleAnalyticsService {
  private backendUrl = environment.backendUrl + '/analytics/data';

  constructor(private http: HttpClient) { }

  getAnalyticsData(): Observable<any> {
    return this.http.get<any>(this.backendUrl);
  }
}