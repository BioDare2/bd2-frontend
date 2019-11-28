import {BD2eJTKRes, JobResults, JTKPattern, TSResult} from '../../rhythmicity-dom';
import {of} from 'rxjs';
import {RhythmicityResultsMDTableDataSource} from './rhythmicity-results-mdtable-datasource';
import {Sort} from '@angular/material/sort';

describe('RhythmicityResultsMDTableDataSource', () => {

  let results: TSResult<BD2eJTKRes>[];
  let jobRes: JobResults<BD2eJTKRes>;
  let rhythmicityService;
  // let job$: Subject<[ExperimentalAssayView, RhythmicityJobSummary]>;

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
    res.empPBH = 2 * res.empP;
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
    res.empPBH = 2 * res.empP;
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
    res.empPBH = 2 * res.empP;
    res.pattern = new JTKPattern();
    res.pattern.period = 24;
    res.pattern.peak = 27.13;
    res.pattern.waveform = 'ASYM_COS';
    results.push(tsRes);

    rhythmicityService = jasmine.createSpyObj('RhythmicityService', [
      'getResults'
    ]);

    // job$ = new Subject<[ExperimentalAssayView, RhythmicityJobSummary]>();

    service = new RhythmicityResultsMDTableDataSource(rhythmicityService, true);

  });

  it('should compile', () => {
    expect(results.length).toBe(3);
    expect(jobRes).toBeTruthy();
    expect(jobRes.results).toBe(results);
    // expect(job$).toBeTruthy();
    expect(rhythmicityService).toBeTruthy();

    expect(service).toBeTruthy();
  });


  it('sortingKey gets correct extractor', () => {

    const tsRes = new TSResult<BD2eJTKRes>();
    tsRes.id = 3;
    tsRes.label = 'bMiddle';
    tsRes.result = new BD2eJTKRes();
    const res = tsRes.result;
    res.empP = 0.01;
    res.empPBH = 2 * res.empP;
    res.pattern = new JTKPattern();
    res.pattern.period = 24;
    res.pattern.peak = 25.11;
    res.pattern.waveform = 'ASYM_COS';

    const sort: Sort = {
      active: 'id',
      direction: 'asc'
    };

    // @ts-ignore
    let ext = service.sortingKey(sort);
    expect(ext(tsRes)).toBe(3);

    sort.active = 'label';
    // @ts-ignore
    ext = service.sortingKey(sort);
    expect(ext(tsRes)).toBe('bMiddle');

    sort.active = 'empp';
    // @ts-ignore
    ext = service.sortingKey(sort);
    expect(ext(tsRes)).toBe(0.01);
  });


  it('fetchAsset calls service', () => {

    rhythmicityService.getResults.and.returnValue(of(jobRes));

    let res;
    // @ts-ignore
    service.fetchAsset({jobId: '1', parentId: 2}).subscribe(r => res = r);

    expect(res).toBe(jobRes);
  });

  it('fetchAsset labels patterns', () => {

    rhythmicityService.getResults.and.returnValue(of(jobRes));

    expect(jobRes.results[0].result.patternLabel).toBeUndefined();
    let res;
    // @ts-ignore
    service.fetchAsset({jobId: '1', parentId: 2}).subscribe(r => res = r);

    expect(res).toBe(jobRes);
    expect(jobRes.results[0].result.patternLabel).toBeDefined();
  });

  it('pValue emits input params', () => {


    const res = [];
    // @ts-ignore
    service.params$.subscribe(r => res.push(r));

    expect(res).toEqual([undefined]);

    service.pvalue(0.1);
    expect(res).toEqual([undefined, [0.1, undefined]]);
  });

  it('bhCorrection emits input params', () => {


    const res = [];
    // @ts-ignore
    service.params$.subscribe(r => res.push(r));

    expect(res).toEqual([undefined]);

    service.bhCorrection(true);
    expect(res).toEqual([undefined, [undefined, true]]);
  });

  it('rankResults ranks by pavalues', () => {

    // @ts-ignore
    service.rankResults(jobRes.results, 0.01, false);
    expect(jobRes.results.map(res => res.result.rhythmic)).toEqual([false, true, true]);

    // @ts-ignore
    service.rankResults(jobRes.results, 0.001, false);
    expect(jobRes.results.map(res => res.result.rhythmic)).toEqual([false, false, true]);
  });

  it('rankResults ranks by corrected pavalues', () => {

    // @ts-ignore
    service.rankResults(jobRes.results, 0.02, false);
    expect(jobRes.results.map(res => res.result.rhythmic)).toEqual([true, true, true]);

    // @ts-ignore
    service.rankResults(jobRes.results, 0.02, true);
    expect(jobRes.results.map(res => res.result.rhythmic)).toEqual([false, true, true]);

  });


  it('labelPatterns labels', () => {

    // @ts-ignore
    service.labelPatterns(jobRes);
    expect(jobRes.results.map(res => res.result.patternLabel)).toEqual([
      'ASYM_COS 24:25.1', 'ASYM_COS 24:26.1', 'ASYM_COS 24:27.1']);

  });




});
