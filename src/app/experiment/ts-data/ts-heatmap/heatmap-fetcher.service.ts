import {Inject, Injectable, Optional} from '@angular/core';
import {TSFetcher} from '../../../tsdata/plots/ts-fetcher';
import {TSDataService} from '../../../tsdata/ts-data.service';
import {REMOVE_DEBOUNCE} from '../../../shared/tokens';

@Injectable()
export class HeatmapFetcher extends TSFetcher {

  constructor(tsDataService: TSDataService, @Inject(REMOVE_DEBOUNCE) @Optional() removeDebounce = false) {
    super(tsDataService, removeDebounce);

  }

  /*protected loadDataSet(exp: ExperimentalAssayView, hourly: boolean, detrending: DetrendingType, page: PageEvent): Observable<TraceSet> {

    return this.tsDataService.loadHourlyDataSet(exp, detrending, page).pipe(
      tap(ds => ds.detrending = detrending),
      tap( ds => ds.traces.forEach( trace => trace.label =`${trace.traceNr}. ${trace.label}`))
    );
  }*/




}
