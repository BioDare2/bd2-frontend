import {DisplayParameters} from './ts-display.dom';
import {Timepoint, Trace, TraceSet} from './ts-plot.dom';
import {Inject, Injectable, OnDestroy, OnInit, Optional} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, of, Subject} from 'rxjs';
import {TSDataService} from '../ts-data.service';
import {AlignOptions, DetrendingType, NormalisationOptions} from '../ts-data-dom';
import {catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap} from 'rxjs/operators';
import {ExperimentalAssayView} from '../../dom/repo/exp/experimental-assay-view';
import {PageEvent} from '@angular/material';
import { InjectionToken } from '@angular/core';


export class TimeSeriesPack {

  constructor(public params: DisplayParameters, public data: Trace[],
              public totalTraces = 0, public currentPage: PageEvent = DisplayParameters.firstPage()) {
  }

}


const REMOVE_DEBOUNCE = new InjectionToken<string>('param used only at tests');

@Injectable()
export class TSFetcher implements OnInit, OnDestroy {

  public seriesPackStream: Observable<TimeSeriesPack>;

  public readonly error$ = new Subject<any>();
  public readonly loading$ = new Subject<boolean>();

  private dataSetsStream = new BehaviorSubject<TraceSet>(undefined);
  private displayParamsStream: Subject<DisplayParameters>;
  private experiment$ = new BehaviorSubject<ExperimentalAssayView>(undefined);
  private slowParameters$: Observable<DisplayParameters>;
  // private seriesPack$ = new BehaviorSubject<TimeSeriesPack>(undefined);

  constructor(private tsDataService: TSDataService, @Inject(REMOVE_DEBOUNCE) @Optional() removeDebounce = false) {

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
      // tap( p => console.log('DS' + p[0], p)),
      map(([dataSet, params]) => {
        // console.log('In map ' + dataSet);
        if (dataSet) {
            const traces = this.processData(dataSet.traces, params);
            return new TimeSeriesPack(params, traces, dataSet.totalTraces, dataSet.currentPage);
          } else {
            return new TimeSeriesPack(params, [], 0, DisplayParameters.firstPage());
          }
      }),
      // tap( p => console.log('After map' + p, p))
    );

    /*
    .subscribe( ds => {
      console.log("Emiting "+ds, ds);
      this.seriesPack$.next(ds);
    }, err => console.log("Error in ds", err));*/
  }

  protected loadDataSet(exp: ExperimentalAssayView, detrending: DetrendingType, page: PageEvent): Observable<TraceSet> {

    return this.tsDataService.loadDataSet(exp, detrending, page);
  }

  protected processData(data: Trace[], params: DisplayParameters): Trace[] {

    data = this.trimData(data, params);
    data = this.normalizeData(data, params);
    data = this.alignData(data, params);
    return data;
  }

  protected normalizeData(data: Trace[], params: DisplayParameters): Trace[] {

    return data.map(trace => this.normalizeTrace(trace, params));
  }

  protected normalizeTrace(trace: Trace, params: DisplayParameters): Trace {

    if (params.normalisation !== 'MEAN_NORM' && params.normalisation !== 'MAX_NORM') {
      return trace;
    }

    const p = this.copyTrace(trace);
    let f = 1;
    if (params.normalisation === 'MEAN_NORM') {
      f = trace.mean !== 0 ? trace.mean : 1;
      f = f < 0 ? -f : f;
    } else if (params.normalisation === 'MAX_NORM') {
      f = Math.max(trace.max, -trace.min);
      f = f !== 0 ? f : 1;
    }

    p.data = trace.data.map(tp => new Timepoint(tp.x, tp.y / f));
    p.min = trace.min / f;
    p.max = trace.max / f;
    p.mean = trace.mean / f;
    return p;
  }

  protected copyTrace(org: Trace): Trace {
    const c = new Trace();
    c.data = org.data;
    c.fill = org.fill;
    c.label = org.label;
    c.max = org.max;
    c.min = org.min;
    c.mean = org.mean;
    return c;
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
    minMaxMean.mean = series[0].y;

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
