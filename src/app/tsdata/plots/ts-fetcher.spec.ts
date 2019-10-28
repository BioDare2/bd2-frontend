import {of, throwError} from 'rxjs';
import {TSDataService} from '../ts-data.service';
import {TimeSeriesPack, TSFetcher} from './ts-fetcher';
import {fakeAsync, flushMicrotasks, tick} from '@angular/core/testing';
import {ExperimentalAssayView} from '../../dom/repo/exp/experimental-assay-view';
import {TraceSet} from './ts-plot.dom';
import {DisplayParameters} from './ts-display.dom';
import {AlignOptions, DetrendingType, NormalisationOptions} from '../ts-data-dom';



fdescribe('TSFetcher', () => {

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

    const resp: TraceSet = {title: null, traces: [{label: '1.[B2] label0', fill: false, data: [{x: 0.0, y: 0.6601664510356472}, {x: 1.0, y: 0.6457065838504816}, {x: 2.0, y: 0.5562073136309738}, {x: 3.0, y: 0.9154962961556643}, {x: 4.0, y: 0.525271594883056}], min: 0.525271594883056, max: 0.9154962961556643, mean: 0.6605696479111645}, {label: '2.[C2] label0', fill: false, data: [{x: 0.0, y: 0.261667957678592}, {x: 1.0, y: 0.2784320544123843}, {x: 2.0, y: 0.42835207355286326}, {x: 3.0, y: 0.35304368617291276}, {x: 4.0, y: 0.22436214179832786}], min: 0.22436214179832786, max: 0.42835207355286326, mean: 0.30917158272301604}], totalTraces: 2,
      currentPage: {pageIndex: 0, pageSize: 100, length: 0, previousPageIndex: 0}};

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

    const resp: TraceSet = {title: null, traces: [{label: '1.[B2] label0', fill: false, data: [{x: 0.0, y: 0.6601664510356472}, {x: 1.0, y: 0.6457065838504816}, {x: 2.0, y: 0.5562073136309738}, {x: 3.0, y: 0.9154962961556643}, {x: 4.0, y: 0.525271594883056}], min: 0.525271594883056, max: 0.9154962961556643, mean: 0.6605696479111645}, {label: '2.[C2] label0', fill: false, data: [{x: 0.0, y: 0.261667957678592}, {x: 1.0, y: 0.2784320544123843}, {x: 2.0, y: 0.42835207355286326}, {x: 3.0, y: 0.35304368617291276}, {x: 4.0, y: 0.22436214179832786}], min: 0.22436214179832786, max: 0.42835207355286326, mean: 0.30917158272301604}], totalTraces: 2,
      currentPage: {pageIndex: 0, pageSize: 100, length: 0, previousPageIndex: 0}};

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

});

