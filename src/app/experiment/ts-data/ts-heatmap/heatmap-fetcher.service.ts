import {Inject, Injectable, Optional} from '@angular/core';
import {TSFetcher} from '../../../tsdata/plots/ts-fetcher';
import {TSDataService} from '../../../tsdata/ts-data.service';
import {REMOVE_DEBOUNCE} from '../../../shared/tokens';
import {ExperimentalAssayView} from '../../../dom/repo/exp/experimental-assay-view';
import {DetrendingType} from '../../../tsdata/ts-data-dom';
import {PageEvent} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {Timepoint, Trace, TraceSet} from '../../../tsdata/plots/ts-plot.dom';
import {tap} from 'rxjs/operators';
import {DisplayParameters} from '../../../tsdata/plots/ts-display.dom';

@Injectable()
export class HeatmapFetcher extends TSFetcher {

  constructor(tsDataService: TSDataService, @Inject(REMOVE_DEBOUNCE) @Optional() removeDebounce = false) {
    super(tsDataService, removeDebounce);

  }

  protected loadDataSet(exp: ExperimentalAssayView, detrending: DetrendingType, page: PageEvent): Observable<TraceSet> {

    return this.tsDataService.loadHourlyDataSet(exp, detrending, page).pipe(
      tap(ds => ds.detrending = detrending),
      tap( ds => ds.traces.forEach( trace => trace.label =`${trace.traceNr}. ${trace.label}`))
    );
  }




}
