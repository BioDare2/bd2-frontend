import {Injectable} from '@angular/core';
import {BioDareRestService} from '../backend/biodare-rest.service';
import {ExperimentSummary} from '../dom/repo/exp/experiment-summary';
import {ExperimentalAssayView} from '../dom/repo/exp/experimental-assay-view';

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

  newDraft(): Promise<ExperimentalAssayView> {

    return this.BD2REST.experimentNewDraft()
      .then(jsonObj => this.json2ExperimentalAssayView(jsonObj));

  }

  newExperiment(exp: ExperimentalAssayView): Promise<ExperimentalAssayView> {
    return this.BD2REST.experimentNewExperiment(exp)
      .then(jsonObj => this.json2ExperimentalAssayView(jsonObj));
  }


  protected json2ExperimentSummaryList(data: any[]): ExperimentSummary[] {

    return data.map((v: any) => ExperimentSummary.deserialize(v));

  }

  protected json2ExperimentalAssayView(jsonObj: any): ExperimentalAssayView {

    return ExperimentalAssayView.deserialize(jsonObj);

  }
}
