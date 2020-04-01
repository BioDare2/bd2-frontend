import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ShutdownEventsService } from './shutdown-events.service';
import {of} from 'rxjs';

describe('ShutdownEventsService', () => {
  let service: ShutdownEventsService;
  let BD2REST;
  let feedback;

  beforeEach(() => {

    BD2REST = jasmine.createSpyObj('BioDareRestService', ['shutdownStatus']);
    feedback = jasmine.createSpyObj('FeedbackService', ['error']);

    // set the value to return when the `getValue` spy is called.
    const stubValue = 'stub value';
    BD2REST.shutdownStatus.and.returnValue(of({}));

    service = new ShutdownEventsService(BD2REST, feedback);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('cals backend to get status', () =>{
    const calls = BD2REST.shutdownStatus.calls.count();
    service.getStatus();
    expect(BD2REST.shutdownStatus.calls.count()).toBe(calls+1);
  });

  it('handleStatus sends error on msg', () => {

    expect(feedback.error.calls.count()).toBe(0);
    service.handleStatus(undefined);
    expect(feedback.error.calls.count()).toBe(0);
    service.handleStatus('txt');
    expect(feedback.error.calls.mostRecent().args).toEqual(['txt']);

  });

  it('handleStatus sets shutdwon status', () => {

    expect(service.isShuttingDown).toBe(false);
    service.handleStatus('err');
    expect(service.isShuttingDown).toBe(true);
    service.handleStatus('err');
    expect(service.isShuttingDown).toBe(true);
    service.handleStatus(undefined);
    expect(service.isShuttingDown).toBe(false);

  });

  it('startChecking checks at given intervals', fakeAsync(() =>{
    service.ngOnDestroy();
    const calls = BD2REST.shutdownStatus.calls.count();
    service.startChecking(1);
    tick(500);
    expect(BD2REST.shutdownStatus.calls.count()).toBe(calls);
    tick(600);
    expect(BD2REST.shutdownStatus.calls.count()).toBe(calls+1);
    tick(1100);
    expect(BD2REST.shutdownStatus.calls.count()).toBe(calls+2);
    service.ngOnDestroy();
  }));


});
