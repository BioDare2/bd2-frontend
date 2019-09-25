import {RhythmicityJobDatasourceService} from './rhythmicity-job-datasource.service';
import {fakeAsync, tick} from '@angular/core/testing';
import {JobStatus, RhythmicityJobSummary} from '../../rhythmicity-dom';
import {ExperimentalAssayView} from '../../../../dom/repo/exp/experimental-assay-view';
import {EMPTY, of, throwError} from 'rxjs';

fdescribe('RhythmicityJobDatasourceService', () => {

  let rhythmicityService;
  let service: RhythmicityJobDatasourceService;

  beforeEach(() => {

    rhythmicityService = jasmine.createSpyObj('RhythmicityService', [
      'getJob'
    ]);

    rhythmicityService.getJob.and.returnValue(throwError('mock service not initialized'));

    service = new RhythmicityJobDatasourceService(rhythmicityService);
  });

  it('complies', () => {

    expect(service).toBeTruthy();
  });

  it('initJobs gives jobs that only emits when on', fakeAsync( () => {

    const assay = {id: 2} as ExperimentalAssayView;

    // @ts-ignore
    const job$ = service.initInputJobs();

    let val;
    let err;
    let iter = 0;

    job$.subscribe( v => {
      val = v;
      iter++;
    }, e => err = e);

    tick();
    expect(val).toBeUndefined();
    expect(err).toBeUndefined();

    service.assayJob([assay, '123']);
    tick();
    expect(val).toBeUndefined();
    expect(err).toBeUndefined();

    service.on(true);
    expect(val).toEqual([assay, '123']);
    expect(err).toBeUndefined();

    service.assayJob([assay, '124']);
    tick();
    expect(val).toEqual([assay, '124']);
    expect(err).toBeUndefined();

  }));

  it('initJobs gives only distinct jobs params', fakeAsync( () => {

    let assay = {id: 2} as ExperimentalAssayView;

    // @ts-ignore
    const job$ = service.initInputJobs();

    let val;
    let err;
    let iter = 0;

    service.on(true);

    job$.subscribe( v => {
      val = v;
      iter++;
    }, e => err = e);

    tick();
    expect(val).toBeUndefined();
    expect(err).toBeUndefined();

    service.assayJob([assay, '123']);
    tick();
    expect(val).toEqual([assay, '123']);
    expect(err).toBeUndefined();

    val = undefined;
    service.assayJob([assay, '123']);
    tick();
    expect(val).toBeUndefined();
    expect(err).toBeUndefined();

    assay = {id: 3} as ExperimentalAssayView;
    service.assayJob([assay, '123']);
    tick();
    expect(val).toEqual([assay, '123']);
    expect(err).toBeUndefined();

    val = undefined;
    service.assayJob([assay, '124']);
    tick();
    expect(val).toEqual([assay, '124']);
    expect(err).toBeUndefined();

  }));

  it('initJobs gives last job on refresh', fakeAsync( () => {

    const assay = {id: 2} as ExperimentalAssayView;

    // @ts-ignore
    const job$ = service.initInputJobs();

    let val;
    let err;
    let iter = 0;

    service.on(true);

    job$.subscribe(v => {
      val = v;
      iter++;
    }, e => err = e);

    tick();
    expect(val).toBeUndefined();
    expect(err).toBeUndefined();

    val = 1;
    service.refresh();
    tick();
    expect(val).toBe(1);
    expect(err).toBeUndefined();

    service.assayJob([assay, '123']);
    tick();
    expect(val).toEqual([assay, '123']);
    expect(err).toBeUndefined();

    val = undefined;
    service.refresh();
    tick();
    expect(val).toEqual([assay, '123']);
    expect(err).toBeUndefined();

  }));

  it('loadJob uses service to load job and emits it in allJobs streams', fakeAsync(() => {

    const assay = {id: 2} as ExperimentalAssayView;
    const job = new RhythmicityJobSummary();
    job.jobStatus = new JobStatus();
    job.jobStatus.state = 'SUCCESS';
    job.jobId = '123';

    let resJob;
    let resErr;
    let resIsRun;
    let err;

    service.allJob$.subscribe( v => resJob = v, e => err = e);
    service.error$.subscribe( v => resErr = v, e => err = e);
    service.isRunning$.subscribe( v => resIsRun = v, e => err = e);

    rhythmicityService.getJob.and.returnValue(of(job));

    // @ts-ignore
    service.loadJob([assay, job.jobId]);

    tick();
    expect(resJob).toBe(job);
    expect(resErr).toBeUndefined();
    expect(resIsRun).toEqual(false);
    expect(err).toBeUndefined();
    expect(service.currentJob).toBe(job);
    expect(service.currentAssay).toBe(assay);



  }));

  it('loadJob uses service to load job and emits if running', fakeAsync(() => {

    const assay = {id: 2} as ExperimentalAssayView;
    const job = new RhythmicityJobSummary();
    job.jobStatus = new JobStatus();
    job.jobStatus.state = 'SUCCESS';
    job.jobId = '123';

    let resJob;
    let resErr;
    let resIsRun;
    let err;

    service.allJob$.subscribe( v => resJob = v, e => err = e);
    service.error$.subscribe( v => resErr = v, e => err = e);
    service.isRunning$.subscribe( v => resIsRun = v, e => err = e);

    rhythmicityService.getJob.and.returnValue(of(job));

    // @ts-ignore
    service.loadJob([assay, job.jobId]);

    tick();
    expect(resIsRun).toEqual(false);
    expect(err).toBeUndefined();

    job.jobStatus.state = 'SUBMITTED';
    // @ts-ignore
    service.loadJob([assay, job.jobId]);

    tick();
    expect(resIsRun).toEqual(true);
    expect(err).toBeUndefined();

    // to clean reload timer
    rhythmicityService.getJob.and.returnValue(EMPTY);
    // @ts-ignore
    tick(service.RELOAD_INT);

  }));

  it('loadJob emits errors in the error stream', fakeAsync(() => {

    const assay = {id: 2} as ExperimentalAssayView;

    let resJob;
    let resErr;
    let resIsRun;
    let err;

    service.allJob$.subscribe( v => resJob = v, e => err = e);
    service.error$.subscribe( v => resErr = v, e => err = e);
    service.isRunning$.subscribe( v => resIsRun = v, e => err = e);

    rhythmicityService.getJob.and.returnValue(throwError('expected'));
    // @ts-ignore
    service.loadJob([assay, '1']);

    tick();
    expect(resJob).toBeFalsy();
    expect(resErr).toEqual('expected');
    expect(resIsRun).toEqual(false);
    expect(err).toBeUndefined();

  }));

  it('finishedJobs emits from allJobs', fakeAsync(() => {

    const job = new RhythmicityJobSummary();
    job.jobStatus = new JobStatus();
    job.jobStatus.state = 'SUCCESS';
    job.jobId = '123';

    let res;
    let err;

    service.finishedJob$.subscribe( v => res = v, e => err = e);


    // @ts-ignore
    service.job$.next(job);

    expect(res).toBe(job);
    expect(err).toBeUndefined();
  }));

  it('runningJobs emits from allJobs', fakeAsync(() => {

    const job = new RhythmicityJobSummary();
    job.jobStatus = new JobStatus();
    job.jobStatus.state = 'SUBMITTED';
    job.jobId = '123';

    let res;
    let err;

    service.runningJob$.subscribe( v => res = v, e => err = e);

    // @ts-ignore
    service.job$.next(job);

    expect(res).toBe(job);
    expect(err).toBeUndefined();

    // to clean reload timer
    rhythmicityService.getJob.and.returnValue(EMPTY);
    // @ts-ignore
    tick(service.RELOAD_INT);

  }));

  it('if job is not finished it attempts to load it again', fakeAsync(() => {

    const assay = {id: 2} as ExperimentalAssayView;

    const job = new RhythmicityJobSummary();
    job.jobStatus = new JobStatus();
    job.jobStatus.state = 'SUBMITTED';
    job.jobId = '123';

    let running;
    let finished;
    let err;

    service.runningJob$.subscribe( v => running = v, e => err = e);
    service.finishedJob$.subscribe( v => finished = v, e => err = e);

    rhythmicityService.getJob.and.returnValue(of(job));

    // @ts-ignore
    service.loadJob([assay, job.jobId]);

    tick();
    expect(running).toBe(job);
    expect(finished).toBeUndefined();
    expect(err).toBeUndefined();

    job.jobStatus.state = 'SUCCESS';
    running = undefined;
    // @ts-ignore
    tick(service.RELOAD_INT);
    expect(running).toBeUndefined();
    expect(finished).toBe(job);
    expect(err).toBeUndefined();
  }));
});
