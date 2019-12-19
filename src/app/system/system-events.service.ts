import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SystemEventsService {


  debug = true;

  private unauthorisedStream = new Subject<string>();

  get unauthorised(): Observable<string> {
    return this.unauthorisedStream.asObservable();
  }

  emitUnauthorised(resource: string) {
    this.unauthorisedStream.next(resource);
  }

}
