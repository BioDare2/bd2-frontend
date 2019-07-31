import {Injectable} from '@angular/core';
import {BioDareRestService} from '../../backend/biodare-rest.service';
import {ExperimentalAssayView} from '../../dom/repo/exp/experimental-assay-view';
import {PPAJobSummary, PPARequest} from '../ppa/ppa-dom';
import {RhythmicityRequest} from "./rhythmicity-dom";

@Injectable({
  providedIn: 'root'
})
export class RhythmicityService {

  constructor(private BD2REST: BioDareRestService) {
  }

  newTest(exp: ExperimentalAssayView, request: RhythmicityRequest): Promise<any> {
    return this.BD2REST.rhythmicityNew(exp, request);
  }

  getJobs(exp: ExperimentalAssayView): Promise<PPAJobSummary[]> {
    return this.BD2REST.ppaJobs(exp)
      .then(obj => obj.data);
  }

  exportURL(exp: ExperimentalAssayView): string {
    return this.BD2REST.ppaExportURL(exp.id);
  }
}
