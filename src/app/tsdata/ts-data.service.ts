import {Injectable} from '@angular/core';
import {BioDareRestService} from '../backend/biodare-rest.service';
import {ExperimentalAssayView} from '../dom/repo/exp/experimental-assay-view';
import {DetrendingType} from './ts-data-dom';
import {Trace, TraceSet} from './plots/ts-plot.dom';
import {DisplayParameters} from './plots/ts-display.dom';
import {Observable} from "rxjs";
import {PageEvent} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class TSDataService {

  constructor(private BD2REST: BioDareRestService) {

  }

  loadDataSet(exp: ExperimentalAssayView, detrending: DetrendingType, page: PageEvent): Observable<TraceSet> {

    return this.BD2REST.tsdata(exp, detrending);
      // .then(jsonObj => jsonObj.data);
  }

  exportURL(exp: ExperimentalAssayView, params: DisplayParameters): string {
    return this.BD2REST.tsdataExportURL(exp, params.detrending);
  }

}
