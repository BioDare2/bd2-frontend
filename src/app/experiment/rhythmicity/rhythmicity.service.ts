import {Injectable} from '@angular/core';
import {BioDareRestService} from '../../backend/biodare-rest.service';
import {ExperimentalAssayView} from "../../dom/repo/exp/experimental-assay-view";
import {PPAJobSummary} from "../ppa/ppa-dom";

@Injectable({
  providedIn: 'root'
})
export class RhythmicityService {

  constructor(private BD2REST: BioDareRestService) {
  }


  getJobs(exp: ExperimentalAssayView): Promise<PPAJobSummary[]> {
    return this.BD2REST.ppaJobs(exp)
      .then(obj => obj.data);
  }

  exportURL(exp: ExperimentalAssayView): string {
    return this.BD2REST.ppaExportURL(exp.id);
  }
}
