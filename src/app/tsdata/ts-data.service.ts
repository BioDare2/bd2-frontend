import {Injectable} from '@angular/core';
import {BioDareRestService} from '../backend/biodare-rest.service';
import {ExperimentalAssayView} from '../dom/repo/exp/experimental-assay-view';
import {DetrendingType, TimeSeriesMetrics, TSSort} from './ts-data-dom';
import {TraceSet} from './plots/ts-plot.dom';
import {DisplayParameters} from './plots/ts-display.dom';
import {Observable} from 'rxjs';
import {LegacyPageEvent as PageEvent} from '@angular/material/legacy-paginator';

@Injectable({
  providedIn: 'root'
})
export class TSDataService {

  constructor(private BD2REST: BioDareRestService) {

  }

  loadDataSet(exp: ExperimentalAssayView, detrending: DetrendingType, page: PageEvent, sort: TSSort): Observable<TraceSet> {

    return this.BD2REST.tsdata(exp.id, detrending, page, sort);
      // .then(jsonObj => jsonObj.data);
  }

  loadHourlyDataSet(exp: ExperimentalAssayView, detrending: DetrendingType, page: PageEvent, sort: TSSort): Observable<TraceSet> {

    return this.BD2REST.tsHourlyData(exp.id, detrending, page, sort);
    // .then(jsonObj => jsonObj.data);
  }

  exportURL(exp: ExperimentalAssayView, params: DisplayParameters): string {
    return this.BD2REST.tsdataExportURL(exp.id, params.detrending);
  }

  dataMetrics(exp: ExperimentalAssayView): Observable<TimeSeriesMetrics> {
    return this.BD2REST.tsdataMetrics(exp.id);
  }

}
