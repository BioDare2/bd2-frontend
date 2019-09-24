import {BD2eJTKRes, JobResults, JobStatus, JTKPattern, RhythmicityJobSummary, TSResult} from '../../../rhythmicity-dom';
import {Observable, of, Subject, throwError} from 'rxjs';
import {ExperimentalAssayView} from '../../../../../dom/repo/exp/experimental-assay-view';
import {RhythmicityResultsMDTableDataSource} from './rhythmicity-results-mdtable-datasource';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import {fakeAsync, tick} from '@angular/core/testing';

describe('RhythmicityResultsMDTableDataSource', () => {

  let results: TSResult<BD2eJTKRes>[];
  let jobRes: JobResults<BD2eJTKRes>;
  let rhythmicityService;
  let job$: Subject<[ExperimentalAssayView, RhythmicityJobSummary]>;

  let service: RhythmicityResultsMDTableDataSource;

  beforeEach(() => {
    jobRes = new JobResults<BD2eJTKRes>();
    jobRes.UUID = '123';

    results = jobRes.results;

    let tsRes = new TSResult<BD2eJTKRes>();
    tsRes.id = 3;
    tsRes.label = 'bMiddle';
    tsRes.result = new BD2eJTKRes();
    let res = tsRes.result;
    res.empP = 0.01;
    res.pattern = new JTKPattern();
    res.pattern.period = 24;
    res.pattern.peak = 25.11;
    res.pattern.waveform = 'ASYM_COS';
    results.push(tsRes);

    tsRes = new TSResult<BD2eJTKRes>();
    tsRes.id = 2;
    tsRes.label = 'aFirst';
    tsRes.result = new BD2eJTKRes();
    res = tsRes.result;
    res.empP = 0.001;
    res.pattern = new JTKPattern();
    res.pattern.period = 24;
    res.pattern.peak = 26.12;
    res.pattern.waveform = 'ASYM_COS';
    results.push(tsRes);

    tsRes = new TSResult<BD2eJTKRes>();
    tsRes.id = 1;
    tsRes.label = 'cLast';
    tsRes.result = new BD2eJTKRes();
    res = tsRes.result;
    res.empP = 0.0001;
    res.pattern = new JTKPattern();
    res.pattern.period = 24;
    res.pattern.peak = 27.13;
    res.pattern.waveform = 'ASYM_COS';
    results.push(tsRes);

    rhythmicityService = jasmine.createSpyObj('RhythmicityService', [
      'getResults'
    ]);

    job$ = new Subject<[ExperimentalAssayView, RhythmicityJobSummary]>();

    service = new RhythmicityResultsMDTableDataSource(job$, rhythmicityService);

  });

  it('should compile', () => {
    expect(results.length).toBe(3);
    expect(jobRes).toBeTruthy();
    expect(jobRes.results).toBe(results);
    expect(job$).toBeTruthy();
    expect(rhythmicityService).toBeTruthy();

    expect(service).toBeTruthy();
  });


  it('getSortedSorts', () => {
    const sort: Sort = {
      active: 'id',
      direction: 'asc'
    };

    let toSort = results.slice();

    // @ts-ignore
    let res = service.getSortedData(toSort, sort);
    expect(res.map(r => r.id)).toEqual([1, 2, 3]);

    toSort = results.slice();
    sort.active = 'label';
    // @ts-ignore
    res = service.getSortedData(toSort, sort);
    expect(res.map(r => r.label)).toEqual(['aFirst', 'bMiddle', 'cLast']);

    toSort = results.slice();
    sort.active = 'empp';
    // @ts-ignore
    res = service.getSortedData(toSort, sort);
    expect(res.map(r => r.result.empP)).toEqual([0.0001, 0.001, 0.01]);
  });

  it('getPagedData makes new page from input', () => {
    const page = new PageEvent();
    page.pageSize = 1;
    page.pageIndex = 0;

    let toPage = results.slice();
    // @ts-ignore
    let res = service.getPagedData(toPage, page);
    expect(res).not.toBe(toPage);
    expect(res).toEqual([toPage[0]]);

    toPage = results.slice();
    page.pageIndex = 2;
    // @ts-ignore
    res = service.getPagedData(toPage, page);
    expect(res).not.toBe(toPage);
    expect(res).toEqual([toPage[2]]);

    toPage = results.slice();
    page.pageIndex = 0;
    page.pageSize = 5;
    // @ts-ignore
    res = service.getPagedData(toPage, page);
    expect(res).not.toBe(toPage);
    expect(res).toEqual(toPage);
  });

  it('loadResults calls service', () => {

    rhythmicityService.getResults.and.returnValue(of(jobRes));

    let res;
    // @ts-ignore
    service.loadResults({id: 1}, {id: 2}).subscribe(r => res = r);

    expect(res).toBe(jobRes);
  });

  it('loadResults gives empyt on error', () => {

    const obs = throwError('cannot connect');
    rhythmicityService.getResults.and.returnValue(obs);

    let res;
    let err;
    // @ts-ignore
    service.loadResults({id: 1}, {id: 2}).subscribe(r => res = r, e => err = e);

    // tick not needed
    // tick();
    expect(err).toBeUndefined();
    expect(res).toBeTruthy();
    expect(res.results).toEqual([]);
  });

  it('rankResults ranks by pavalues', () => {

    // @ts-ignore
    service.rankResults(jobRes, 0.01);
    expect(jobRes.results.map(res => res.result.rhythmic)).toEqual([false, true, true]);

    // @ts-ignore
    service.rankResults(jobRes, 0.001);
    expect(jobRes.results.map(res => res.result.rhythmic)).toEqual([false, false, true]);
  });

  it('labelPatterns labels', () => {

    // @ts-ignore
    service.labelPatterns(jobRes);
    expect(jobRes.results.map(res => res.result.patternLabel)).toEqual([
      'ASYM_COS 24:25.1', 'ASYM_COS 24:26.1', 'ASYM_COS 24:27.1']);

  });

  it('initData gives observable that fetches from the service, labels, and ranks', fakeAsync(() => {

    rhythmicityService.getResults.and.returnValue(of(jobRes));

    const job = new RhythmicityJobSummary();
    job.jobStatus = new JobStatus();
    job.jobStatus.state = 'SUCCESS';
    job.jobId = '123';

    const assay = {id: 2} as ExperimentalAssayView;

    const data$ = service.initData(job$);

    let data: TSResult<BD2eJTKRes>[];
    let err;

    data$.subscribe(d => data = d, e => err = e);

    tick();
    expect(data).toBeUndefined();
    expect(err).toBeUndefined();

    // works without ticks why?
    job$.next([assay, job]);
    service.on$.next(true);

    expect(data).toBe(jobRes.results);
    expect(err).toBeUndefined();
    // cause the pvalue emits 0 to start with
    expect(data.map(r => r.result.rhythmic)).toEqual([false, false, false]);

    service.pvalue$.next(0.5);
    expect(data).toBe(jobRes.results);
    expect(err).toBeUndefined();
    expect(data.map(r => r.result.rhythmic)).toEqual([true, true, true]);

    expect(data).toBe(service.data);
    expect(service.dataLength).toBe(3);
  }));

  it('initData gives observable that fetches from the service only when on', fakeAsync(() => {



    const job = new RhythmicityJobSummary();
    job.jobStatus = new JobStatus();
    job.jobStatus.state = 'SUCCESS';
    job.jobId = '123';

    const assay = {id: 2} as ExperimentalAssayView;

    const data$ = service.initData(job$);

    let data: TSResult<BD2eJTKRes>[];
    let err;

    data$.subscribe(d => data = d, e => err = e);

    rhythmicityService.getResults.and.returnValue(throwError('Should not be called'));
    // works without ticks why?
    job$.next([assay, job]);

    expect(data).toBeUndefined();
    expect(err).toBeUndefined();

    rhythmicityService.getResults.and.returnValue(of(jobRes));
    service.on$.next(true);

    tick();

    expect(data).toBe(jobRes.results);
    expect(err).toBeUndefined();

  }));


  it('connect gives observable that responses to page and sort', fakeAsync(() => {

    rhythmicityService.getResults.and.returnValue(of(jobRes));

    const job = new RhythmicityJobSummary();
    job.jobStatus = new JobStatus();
    job.jobStatus.state = 'SUCCESS';
    job.jobId = '123';

    const assay = {id: 2} as ExperimentalAssayView;

    const data$ = service.connect();

    let data: TSResult<BD2eJTKRes>[];
    let err;

    data$.subscribe(d => data = d, e => err = e);

    tick();
    expect(data).toBeUndefined();
    expect(err).toBeUndefined();

    job$.next([assay, job]);
    service.on$.next(true);

    tick();
    // as no page no sorting
    expect(data).toEqual([]);
    expect(err).toBeUndefined();

    const sort: Sort = {
      active: 'id',
      direction: 'asc'
    };

    service.pvalue$.next(0.5);
    service.sort$.next(sort);

    tick();
    // as no page
    expect(data).toEqual([]);
    expect(err).toBeUndefined();

    const page = new PageEvent();
    page.pageSize = 5;
    page.pageIndex = 0;

    service.page$.next(page);
    tick();
    expect(err).toBeUndefined();
    expect(data).toEqual(jobRes.results);
    expect(data.map(r => r.id)).toEqual([1, 2, 3]);


  }));

});
