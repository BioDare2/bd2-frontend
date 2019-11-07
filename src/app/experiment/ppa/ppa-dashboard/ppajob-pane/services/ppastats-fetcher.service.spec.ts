import { TestBed } from '@angular/core/testing';

import { PPAStatsFetcherService } from './ppastats-fetcher.service';
import {PPAJobFetcherService} from "./ppajob-fetcher.service";
import {throwError} from "rxjs";
import {PPAService} from "../../../ppa.service";

fdescribe('PPAStatsFetcherService', () => {

  let ppaService;
  let service: PPAStatsFetcherService;

  beforeEach(() => {

    ppaService = jasmine.createSpyObj('PPAService', [
      'getPPAJob'
    ]);

    ppaService.getPPAJob.and.returnValue(throwError('mock service not initialized'));

    service = new PPAStatsFetcherService(ppaService, true);
  });

  it('should be created', () => {
    TestBed.configureTestingModule({providers: [
        PPAStatsFetcherService,
        {provide: PPAService, useValue: ppaService}]}
    );
    const service1: PPAJobFetcherService = TestBed.get(PPAStatsFetcherService);
    expect(service1).toBeTruthy();

    expect(service).toBeTruthy();
  });

});
