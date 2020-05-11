import {DisplayParameters} from './ts-display.dom';
import {Timepoint, Trace, TraceSet} from './ts-plot.dom';
import {Inject, Injectable, OnDestroy, OnInit, Optional} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, of, Subject} from 'rxjs';
import {TSDataService} from '../ts-data.service';
import {AlignOptions, DetrendingType, NormalisationOptions} from '../ts-data-dom';
import {catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';
import {ExperimentalAssayView} from '../../dom/repo/exp/experimental-assay-view';
import { PageEvent } from '@angular/material/paginator';
import {REMOVE_DEBOUNCE} from '../../shared/tokens';


export class TimeSeriesPack {

  constructor(public params: DisplayParameters, public data: Trace[],
              public totalTraces = 0, public currentPage: PageEvent = DisplayParameters.firstPage()) {
  }

}




@Injectable()
export class TSFetcher implements OnInit, OnDestroy {

  public current: TimeSeriesPack;
  public seriesPackStream: Observable<TimeSeriesPack>;

  public readonly error$ = new Subject<any>();
  public readonly loading$ = new Subject<boolean>();

  private dataSetsStream = new BehaviorSubject<TraceSet>(undefined);
  private displayParamsStream: Subject<DisplayParameters>;
  private experiment$ = new BehaviorSubject<ExperimentalAssayView>(undefined);
  private slowParameters$: Observable<DisplayParameters>;
  // private seriesPack$ = new BehaviorSubject<TimeSeriesPack>(undefined);

  constructor(protected tsDataService: TSDataService, @Inject(REMOVE_DEBOUNCE) @Optional() removeDebounce = false) {

    const par = new DisplayParameters(0, 0, DetrendingType.LIN_DTR,
      NormalisationOptions[0].name, AlignOptions[0].name, DisplayParameters.firstPage());

    this.displayParamsStream = new BehaviorSubject<DisplayParameters>(par);



    if (removeDebounce) {
      this.slowParameters$ = this.displayParamsStream.pipe(
        filter(params => (params ? true : false))
      );
    } else {
      this.slowParameters$ = this.displayParamsStream.pipe(
        debounceTime(400),
        filter(params => (params ? true : false))
      );
    }

    /*this.seriesPackStream = this.seriesPack$.asObservable().pipe(
      filter( d => d ? true : false)
    );*/
    this.initObservables();
  }

  public changeDisplayParams(params: DisplayParameters) {
    this.displayParamsStream.next(params);
  }

  public experiment(exp: ExperimentalAssayView) {
    this.experiment$.next(exp);
  }


  ngOnInit(): any {
  }

  ngOnDestroy(): void {
    this.displayParamsStream.complete();
    this.dataSetsStream.complete();
    this.error$.complete();
    this.experiment$.complete();
    this.loading$.complete();
  }





  protected initObservables() {

    this.initDataSetsStream();
    this.seriesPackStream = this.initSeriesPackStream(this.dataSetsStream);
  }

  protected initDataSetsStream() {



    const page$ = this.slowParameters$.pipe(
      map( p => p.page),
      distinctUntilChanged((prev: PageEvent, next: PageEvent) => {
        return DisplayParameters.equalsPages(prev, next);
      })
    );

    const exp$ = this.experiment$.pipe(
      filter(exp => (exp ? true : false))
    );

    const trend$ = this.slowParameters$.pipe(
      map(params => params.detrending),
      distinctUntilChanged((prev: DetrendingType, next: DetrendingType) => next.equals(prev))
    );

    combineLatest([exp$, trend$, page$]).pipe(
      // tap( v => console.log('DataSets combine', v)),
      tap( p => this.loading$.next(true)),
      switchMap(([exp, detrending, page]) => this.loadDataSet(exp, detrending, page)),
      catchError( err => {
        console.log('Caught error', err);
        this.error$.next(err);
        return of(undefined);
      }),
      tap( p => this.loading$.next(false)),
      // tap( v => console.log('After switch map DataSets combine', v)),
    ).subscribe( ds => this.dataSetsStream.next(ds));
  }


  protected initSeriesPackStream(datasets: Observable<TraceSet>) {

    const parameter$ = this.slowParameters$.pipe(
      distinctUntilChanged((prev: DisplayParameters, next: DisplayParameters) => next.equalsView(prev))
    );

    return combineLatest([datasets, parameter$]).pipe(
      // tap( p => console.log('fetchers pack DS' + p[0], p)),
      map(([dataSet, params]) => {
        // console.log('In map ' + dataSet);
        if (dataSet) {
            const traces = this.processData(dataSet.traces, params);
            params = params.clone();
            params.detrending = dataSet.detrending;
            return new TimeSeriesPack(params, traces, dataSet.totalTraces, dataSet.currentPage);
          } else {
            return new TimeSeriesPack(params, [], 0, DisplayParameters.firstPage());
          }
      }),
      tap( pack => this.current = pack)
      // tap( p => console.log('After map' + p, p))
    );

    /*
    .subscribe( ds => {
      console.log("Emiting "+ds, ds);
      this.seriesPack$.next(ds);
    }, err => console.log("Error in ds", err));*/
  }

  protected loadDataSet(exp: ExperimentalAssayView, detrending: DetrendingType, page: PageEvent): Observable<TraceSet> {

    return this.tsDataService.loadDataSet(exp, detrending, page).pipe(
      tap(ds => ds.detrending = detrending)
    );
  }

  protected processData(data: Trace[], params: DisplayParameters): Trace[] {

    data = this.trimData(data, params);
    data = this.logData(data, params);
    data = this.normalizeData(data, params);
    data = this.alignData(data, params);
    return data;
  }

  protected normalizeData(data: Trace[], params: DisplayParameters): Trace[] {

    return data.map(trace => this.normalizeTrace(trace, params));
  }



  protected normalizeTrace(trace: Trace, params: DisplayParameters): Trace {

    switch (params.normalisation) {
      case 'MEAN_NORM':
        return this.normalizeTraceToMean(trace);
      case 'MAX_NORM':
        return this.normalizeTraceToMax(trace);
      case 'RANGE':
        return this.normalizeTraceToRange(trace);
      case 'FOLD':
        return this.normalizeTraceToFoldChange(trace);
      default:
        return trace;
    }
  }

  protected normalizeTraceToMean(trace: Trace): Trace {

    return this.normalizeTraceToFactor(trace, trace.mean);

  }

  protected normalizeTraceToMax(trace: Trace): Trace {

    return this.normalizeTraceToFactor(trace, Math.max(trace.max, -trace.min));
  }

  protected normalizeTraceToFactor(trace: Trace, f: number): Trace {

    if (f === 0) return trace;

    const p = this.copyTrace(trace);
    p.data = trace.data.map(tp => new Timepoint(tp.x, tp.y / f));
    p.min = trace.min / f;
    p.max = trace.max / f;
    p.mean = trace.mean / f;
    return p;
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

    if (trace.min > 0) {
      return this.normalizeTraceToFactor(trace, trace.min);
    }

    return this.emptyTrace(trace);
  }

  protected emptyTrace(trace: Trace): Trace {

    const p = this.copyTrace(trace);
    p.data = [];

    p.min = NaN;
    p.max = NaN;
    p.mean = NaN;
    return p;
  }

  protected copyTrace(org: Trace): Trace {
    const c = Object.assign(new Trace(), org);
    /*
    c.data = org.data;
    c.fill = org.fill;
    c.label = org.label;
    c.max = org.max;
    c.min = org.min;
    c.mean = org.mean;
     */
    return c;
  }

  protected logData(data: Trace[], params: DisplayParameters): Trace[] {

    if (params.log2) {
      return data.map(trace => this.logTrace(trace));
    }
    return data;
  }

  protected logTrace(trace: Trace): Trace {

    const zeroShift = 0.015625; // 2^-6

    const p = this.copyTrace(trace);

    p.data = trace.data
      .filter( tp => tp.y >= 0)
      .map(tp => new Timepoint(tp.x, Math.log2(tp.y + zeroShift)));

    const minMaxMean = this.minMaxMean(p.data);

    p.min = minMaxMean.min;
    p.max = minMaxMean.max;
    p.mean = minMaxMean.mean;
    return p;
  }



  protected alignData(data: Trace[], params: DisplayParameters): Trace[] {

    if (params.align === 'MEAN') {
      return data.map(trace => this.zeroTrace(trace));
    } else if (params.align === 'SPREAD') {
      return this.spreadMeans(data);
    }

    return data;
  }

  protected zeroTrace(trace: Trace): Trace {

    return this.subTrace(trace, trace.mean);

  }

  protected subTrace(trace: Trace, offset: number): Trace {
    const p = this.copyTrace(trace);
    p.data = trace.data.map(tp => new Timepoint(tp.x, tp.y - offset));
    p.min = trace.min - offset;
    p.max = trace.max - offset;
    p.mean = trace.mean - offset;
    return p;

  }

  protected trimData(data: Trace[], params: DisplayParameters): Trace[] {
    // console.log("TD: "+data.length+" "+JSON.stringify(params));
    // return data;

    return data.map(trace => this.trimTrace(trace, params))
      .filter(trace => trace.data.length > 0);
  }

  protected trimTrace(trace: Trace, params: DisplayParameters): Trace {

    if (params.timeStart === 0 && params.timeEnd === 0) {
      return trace;
    }

    const trimmed = this.copyTrace(trace);

    let sIx = 0;
    if (params.timeStart !== 0) {
      for (; sIx < trace.data.length; sIx++) {
        if (trace.data[sIx].x >= params.timeStart) {
          break;
        }
      }
    }

    let eIx = trace.data.length - 1;
    if (params.timeEnd !== 0) {
      for (; eIx >= 0; eIx--) {
        if (trace.data[eIx].x <= params.timeEnd) {
          break;
        }
      }
    }
    eIx++;

    trimmed.data = trace.data.slice(sIx, eIx);
    const minMaxMean = this.minMaxMean(trimmed.data);
    trimmed.min = minMaxMean.min;
    trimmed.max = minMaxMean.max;
    trimmed.mean = minMaxMean.mean;
    return trimmed;
  }





  spreadMeans(data: Trace[]) {

    const res: Trace[] = [];

    let lastM = 0;
    let lastH = 0;
    data.forEach(trace => {
      const dist = Math.max(lastH, trace.mean - trace.min);
      const newMean = lastM + dist;
      lastH = trace.max - trace.mean;
      res.push(this.subTrace(trace, trace.mean - newMean));
      lastM = newMean;
    });
    return res;
  }

  minMaxMean(series: Timepoint[]): { min: number, max: number, mean: number } {
    const minMaxMean = {min: NaN, max: NaN, mean: NaN};

    if (series.length === 0) {
      return minMaxMean;
    }


    minMaxMean.min = series[0].y;
    minMaxMean.max = series[0].y;
    minMaxMean.mean = 0;

    series.forEach(tp => {
      const y = tp.y;
      if (y < minMaxMean.min) {
        minMaxMean.min = y;
      }
      if (y > minMaxMean.max) {
        minMaxMean.max = y;
      }
      minMaxMean.mean += y;
    });
    minMaxMean.mean = minMaxMean.mean / series.length;
    return minMaxMean;
  }

}
