import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsageDataService {
  private backendUrl = environment.backendUrl + '/usage/get_usage_stats';

  constructor(private http: HttpClient) { }

  getUsageData(): Observable<any> {
    return this.http.get<any>(this.backendUrl);
  }
}