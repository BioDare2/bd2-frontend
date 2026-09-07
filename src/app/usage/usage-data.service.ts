import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BioDareRestService } from '../backend/biodare-rest.service';

@Injectable({
  providedIn: 'root'
})
export class UsageDataService {

  constructor(private BD2REST: BioDareRestService) {
    }

  getUsageData(): Observable<any> {
    return this.BD2REST.getUsageData();
  }
}
