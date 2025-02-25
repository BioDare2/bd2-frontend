import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsageStatsService {
  private backendUrl = environment.backendUrl + '/usage/get_count';

  constructor(private http: HttpClient) { }

  getUsageStats(): Observable<any> {
    return this.http.get<any>(this.backendUrl);
  }
}