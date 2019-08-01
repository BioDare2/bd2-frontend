import {Injectable} from '@angular/core';
import {BioDareRestService} from '../../backend/biodare-rest.service';
import {ExperimentalAssayView} from '../../dom/repo/exp/experimental-assay-view';
import {RhythmicityJobSummary, RhythmicityRequest} from "./rhythmicity-dom";

@Injectable({
  providedIn: 'root'
})
export class RhythmicityService {

  constructor(private BD2REST: BioDareRestService) {
  }

  newTest(exp: ExperimentalAssayView, request: RhythmicityRequest): Promise<any> {
    return this.BD2REST.rhythmicityNew(exp, request);
  }

  getJob(assayId: number, jobId: string): Promise<RhythmicityJobSummary> {
    return this.BD2REST.rhythmicityJob(assayId, jobId);
  }

  getJobs(exp: ExperimentalAssayView): Promise<RhythmicityJobSummary[]> {
    return this.BD2REST.rhythmicityJobs(exp)
      .then(obj => obj.data);
  }

  exportURL(exp: ExperimentalAssayView): string {
    return this.BD2REST.ppaExportURL(exp.id);
  }
}
