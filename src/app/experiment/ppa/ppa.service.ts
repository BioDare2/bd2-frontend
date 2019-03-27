import {Injectable} from '@angular/core';
import {BioDareRestService} from '../../backend/biodare-rest.service';
import {ExperimentalAssayView} from '../../dom/repo/exp/experimental-assay-view';
import {
  PPAJobResultsGroups,
  PPAJobSimpleResults,
  PPAJobSimpleStats,
  PPAJobSummary,
  PPARequest,
  PPAResultsGroup,
  PPASelectGroup
} from './ppa-dom';


@Injectable({
  providedIn: 'root'
})
export class PPAService {

  constructor(private BD2REST: BioDareRestService) {
  }

  newPPA(exp: ExperimentalAssayView, request: PPARequest): Promise<any> {
    return this.BD2REST.ppaNew(exp, request);
  }

  getPPAJobs(exp: ExperimentalAssayView): Promise<PPAJobSummary[]> {
    return this.BD2REST.ppaJobs(exp)
      .then(obj => obj.data);
  }

  getPPAJob(expId: number, jobId: number): Promise<PPAJobSummary> {
    return this.BD2REST.ppaJob(expId, jobId);
  }

  downloadPPAJob(expId: number, jobId: number, phaseType: string): Promise<Blob> {
    return this.BD2REST.ppaExportJob(expId, jobId, phaseType)
      .then(resp => resp.blob());
  }


  deletePPAJob(exp: ExperimentalAssayView, jobId: number): Promise<PPAJobSummary> {
    return this.BD2REST.ppaDeleteJob(exp.id, jobId);
  }

  getPPAJobResultsGrouped(expId: number, jobId: number): Promise<PPAJobResultsGroups> {

    return this.BD2REST.ppaJobResultsGrouped(expId, jobId);

  }

  getPPAJobSimpleResults(expId: number, jobId: number): Promise<PPAJobSimpleResults> {
    return this.BD2REST.ppaJobSimpleResults(expId, jobId);
  }

  getPPAForSelect(expId: number, jobId: number): Promise<PPASelectGroup[]> {
    return this.BD2REST.ppaForSelect(expId, jobId)
      .then(obj => obj.data);
  }

  getPPAJobSimpleStats(expId: number, jobId: number): Promise<PPAJobSimpleStats> {
    return this.BD2REST.ppaJobSimpleStat(expId, jobId)
      ;
  }

  /*
   fakePPASets(jobId: number): PPAJobResultsGroups {
   let sets = new PPAJobResultsGroups();
   sets.jobId = jobId;
   sets.groups = [];

   let set: PPAResultsGroupSummary;
   set = new PPAResultsGroupSummary();
   set.label = "WT";
   set.memberDataId = 1;
   set.failures = 1;
   set.periods = [24, 24.5, 24.1, 25, 23.4];
   set.phasesToZeroCirc = new ArraysByPhase();
   set.phasesToZeroCirc.ByAvgMax = [3, 3.1, 3.2];
   set.phasesToZeroCirc.ByFit = [3.5, 3.6, 3.7];
   set.phasesToZeroCirc.ByFirstPeak = [3, 2.8, 3.2];
   set.phasesToZeroCirc.ByMethod = [2.5, 3, 3.5];
   set.phasesToWindowCirc = new ArraysByPhase();
   set.phasesToWindowCirc.ByAvgMax = [3 + 1, 3.1 + 1, 3.2 + 1];
   set.phasesToWindowCirc.ByFit = [3.5 + 1, 3.6 + 1, 3.7 + 1];
   set.phasesToWindowCirc.ByFirstPeak = [3 + 1, 2.8 + 1, 3.2 + 1];
   set.phasesToWindowCirc.ByMethod = [2.5 + 1, 3 + 1, 3.5 + 1];

   set.amplitudes = new ArraysByPhase();
   sets.groups.push(set);

   set = new PPAResultsGroupSummary();
   set.label = "toc1 B+R";
   set.memberDataId = 2;
   set.failures = 0;
   set.periods = [23, 22.5, 22.1, 23, 21.4];
   set.phasesToZeroCirc = new ArraysByPhase();
   set.phasesToZeroCirc.ByAvgMax = [6, 6.6, 7.6];
   set.phasesToZeroCirc.ByFit = [6.5, 6.6, 6.7];
   set.phasesToZeroCirc.ByFirstPeak = [6, 6.8, 6.2];
   set.phasesToZeroCirc.ByMethod = [6.5, 6, 8.5];
   set.phasesToWindowCirc = new ArraysByPhase();
   set.phasesToWindowCirc.ByAvgMax = [3 + 7, 3.1 + 7, 3.2 + 7];
   set.phasesToWindowCirc.ByFit = [3.5 + 7, 3.6 + 7, 3.7 + 7];
   set.phasesToWindowCirc.ByFirstPeak = [3 + 8, 2.8 + 8, 3.2 + 8];
   set.phasesToWindowCirc.ByMethod = [2.5 + 8, 3 + 8, 3.5 + 8];
   set.amplitudes = new ArraysByPhase();
   sets.groups.push(set);

   set = new PPAResultsGroupSummary();
   set.label = "ztl B+R";
   set.memberDataId = 3;
   set.failures = 2;
   set.periods = [27, 27.1, 28.2, 27.5, 24.4];
   set.phasesToZeroCirc = new ArraysByPhase();
   set.phasesToZeroCirc.ByAvgMax = [16, 16.6, 17.6];
   set.phasesToZeroCirc.ByFit = [16.5, 16.6, 16.7];
   set.phasesToZeroCirc.ByFirstPeak = [16, 16.8, 16.2];
   set.phasesToZeroCirc.ByMethod = [18.5, 16, 18.5];
   set.phasesToWindowCirc = new ArraysByPhase();
   set.phasesToWindowCirc.ByAvgMax = [16 - 2, 16.6 - 2, 17.6 - 2];
   set.phasesToWindowCirc.ByFit = [16.5 - 2, 16.6 - 2, 16.7 - 2];
   set.phasesToWindowCirc.ByFirstPeak = [16 - 2, 16.8 - 2, 16.2 - 2];
   set.phasesToWindowCirc.ByMethod = [18.5 - 2, 16 - 2, 18.5 - 2];
   set.amplitudes = new ArraysByPhase();
   sets.groups.push(set);


   return sets;
   }*/


  /*
   getPPAStats(exp: ExperimentalAssayView): Promise<PPAJobStats[]> {
   return this.BD2REST.ppaStats(exp)
   .then(obj => obj.data);
   }*/

  getPPAResults(exp: ExperimentalAssayView): Promise<PPAResultsGroup[]> {
    return this.BD2REST.ppaResults(exp)
      .then(obj => obj.data);
  }

  doPPASelection(expId: number, jobId: number, selection: any): Promise<any> {
    return this.BD2REST.ppaDoSelection(expId, jobId, selection);
  }

  exportURL(exp: ExperimentalAssayView): string {
    return this.BD2REST.ppaExportURL(exp.id);
  }

}
