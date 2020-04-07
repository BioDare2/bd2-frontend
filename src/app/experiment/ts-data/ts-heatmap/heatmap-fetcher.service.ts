import {Inject, Injectable, Optional} from '@angular/core';
import {TSFetcher} from '../../../tsdata/plots/ts-fetcher';
import {TSDataService} from '../../../tsdata/ts-data.service';
import {REMOVE_DEBOUNCE} from '../../../shared/tokens';
import {ExperimentalAssayView} from '../../../dom/repo/exp/experimental-assay-view';
import {DetrendingType} from '../../../tsdata/ts-data-dom';
import {PageEvent} from '@angular/material/paginator';
import {Observable} from 'rxjs';
import {TraceSet} from '../../../tsdata/plots/ts-plot.dom';
import {tap} from 'rxjs/operators';

@Injectable()
export class HeatmapFetcher extends TSFetcher {

  constructor(tsDataService: TSDataService, @Inject(REMOVE_DEBOUNCE) @Optional() removeDebounce = false) {
    super(tsDataService, removeDebounce);

  }

  protected loadDataSet(exp: ExperimentalAssayView, detrending: DetrendingType, page: PageEvent): Observable<TraceSet> {

    return this.tsDataService.loadBinnedDataSet(exp, detrending, page).pipe(
      tap(ds => ds.detrending = detrending)
    );
  }
}
