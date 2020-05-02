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

  protected normalizeTrace(trace: Trace, params: DisplayParameters): Trace {

    switch (params.normalisation) {
      case 'MEAN_NORM':
        return super.normalizeTrace(trace, params);
      case 'MAX_NORM':
        return super.normalizeTrace(trace, params);
      case 'RANGE':
        return this.normalizeTraceToRange(trace);
      case 'FOLD':
        return this.normalizeTraceToFoldChange(trace);
      default:
        return trace;
    }
  }

  protected normalizeTraceToRange(trace: Trace): Trace {

    const p = this.copyTrace(trace);
    const b = trace.mean;
    const f = Math.max(trace.max-trace.mean, Math.abs(trace.min-trace.mean));

    p.data = trace.data.map(tp => new Timepoint(tp.x, (tp.y-b) / f));
    p.min = (trace.min-b) / f;
    p.max = (trace.max-b) / f;
    p.mean = 0;
    return p;
  }

  protected normalizeTraceToFoldChange(trace: Trace): Trace {

    const p = this.copyTrace(trace);
    const b = trace.min <= 0 ? 1 - trace.min : 0;
    const f = trace.min <= 0 ? 1 : trace.min;

    p.data = trace.data.map(tp => new Timepoint(tp.x, (tp.y+b) / f));
    p.min = 1;
    p.max = (trace.max+b) / f;
    p.mean = (trace.mean+b) / f;
    return p;
  }


}
