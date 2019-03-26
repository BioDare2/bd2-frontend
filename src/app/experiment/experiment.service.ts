import {Injectable} from '@angular/core';
import {BioDareRestService} from '../backend/biodare-rest.service';
import {ExperimentSummary} from '../dom/repo/exp/experiment-summary';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  constructor(private BD2REST: BioDareRestService) {
    console.log('ExperimentService created');
  }

  getExperiments(onlyOwned = true): Promise<ExperimentSummary[]> {

    return this.BD2REST.experiments(onlyOwned)
      .then(jsonObj => this.json2ExperimentSummaryList(jsonObj.data));
  }


  protected json2ExperimentSummaryList(data: any[]): ExperimentSummary[] {

    return data.map((v: any) => ExperimentSummary.deserialize(v));

  }
}
