

import { DataJobsService } from './data-jobs.service';
import {of, throwError} from 'rxjs';
import {RhythmicityService} from '../rhythmicity/rhythmicity.service';
import {PPAService} from '../ppa/ppa.service';
import {fakeAsync, tick} from '@angular/core/testing';
import {PPAJobSummary} from '../ppa/ppa-dom';
import {ExperimentalAssayView} from '../../dom/repo/exp/experimental-assay-view';
import {JobStatus, RhythmicityJobSummary} from '../rhythmicity/rhythmicity-dom';

describe('DataJobsService', () => {
  let service: DataJobsService;
  let rhythmicityService: jasmine.SpyObj<RhythmicityService>;
  let ppaService: jasmine.SpyObj<PPAService>;
  let exp: ExperimentalAssayView;
  beforeEach(() => {

    rhythmicityService = jasmine.createSpyObj('RhythmicityService', [
      'getJobs','isFinished'
    ]);
    rhythmicityService.getJobs.and.returnValue(throwError('mock service not initialized'));
    rhythmicityService.isFinished.and.callFake( (job: RhythmicityJobSummary) => job.jobStatus.state === 'FINISHED');

    ppaService = jasmine.createSpyObj('PPAService', [
      'getPPAJobs','isFinished'
    ]);
    ppaService.getPPAJobs.and.returnValue(throwError('mock service not initialized'));
    ppaService.isFinished.and.callFake( (job: PPAJobSummary) => job.state === 'FINISHED');

    service = new DataJobsService(ppaService, rhythmicityService);

    exp = new ExperimentalAssayView();
    exp.id = 123;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  function ppaJobs() {
    const jobs = [];

    let job = new PPAJobSummary();
    job.jobId = '34';
    job.state = 'FINISHED';
    job.method = 'NLLS';
    jobs.push(job);

    job = new PPAJobSummary();
    job.jobId = '35';
    job.state = 'SUBMITTED';
    job.method = 'MESA';
    jobs.push(job);

    job = new PPAJobSummary();
    job.jobId = '36';
    job.state = 'FINISHED';
    job.method = 'MESA';
    jobs.push(job);
    return jobs;
  }

  it('fetchPPA emits only finished jobs from the service', fakeAsync(()=>{
    const alljobs = ppaJobs();
    ppaService.getPPAJobs.and.returnValue(of(alljobs));

    let res;

    service.ppaJobs$.subscribe(jobs => res = jobs);

    tick();
    expect(res).toEqual([]);

    // @ts-ignore
    service.fetchPPA(exp);
    tick();

    expect(res.length).toBe(2);
    expect(res.map(j => j.jobId)).toEqual(['34', '36']);
  }));

  it('fetchPPA filters allowedMethodsIfProvided', fakeAsync(()=>{
    const alljobs = ppaJobs();
    ppaService.getPPAJobs.and.returnValue(of(alljobs));

    let res;

    service.ppaJobs$.subscribe(jobs => res = jobs);

    // @ts-ignore
    service.fetchPPA(exp);
    tick();

    expect(res.length).toBe(2);

    service.allowedPPAMethods = ['MESA'];
    // @ts-ignore
    service.fetchPPA(exp);
    tick();

    expect(res.length).toBe(1);
    expect(res.map(j => j.jobId)).toEqual(['36']);

  }));

  it('fetchPPA emits empty on error', fakeAsync(()=>{

    let res;
    let err;

    service.ppaJobs$.subscribe(jobs => res = jobs);
    service.error$.subscribe( error => err = error);

    tick();
    expect(res).toEqual([]);
    res = undefined;

    // @ts-ignore
    service.fetchPPA(exp);
    tick();
    expect(res).toEqual([]);
    expect(err).toEqual('mock service not initialized');



  }));

  function rhythmJobs() {
    const jobs = [];

    let job = new RhythmicityJobSummary();
    job.jobId = 'a';
    job.jobStatus = new JobStatus()
    job.jobStatus.state = 'FINISHED';
    job.parameters = {METHOD: 'BD2EJTK'};
    jobs.push(job);

    job = new RhythmicityJobSummary();
    job.jobId = 'b';
    job.jobStatus = new JobStatus()
    job.jobStatus.state = 'SUBMITTED';
    job.parameters = {METHOD: 'BD2EJTK'};
    jobs.push(job);

    job = new RhythmicityJobSummary();
    job.jobId = 'c';
    job.jobStatus = new JobStatus()
    job.jobStatus.state = 'FINISHED';
    job.parameters = {METHOD: 'BD2JTK'};
    jobs.push(job);
    return jobs;
  }

  it('fetchRhythm emits only finished jobs from the service', fakeAsync(()=>{
    const alljobs = rhythmJobs();
    rhythmicityService.getJobs.and.returnValue(of(alljobs));

    let res;

    service.rhythmJobs$.subscribe(jobs => res = jobs);

    tick();
    expect(res).toEqual([]);

    // @ts-ignore
    service.fetchRhythm(exp);
    tick();

    expect(res.length).toBe(2);
    expect(res.map(j => j.jobId)).toEqual(['a', 'c']);
  }));

  it('fetchRhythm filters allowedMethodsIfProvided', fakeAsync(()=>{
    const alljobs = rhythmJobs();
    rhythmicityService.getJobs.and.returnValue(of(alljobs));

    let res;

    service.rhythmJobs$.subscribe(jobs => res = jobs);

    // @ts-ignore
    service.fetchRhythm(exp);
    tick();

    expect(res.length).toBe(2);
    expect(res.map(j => j.jobId)).toEqual(['a', 'c']);

    service.allowedRhythmMethods = ['BD2EJTK']
    // @ts-ignore
    service.fetchRhythm(exp);
    tick();
    expect(res.length).toBe(1);
    expect(res.map(j => j.jobId)).toEqual(['a']);

  }));

  it('fetchRhythm emits empty on error', fakeAsync(()=>{

    let res;
    let err;

    service.rhythmJobs$.subscribe(jobs => res = jobs);
    service.error$.subscribe( error => err = error);

    tick();
    expect(res).toEqual([]);
    res = undefined;

    // @ts-ignore
    service.fetchRhythm(exp);
    tick();
    expect(res).toEqual([]);
    expect(err).toEqual('mock service not initialized');



  }));

});
