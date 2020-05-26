import {of, throwError} from 'rxjs';
import {TSDataService} from '../ts-data.service';
import {TimeSeriesPack, TSFetcher} from './ts-fetcher';
import {fakeAsync, tick} from '@angular/core/testing';
import {ExperimentalAssayView} from '../../dom/repo/exp/experimental-assay-view';
import {Timepoint, Trace, TraceSet} from './ts-plot.dom';
import {DisplayParameters} from './ts-display.dom';
import {AlignOptions, DetrendingType, NormalisationOptions, TSSort} from '../ts-data-dom';


describe('TSFetcher', () => {

  let tsDataService;
  let service: TSFetcher;

  beforeEach(() => {

    tsDataService = jasmine.createSpyObj('TSDataService', [
      'loadDataSet'
    ]);

    tsDataService.loadDataSet.and.returnValue(throwError('mock service not initialized'));

    service = new TSFetcher(tsDataService, true);
  });

  it('complies', () => {

    expect(service).toBeTruthy();
  });

  it('emits errors in errors stream', fakeAsync(() => {

    let set: TimeSeriesPack;
    let error;
    let errors;

    const assay = { id: 12} as ExperimentalAssayView;

    service.seriesPackStream.subscribe( d => {
        set = d;
      },
      err => error = err
    );

    service.error$.subscribe( err => {
      errors = err;
    });

    service.experiment(assay);


    tick();


    expect(error).toBeUndefined();

    expect(set).toBeDefined();
    expect(set.data).toEqual([]);
    expect(errors).toEqual('mock service not initialized');

  }));

  it('emits empty set on first subscrptions', fakeAsync(() => {

    let set: TimeSeriesPack;
    let error;


    service.seriesPackStream.subscribe( d => {
        set = d;
      },
      err => error = err
    );

    tick();


    expect(error).toBeUndefined();

    expect(set).toBeDefined();
    expect(set.data).toEqual([]);

  }));

  it('emits data set on experiment', fakeAsync(() => {

    let set: TimeSeriesPack;
    let error;
    let errors;

    const assay = { id: 12} as ExperimentalAssayView;

    service.seriesPackStream.subscribe( d => {
        set = d;
      },
      err => error = err
    );

    service.error$.subscribe( err => {
      errors = err;
    });

    // tslint:disable-next-line:max-line-length
    const resp: TraceSet = {title: null, traces: [{label: '1.[B2] label0', fill: false, data: [{x: 0.0, y: 0.6601664510356472}, {x: 1.0, y: 0.6457065838504816}, {x: 2.0, y: 0.5562073136309738}, {x: 3.0, y: 0.9154962961556643}, {x: 4.0, y: 0.525271594883056}], min: 0.525271594883056, max: 0.9154962961556643, mean: 0.6605696479111645}, {label: '2.[C2] label0', fill: false, data: [{x: 0.0, y: 0.261667957678592}, {x: 1.0, y: 0.2784320544123843}, {x: 2.0, y: 0.42835207355286326}, {x: 3.0, y: 0.35304368617291276}, {x: 4.0, y: 0.22436214179832786}], min: 0.22436214179832786, max: 0.42835207355286326, mean: 0.30917158272301604}], totalTraces: 2,
      currentPage: {pageIndex: 0, pageSize: 100, length: 0, previousPageIndex: 0}, detrending: DetrendingType.LIN_DTR, sort: {} as TSSort};

    tsDataService.loadDataSet.and.returnValue(of(resp));
    service.experiment(assay);


    tick();

    expect(error).toBeUndefined();
    expect(errors).toBeUndefined();

    expect(set).toBeDefined();
    expect(set.data.length).toEqual(2);

  }));

  it('does not emits on same parameters', fakeAsync(() => {

    let set: TimeSeriesPack;
    let error;
    let errors;

    const assay = { id: 12} as ExperimentalAssayView;

    service.seriesPackStream.subscribe( d => {
        set = d;
      },
      err => error = err
    );

    service.error$.subscribe( err => {
      errors = err;
    });

    // tslint:disable-next-line:max-line-length
    const resp: TraceSet = {title: null, traces: [{label: '1.[B2] label0', fill: false, data: [{x: 0.0, y: 0.6601664510356472}, {x: 1.0, y: 0.6457065838504816}, {x: 2.0, y: 0.5562073136309738}, {x: 3.0, y: 0.9154962961556643}, {x: 4.0, y: 0.525271594883056}], min: 0.525271594883056, max: 0.9154962961556643, mean: 0.6605696479111645}, {label: '2.[C2] label0', fill: false, data: [{x: 0.0, y: 0.261667957678592}, {x: 1.0, y: 0.2784320544123843}, {x: 2.0, y: 0.42835207355286326}, {x: 3.0, y: 0.35304368617291276}, {x: 4.0, y: 0.22436214179832786}], min: 0.22436214179832786, max: 0.42835207355286326, mean: 0.30917158272301604}], totalTraces: 2,
      currentPage: {pageIndex: 0, pageSize: 100, length: 0, previousPageIndex: 0}, detrending: DetrendingType.LIN_DTR, sort: {} as TSSort};

    tsDataService.loadDataSet.and.returnValue(of(resp));
    service.experiment(assay);

    const p = new DisplayParameters(0, 0, DetrendingType.LIN_DTR,
      NormalisationOptions[0].name, AlignOptions[0].name, DisplayParameters.firstPage());

    service.changeDisplayParams(p);

    tick();

    expect(error).toBeUndefined();
    expect(errors).toBeUndefined();
    expect(set).toBeDefined();


    set = undefined;


    service.changeDisplayParams(p);
    tick();
    expect(set).toBeUndefined();

    p.page.pageIndex++;

    service.changeDisplayParams(p);
    tick();
    expect(set).toBeDefined();

    set = undefined;
    service.changeDisplayParams(p);
    tick();
    expect(set).toBeUndefined();

    p.detrending = DetrendingType.NO_DTR;
    service.changeDisplayParams(p);
    tick();
    expect(set).toBeDefined();

    set = undefined;
    service.changeDisplayParams(p);
    tick();
    expect(set).toBeUndefined();

    p.normalisation = NormalisationOptions[1].name;
    service.changeDisplayParams(p);
    tick();
    expect(set).toBeDefined();
  }));

  it('makes log2Data if asked', ()=>{

    // tslint:disable-next-line:max-line-length
    const traces = [{label: '1.[B2] label0', fill: false, data: [{x: 0.0, y: 0.6601664510356472}, {x: 1.0, y: 0.6457065838504816}, {x: 2.0, y: 0.5562073136309738}, {x: 3.0, y: 0.9154962961556643}, {x: 4.0, y: 0.525271594883056}], min: 0.525271594883056, max: 0.9154962961556643, mean: 0.6605696479111645}, {label: '2.[C2] label0', fill: false, data: [{x: 0.0, y: 0.261667957678592}, {x: 1.0, y: 0.2784320544123843}, {x: 2.0, y: 0.42835207355286326}, {x: 3.0, y: 0.35304368617291276}, {x: 4.0, y: 0.22436214179832786}], min: 0.22436214179832786, max: 0.42835207355286326, mean: 0.30917158272301604}];

    const p = new DisplayParameters(0, 0, DetrendingType.LIN_DTR,
      NormalisationOptions[0].name, AlignOptions[0].name, DisplayParameters.firstPage(), false);

    // @ts-ignore
    let processed = service.logData(traces,p);
    expect(processed.length).toBe(traces.length);
    expect(processed[0]).toBe(traces[0]);
    expect(processed[1]).toBe(traces[1]);

    p.log2 = true;

    // @ts-ignore
    processed = service.logData(traces,p);
    expect(processed.length).toBe(traces.length);
    expect(processed[0]).not.toBe(traces[0]);
    expect(processed[1]).not.toBe(traces[1]);


  });

  it('logTrace preserves attributes', ()=>{
    const trace = new Trace();
    trace.label = 'x';
    trace.dataId = 2;
    trace.traceNr = 3;

    // @ts-ignore
    const logged = service.logTrace(trace);
    expect(logged).not.toBe(trace);
    expect(logged.label).toEqual('x');
    expect(logged.dataId).toBe(2);
    expect(logged.traceNr).toBe(3);
  });

  it('logTrace filters negative values and calcualtes log with shift', ()=>{
    const trace = new Trace();

    trace.data.push(new Timepoint(0,-1));
    trace.data.push(new Timepoint(1,0));
    trace.data.push(new Timepoint(2,-2));
    trace.data.push(new Timepoint(3,2));

    // @ts-ignore
    const logged = service.logTrace(trace);
    expect(logged.data.length).toBe(2);
    expect(logged.data[0].x).toBe(1);
    expect(logged.data[0].y).toBe(-6);

    expect(logged.data[1].x).toBe(3);
    expect(logged.data[1].y).toBe(Math.log2(2+0.015625));

  });

  it('logTrace updates minmax', ()=>{
    const trace = new Trace();

    trace.data.push(new Timepoint(0,-1));
    trace.data.push(new Timepoint(1,0));
    trace.data.push(new Timepoint(2,-2));
    trace.data.push(new Timepoint(3,2));

    // @ts-ignore
    const logged = service.logTrace(trace);
    expect(logged.min).toBe(-6);
    expect(logged.max).toEqual(1.0112272554232542);
    expect(logged.mean).toBe((-6+1.0112272554232542)/2);


  });

  it('normalizes to range positives', () => {
    const trace = new Trace();
    trace.data.push(new Timepoint(0, 0.5));
    trace.data.push(new Timepoint(1, 1));
    trace.data.push(new Timepoint(2, 3));
    trace.data.push(new Timepoint(3, 2.5));
    trace.data.push(new Timepoint(4, 3));
    trace.min = 0.5;
    trace.max = 3;
    trace.mean = 2;

    // @ts-ignore
    const res = service.normalizeTraceToRange(trace);
    expect(res.min).toBe(-1);
    expect(res.max).toBe(1/1.5);
    expect(res.mean).toBe(0);

    expect(res.data[0]).toEqual(new Timepoint(0, -1));
    expect(res.data[4]).toEqual(new Timepoint(4, 1/1.5));

  });

  it('normalizes to range negative', () => {
    const trace = new Trace();
    trace.data.push(new Timepoint(0, -2));
    trace.data.push(new Timepoint(1, 1));
    trace.data.push(new Timepoint(2, -1));
    trace.data.push(new Timepoint(3, 2));
    trace.min = -2;
    trace.max = 2;
    trace.mean = 0;

    // @ts-ignore
    const res = service.normalizeTraceToRange(trace);
    expect(res.min).toBe(-1);
    expect(res.max).toBe(1);
    expect(res.mean).toBe(0);

    expect(res.data[0]).toEqual(new Timepoint(0, -1));
    expect(res.data[2]).toEqual(new Timepoint(2, -0.5));
    expect(res.data[3]).toEqual(new Timepoint(3, 1));

  });

  it('normalizes to fold positives', () => {
    const trace = new Trace();
    trace.data.push(new Timepoint(0, 0.5));
    trace.data.push(new Timepoint(1, 1));
    trace.data.push(new Timepoint(2, 3));
    trace.data.push(new Timepoint(3, 2.5));
    trace.data.push(new Timepoint(4, 3));
    trace.min = 0.5;
    trace.max = 3;
    trace.mean = 2;

    // @ts-ignore
    const res = service.normalizeTraceToFoldChange(trace);
    expect(res.min).toBe(1);
    expect(res.max).toBe(6);
    expect(res.mean).toBe(4);

    expect(res.data[0]).toEqual(new Timepoint(0, 1));
    expect(res.data[4]).toEqual(new Timepoint(4, 6));

  });

  it('fold change is empty for non positive min', () => {
    const trace = new Trace();
    trace.data.push(new Timepoint(0, -2));
    trace.data.push(new Timepoint(1, 1));
    trace.data.push(new Timepoint(2, -1));
    trace.data.push(new Timepoint(3, 2));
    trace.min = -2;
    trace.max = 2;
    trace.mean = 0;

    // @ts-ignore
    const res = service.normalizeTraceToFoldChange(trace);
    expect(res.data).toEqual([]);
    expect(res.min).toEqual(NaN);
    expect(res.max).toEqual(NaN);
    expect(res.mean).toEqual(NaN);

  });

  it('normalizes to factor divides', () => {
    const trace = new Trace();
    trace.data.push(new Timepoint(0, -2));
    trace.data.push(new Timepoint(1, 1));
    trace.data.push(new Timepoint(2, -1));
    trace.data.push(new Timepoint(3, 3));
    trace.min = -2;
    trace.max = 3;
    trace.mean = 1/4;

    // @ts-ignore
    const res = service.normalizeTraceToFactor(trace,2);
    expect(res.min).toBe(-1);
    expect(res.max).toBe(1.5);
    expect(res.mean).toBe(0.5/4);

    expect(res.data[0]).toEqual(new Timepoint(0, -1));
    expect(res.data[2]).toEqual(new Timepoint(2, -0.5));
    expect(res.data[3]).toEqual(new Timepoint(3, 1.5));

  });

  it('normalizes to factor returns org if factor is zero', () => {
    const trace = new Trace();
    trace.data.push(new Timepoint(0, -2));
    trace.data.push(new Timepoint(1, 1));
    trace.data.push(new Timepoint(2, -1));
    trace.data.push(new Timepoint(3, 3));
    trace.min = -2;
    trace.max = 2;
    trace.mean = 1/4;

    // @ts-ignore
    const res = service.normalizeTraceToFactor(trace,0);
    expect(res).toBe(trace);

  });

  it('normalizes to Z-Score gives org if only one point', () => {
    const trace = new Trace();
    trace.data.push(new Timepoint(0, -2));

    // @ts-ignore
    const res = service.normalizeTraceToZScore(trace);
    expect(res).toBe(trace);

  });

  it('normalizes to Z-Score shifts by calculate mean and divides by std', () => {
    const trace = new Trace();
    trace.data.push(new Timepoint(0, 0));
    trace.data.push(new Timepoint(1, 2));
    trace.data.push(new Timepoint(2, 2));
    trace.data.push(new Timepoint(3, 4));

    // @ts-ignore
    const res = service.normalizeTraceToZScore(trace);


    const std = Math.sqrt((4+0+0+4)/3);
    expect(res.data[0]).toEqual(new Timepoint(0, -2/std));
    expect(res.data[2]).toEqual(new Timepoint(2, 0));
    expect(res.data[3]).toEqual(new Timepoint(3, 2/std));

    expect(res.min).toBe(-2/std);
    expect(res.max).toBe(2/std);
    expect(res.mean).toBe(0);

  });
});

