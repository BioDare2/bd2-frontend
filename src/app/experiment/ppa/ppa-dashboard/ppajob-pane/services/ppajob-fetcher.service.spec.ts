import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {PPAJobFetcherService} from './ppajob-fetcher.service';
import {of, throwError} from 'rxjs';

import {PPAService} from '../../../ppa.service';
import {PPAJobSummary} from '../../../ppa-dom';


describe('PPAJobFetcherService', () => {

  let ppaService;
  let service: PPAJobFetcherService;

  beforeEach(() => {

    ppaService = jasmine.createSpyObj('PPAService', [
      'getPPAJob'
    ]);

    ppaService.getPPAJob.and.returnValue(throwError('mock service not initialized'));

    service = new PPAJobFetcherService(ppaService, true);
  });

  it('should be created', () => {
    TestBed.configureTestingModule({providers: [
      PPAJobFetcherService,
      {provide: PPAService, useValue: ppaService}]}
    );
    const service1: PPAJobFetcherService = TestBed.get(PPAJobFetcherService);
    expect(service1).toBeTruthy();

    expect(service).toBeTruthy();
  });

  it('loadJob loads job using the service updating the status', fakeAsync( () => {

    let val;
    let error1;
    let error2;
    let running;

    service.allJob$.subscribe( j => val = j, err => error1 = err);
    service.error$.subscribe( err => error2 = err);
    service.isReloading$.subscribe(v => running = v);

    // @ts-ignore
    service.loadAsset([12, 34]);
    tick();
    expect(val).toBeUndefined();
    expect(error1).toBeUndefined();
    expect(error2).toEqual('mock service not initialized');
    expect(running).toBe(false);

    error2 = undefined;
    const job = new PPAJobSummary();
    job.jobId = 34;
    job.state = 'SUBMITTED';
    ppaService.getPPAJob.and.returnValue(of(job));

    // @ts-ignore
    service.loadAsset([12, 34]);
    tick();
    expect(val).toBe(job);
    expect(error1).toBeUndefined();
    expect(error2).toBeUndefined();

    expect(service.currentAssayJobId).toEqual([12, 34]);
    expect(service.currentJob).toBe(job);
    expect(running).toBe(true);

    // @ts-ignore
    expect(service.reloadSubscription).toBeTruthy();
    // @ts-ignore
    service.reloadSubscription.unsubscribe();


  }));

  it('loadJob loads job using the service updating the status2', fakeAsync( () => {

    let val;
    let error1;
    let error2;
    let running;

    service.allJob$.subscribe( j => val = j, err => error1 = err);
    service.error$.subscribe( err => error2 = err);
    service.isReloading$.subscribe(v => running = v);

    // @ts-ignore
    service.loadAsset([12, 34]);
    tick();
    expect(val).toBeUndefined();
    expect(error1).toBeUndefined();
    expect(error2).toEqual('mock service not initialized');
    expect(running).toBe(false);

    error2 = undefined;
    const job = new PPAJobSummary();
    job.jobId = 34;
    job.state = 'FINISHED';
    ppaService.getPPAJob.and.returnValue(of(job));

    // @ts-ignore
    service.loadAsset([12, 340]);
    tick();
    expect(val).toBe(job);
    expect(error1).toBeUndefined();
    expect(error2).toBeUndefined();

    expect(service.currentAssayJobId).toEqual([12, 340]);
    expect(service.currentJob).toBe(job);
    expect(running).toBe(false);


  }));

  it('loadJob sets missing parentId', fakeAsync( () => {

    let val;
    let error1;

    service.allJob$.subscribe( j => val = j, err => error1 = err);

    const job = new PPAJobSummary();
    job.state = 'SUBMITTED';
    ppaService.getPPAJob.and.returnValue(of(job));

    // @ts-ignore
    service.loadAsset([12, 34]);
    tick();
    expect(val).toBe(job);
    expect(job.parentId).toBe(12);

    // @ts-ignore
    service.loadAsset([13, 34]);
    tick();
    expect(val).toBe(job);
    expect(job.parentId).toBe(12);

  }));

  it('initAssetsInput gives ids only on ON and valid ids', fakeAsync( () => {

    let val;
    let error;

    // @ts-ignore
    service.initAssetsInput().subscribe( ids => val = ids, err => error = err );

    expect(val).toBeUndefined();
    expect(error).toBeUndefined();

    service.assayJobId(undefined);
    tick();
    expect(val).toBeUndefined();
    expect(error).toBeUndefined();

    service.assayJobId([] as any);
    tick();
    expect(val).toBeUndefined();
    expect(error).toBeUndefined();

    service.assayJobId([0] as any);
    tick();
    expect(val).toBeUndefined();
    expect(error).toBeUndefined();

    service.assayJobId([12, 34]);
    tick();
    expect(val).toBeUndefined();
    expect(error).toBeUndefined();

    service.on(true);
    tick();
    expect(val).toEqual([12, 34]);
    expect(error).toBeUndefined();

    service.assayJobId([120, 340]);
    tick();
    expect(val).toEqual([120, 340]);
    expect(error).toBeUndefined();

    val = undefined;
    service.on(false);
    service.assayJobId([1200, 3400]);
    tick();
    expect(val).toBeUndefined();
    expect(error).toBeUndefined();

  }));

  it('initAssetsInput gives only distinct ids', fakeAsync( () => {

    let val = [1, 1];
    let error;

    // @ts-ignore
    service.initAssetsInput().subscribe( ids => val = ids, err => error = err );
    service.on(true);

    tick();
    expect(val).toEqual([1, 1]);
    expect(error).toBeUndefined();


    service.assayJobId([12, 34]);
    tick();
    expect(val).toEqual([12, 34]);
    expect(error).toBeUndefined();

    val = undefined;
    service.assayJobId([12, 34]);
    tick();
    expect(val).toBeUndefined();
    expect(error).toBeUndefined();

    service.assayJobId([12, 340]);
    tick();
    expect(val).toEqual([12, 340]);
    expect(error).toBeUndefined();

    service.assayJobId([12, 341]);
    tick();
    expect(val).toEqual([12, 341]);
    expect(error).toBeUndefined();

    val = undefined;
    service.assayJobId([12, 341]);
    tick();
    expect(val).toBeUndefined();
    expect(error).toBeUndefined();

    service.assayJobId([1, 341]);
    tick();
    expect(val).toEqual([1, 341]);
    expect(error).toBeUndefined();

  }));

  it('initAssetsInput gives last on refresh', fakeAsync( () => {

    let val = [1, 1];
    let error;

    // @ts-ignore
    service.initAssetsInput().subscribe( ids => val = ids, err => error = err );
    service.on(true);

    tick();
    expect(val).toEqual([1, 1]);
    expect(error).toBeUndefined();

    service.refresh();
    tick();
    expect(val).toEqual([1, 1]);
    expect(error).toBeUndefined();

    service.assayJobId([12, 34]);
    tick();

    val = undefined;

    service.refresh();
    tick();
    expect(val).toEqual([12, 34]);
    expect(error).toBeUndefined();

    val = undefined;
    service.refresh();
    tick();
    expect(val).toEqual([12, 34]);
    expect(error).toBeUndefined();

    service.assayJobId([120, 34]);
    tick();
    service.refresh();
    tick();
    expect(val).toEqual([120, 34]);
    expect(error).toBeUndefined();

  }));


});
