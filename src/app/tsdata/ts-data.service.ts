import {Injectable} from '@angular/core';
import {BioDareRestService} from '../backend/biodare-rest.service';
import {ExperimentalAssayView} from '../dom/repo/exp/experimental-assay-view';
import {DetrendingType, TimeSeriesMetrics} from './ts-data-dom';
import {TraceSet} from './plots/ts-plot.dom';
import {DisplayParameters} from './plots/ts-display.dom';
import {Observable} from 'rxjs';
import {PageEvent} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class TSDataService {

  constructor(private BD2REST: BioDareRestService) {

  }

  loadDataSet(exp: ExperimentalAssayView, detrending: DetrendingType, page: PageEvent): Observable<TraceSet> {

    return this.BD2REST.tsdata(exp, detrending, page);
      // .then(jsonObj => jsonObj.data);
  }

  exportURL(exp: ExperimentalAssayView, params: DisplayParameters): string {
    return this.BD2REST.tsdataExportURL(exp, params.detrending);
  }

  dataMetrics(exp: ExperimentalAssayView): Observable<TimeSeriesMetrics> {
    return this.BD2REST.tsdataMetrics(exp);
  }

}
