import {Injectable} from '@angular/core';
import {ExperimentalAssayView} from '../dom/repo/exp/experimental-assay-view';
import {BehaviorSubject, Observable} from 'rxjs';

let nr = 1;

@Injectable()
export class CurrentExperimentService {

  id: number;

  private experimentStream = new BehaviorSubject<ExperimentalAssayView>(null);

  constructor() {
    this.id = nr++;
    // console.log("CurrentExperimentService "+this.id+" created");
  }

  close() {
    this.experimentStream.complete();

    // console.log("CurrentExperimentService "+this.id+" closed")
  }

  experiment(): Observable<ExperimentalAssayView> {
    return this.experimentStream;
  }

  push(exp: ExperimentalAssayView) {
    this.experimentStream.next(exp);
  }
}
