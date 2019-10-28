import {DisplayParameters} from './ts-display.dom';
import {Timepoint, Trace, TraceSet} from './ts-plot.dom';
import {OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable, of, Subject} from 'rxjs';
import {TSDataService} from '../ts-data.service';
import {CurrentExperimentService} from '../../experiment/current-experiment.service';
import {FeedbackService} from '../../feedback/feedback.service';
import {AlignOptions, DetrendingType, NormalisationOptions} from '../ts-data-dom';
import {catchError, debounceTime, distinctUntilChanged, filter, map, switchMap} from 'rxjs/operators';
import {ExperimentalAssayView} from '../../dom/repo/exp/experimental-assay-view';


export class TimeSeriesPack {

  constructor(public params: DisplayParameters, public data: Trace[]) {
  }

}

export class TSFetcher implements OnInit, OnDestroy {

  public timeSeriesStream: Observable<Trace[]>;
  public seriesPackStream: Observable<TimeSeriesPack>;
  protected dataSetsStream: Observable<TraceSet>;

  // private displayStream: Subject<DisplayParameters>;
  // private detrendingStream: Subject<DetrendingType>;
  private displayParamsStream: Subject<DisplayParameters>;

  constructor(private tsdataService: TSDataService,
              private currentExperiment: CurrentExperimentService,
              private feedback: FeedbackService) {

    const par = new DisplayParameters(0, 0, DetrendingType.LIN_DTR,
      NormalisationOptions[0].name, AlignOptions[0].name);

    this.displayParamsStream = new BehaviorSubject<DisplayParameters>(par);

    this.initObservables();
  }

  public changeDisplayParams(params: DisplayParameters) {
    this.displayParamsStream.next(params);
  }


  ngOnInit(): any {
  }

  ngOnDestroy(): void {
    if (this.displayParamsStream) {
      this.displayParamsStream.complete();
    }
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

  /*  protected initTimeSeriesStream(datasets: Observable<Trace[]>):Observable<Trace[]> {

   let params = this.displayParamsStream
   .debounceTime(400)
   .filter( params => params.isValid())
   .distinctUntilChanged((prev: DisplayParameters, next: DisplayParameters) => next.equalsView(prev));

   let joined = Observable.combineLatest(datasets,params,(dataSet,params)=> {return { dataSet:dataSet,params:params};});

   return joined.map( pair => this.trimData(pair.dataSet,pair.params));
   }*/

  protected initObservables() {

    this.dataSetsStream = this.initDataSetsStream();
    this.seriesPackStream = this.initSeriesPackStream(this.dataSetsStream);
    this.timeSeriesStream = this.initTimeSeriesStream(this.seriesPackStream);
  }

  protected initDataSetsStream(): Observable<TraceSet> {

    const exps = this.currentExperiment.experiment().pipe(
      filter(exp => (exp ? true : false)));

    const trends = this.displayParamsStream.pipe(
      debounceTime(400),
      filter(params => (params ? true : false)),
      map(params => params.detrending),
      distinctUntilChanged((prev: DetrendingType, next: DetrendingType) => next.equals(prev))
    );

    const joined = combineLatest(exps, trends, (exp, trend) => {
      // console.log("DSS: "+trend.name);
      return {assay: exp, detrending: trend};
    });

    return joined.pipe(
      switchMap(pair => this.loadDataSet(pair.assay, pair.detrending)),
      filter(ds => (ds ? true : false))
    );
  }

  protected initSeriesPackStream(datasets: Observable<TraceSet>): Observable<TimeSeriesPack> {

    const parameters = this.displayParamsStream.pipe(
      debounceTime(400),
      filter(params => params.isValid()),
      distinctUntilChanged((prev: DisplayParameters, next: DisplayParameters) => next.equals(prev))
    );

    const joined = combineLatest([datasets, parameters]).pipe(
      map(([dataSet, params]) => {
      // console.log("SPS: "+params.detrending.name);
      return {dataSet, params};
    }));

    return joined.pipe(
      map(pair => new TimeSeriesPack(pair.params, this.processData(pair.dataSet.traces, pair.params)))
    );
  }

  protected initTimeSeriesStream(dataPacks: Observable<TimeSeriesPack>): Observable<Trace[]> {
    return dataPacks.pipe(map(dp => dp.data));
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

  /*
   protected isInRange(point: Timepoint,  params : DisplayParameters): boolean {
   if (params.windowStart !== 0) {
   if (point.x < params.windowStart) return false;
   }
   if (params.windowEnd !== 0) {
   if (point.x > params.windowEnd) return false;
   }
   return true;
   }
   */

  protected loadDataSet(exp: ExperimentalAssayView, detrending: DetrendingType): Observable<TraceSet> { // Observable<Trace[]> {

    // console.log("LDS: "+exp.id+" "+JSON.stringify(detrending));

    return this.tsdataService.loadDataSet(exp, detrending).pipe(
      catchError( err => {
        console.log('LDS error: ' + err);
        this.feedback.error(err);
        return of(undefined);
      })
    );

    /*
    try {
      const p = this.tsdataService.loadDataSet(exp, detrending)
        .catch(err => {
          console.log('LDS error: ' + err);
          this.feedback.error(err);
          return [];
        });
      return p;
      // return Observable.fromPromise(p);
    } catch (err) {
      console.log('LDS Try error:' + err);
      this.feedback.error(err);
      // return Observable.of([]);
      return Promise.resolve([]);
    }*/

    /*

     return Observable.onErrorResumeNext<Trace[]>(this.tsdataService.loadDataSet(exp,detrending)
     .map( d => {
     console.log("Got data: "+(d ? d.length : d));
     return d;
     })
     .onErrorResumeNext(Observable.of([]))
     .catch( (error,org) => {
     console.log("LDS error: "+error);
     this.feedback.error(error);
     return Observable.of([]);
     }),Observable.of([]));
     */

  }

}
