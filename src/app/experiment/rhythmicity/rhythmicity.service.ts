import {Injectable} from '@angular/core';
import {BioDareRestService} from '../../backend/biodare-rest.service';
import {ExperimentalAssayView} from '../../dom/repo/exp/experimental-assay-view';
import {BD2eJTKRes, JobResults, RhythmicityJobSummary, RhythmicityRequest, TSResult} from './rhythmicity-dom';
import {Observable} from 'rxjs';
import {PPAJobSummary} from '../ppa/ppa-dom';

@Injectable({
  providedIn: 'root'
})
export class RhythmicityService {

  constructor(private BD2REST: BioDareRestService) {
  }

  newTest(exp: ExperimentalAssayView, request: RhythmicityRequest): Promise<any> {
    return this.BD2REST.rhythmicityNew(exp, request);
  }

  getJob(assayId: number, jobId: string): Observable<RhythmicityJobSummary> {
    return this.BD2REST.rhythmicityJob(assayId, jobId);
  }

  getJobs(exp: ExperimentalAssayView): Promise<RhythmicityJobSummary[]> {
    return this.BD2REST.rhythmicityJobs(exp)
      .then(obj => obj.data);
  }

  getResults(assayId: number, jobId: string): Observable<JobResults<BD2eJTKRes>> {
    return this.BD2REST.rhythmicityResults(assayId, jobId);
  }

  exportURL(exp: ExperimentalAssayView): string {
    return this.BD2REST.ppaExportURL(exp.id);
  }

  deleteJob(exp: ExperimentalAssayView, jobId: string): Observable<RhythmicityJobSummary> {
    return this.BD2REST.rhythmicityDeleteJob(exp.id, jobId);
  }
}
