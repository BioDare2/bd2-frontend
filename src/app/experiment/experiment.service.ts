import {Injectable} from '@angular/core';
import {BioDareRestService} from '../backend/biodare-rest.service';
import {ExperimentSummary} from '../dom/repo/exp/experiment-summary';
import {ExperimentalAssayView} from '../dom/repo/exp/experimental-assay-view';
import {FileImportRequest} from './ts-data/ts-import/import-dom';
import {Observable} from 'rxjs';
import {ListWrapper} from '../shared/common-interfaces';
import {tap} from 'rxjs/operators';
import {PageEvent, Sort} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class ExperimentService {

  constructor(private BD2REST: BioDareRestService) {
    console.log('ExperimentService created');
  }

  getExperiments(showPublic: boolean, sort: Sort, page: PageEvent): Observable<ListWrapper<ExperimentSummary>> {

    const options = {showPublic,
                     sorting: sort.active, direction: sort.direction,
                     pageIndex: page.pageIndex, pageSize: page.pageSize};

    return this.BD2REST.experiments(options).pipe(
      tap((wrapper: ListWrapper<ExperimentSummary>) => {
        wrapper.data = this.json2ExperimentSummaryList(wrapper.data);
      })
    );
  }

  searchExperiments(query: string, showPublic: boolean, sort: Sort, page: PageEvent): Observable<ListWrapper<ExperimentSummary>> {

    const options = {query,
      showPublic,
      sorting: sort.active, direction: sort.direction,
      pageIndex: page.pageIndex, pageSize: page.pageSize};

    return this.BD2REST.searchExperiments(options).pipe(
      tap((wrapper: ListWrapper<ExperimentSummary>) => {
        wrapper.data = this.json2ExperimentSummaryList(wrapper.data);
      })
    );
  }

  newDraft(): Promise<ExperimentalAssayView> {

    return this.BD2REST.experimentNewDraft()
      .then(jsonObj => this.json2ExperimentalAssayView(jsonObj));

  }

  newExperiment(exp: ExperimentalAssayView): Promise<ExperimentalAssayView> {
    return this.BD2REST.experimentNewExperiment(exp)
      .then(jsonObj => this.json2ExperimentalAssayView(jsonObj));
  }

  getExperiment(expId: number): Promise<ExperimentalAssayView> {

    return this.BD2REST.experiment(expId)
      .then(jsonObj => this.json2ExperimentalAssayView(jsonObj));
  }

  save(exp: ExperimentalAssayView): Promise<ExperimentalAssayView> {
    return this.BD2REST.experimentSave(exp)
      .then(jsonObj => this.json2ExperimentalAssayView(jsonObj));
  }

  importTimeSeries(exp: ExperimentalAssayView, request: FileImportRequest): Observable<any> {
    return this.BD2REST.experimentImportTS(exp.id, request);
  }

  publish(exp: ExperimentalAssayView, license: string): Promise<ExperimentalAssayView> {
    return this.BD2REST.experimentPublish(exp.id, license)
      .then(jsonObj => this.json2ExperimentalAssayView(jsonObj));
  }

  protected json2ExperimentSummaryList(data: any[]): ExperimentSummary[] {

    return data.map((v: any) => ExperimentSummary.deserialize(v));

  }

  protected json2ExperimentalAssayView(jsonObj: any): ExperimentalAssayView {

    return ExperimentalAssayView.deserialize(jsonObj);

  }
}
