import {TestBed} from '@angular/core/testing';

import {PPAResultsFetcherService} from './pparesults-fetcher.service';
import {throwError} from 'rxjs';
import {PPAService} from '../../../ppa.service';
import {PPASimpleResultEntry,} from '../../../ppa-dom';
import {LegacyPageEvent as PageEvent} from '@angular/material/legacy-paginator';
import {Sort} from '@angular/material/sort';
import {makePPASimpleResults,} from './ppa-test-data.spec';

describe('PPAResultsFetcherService', () => {
  let ppaService;
  let service: PPAResultsFetcherService;

  beforeEach(() => {

    ppaService = jasmine.createSpyObj('PPAService', [
      'getPPAJob'
    ]);

    ppaService.getPPAJob.and.returnValue(throwError('mock service not initialized'));

    service = new PPAResultsFetcherService(ppaService, true);
  });

  it('should be created', () => {
    TestBed.configureTestingModule({providers: [
        PPAResultsFetcherService,
        {provide: PPAService, useValue: ppaService}]}
    );
    const service1: PPAResultsFetcherService = TestBed.inject(PPAResultsFetcherService);
    expect(service1).toBeTruthy();

    expect(service).toBeTruthy();
  });

  it('sortingKey gets correct extractor', () => {

    const stat =     {
        jobId: '866',
        dataId: 1,
        rawId: 1,
        bioId: 1,
        envId: 1,
        orgId: 'B2',
        dataRef: '1. [B2]',
        label: 'noise',
        message: null,
        ignored: true,
        circadian: true,
        attention: false,
        failed: false,
        ERR: 0.95,
        GOF: 0.92,
        dType: 'LIN_DTR',
        summary: null,
        per: 26.65,
        perE: 2.2,
        ph2Z: {
          m: 18.39,
          f: 18.38,
          p: 22.9,
          a: 18.1
        },
        ph2W: {
          m: 18.39,
          f: 18.38,
          p: 22.9,
          a: 18.1
        },
        ph2ZCir: {
          m: 16.56,
          f: 16.55,
          p: 20.62,
          a: 16.3
        },
        ph2WCir: {
          m: 16.56,
          f: 16.55,
          p: 20.62,
          a: 16.3
        },
        phE: 5.3,
        phECir: 4.77,
        amp: {
          m: 0.41,
          f: 0.4,
          p: 1.62,
          a: 1.41
        },
        ampE: 0.385934
      } as PPASimpleResultEntry;


    let sort: Sort = {active: 'label', direction: 'asc'};
    // @ts-ignore
    let ext = service.sortingKey(sort);
    expect(ext(stat)).toEqual('noise');

    sort = {active: 'period', direction: 'asc'};
    // @ts-ignore
    ext = service.sortingKey(sort);
    expect(ext(stat)).toEqual(26.65);

    sort = {active: 'id', direction: 'asc'};
    // @ts-ignore
    ext = service.sortingKey(sort);
    expect(ext(stat)).toEqual(1);

    sort = {active: 'state', direction: 'asc'};
    // @ts-ignore
    ext = service.sortingKey(sort);
    expect(ext(stat)).toEqual(' I');

    sort = {active: 'unknown', direction: 'asc'};
    // @ts-ignore
    ext = service.sortingKey(sort);
    expect(ext(stat)).toEqual(0);



  });

  it('sortingKey handles NaN as last', () => {

    const stat = new PPASimpleResultEntry();

    const sort = {active: 'period', direction: 'asc'};
    // @ts-ignore
    const ext = service.sortingKey(sort);

    stat.per = 'NaN' as any;
    expect(ext(stat)).toEqual(Number.MAX_VALUE);

    stat.per = Number.NaN;
    expect(ext(stat)).toEqual(Number.MAX_VALUE);

  });

  it('sorts preserves the original if applied', () => {

    const asset = makePPASimpleResults().results;

    const orgOrder = asset.map( s => s.dataId);


    let sort: Sort;

    // @ts-ignore
    let sorted = service.sortData(asset, sort);
    expect(sorted).toBe(asset);


    sort = {active: 'label', direction: 'asc'};

    // @ts-ignore
    sorted = service.sortData(asset, sort);
    expect(sorted).not.toBe(asset);

    const sortedOrder = sorted.map( s => s.dataId);
    const currentOrder = asset.map( s => s.dataId);

    expect(sortedOrder).not.toEqual(orgOrder);
    expect(currentOrder).toEqual(orgOrder);

  });

  it('sorts by period', () => {

    const asset = makePPASimpleResults().results;

    const orgOrder = asset.map( s => s.dataId);


    const sort =  {active: 'period', direction: 'asc'};

    // @ts-ignore
    const sorted = service.sortData(asset, sort);
    expect(sorted).not.toBe(asset);

    const periods: any[] = sorted.map(s => s.per);
    const expP = [
      0,
      2.83,
      21.85,
      21.97,
      22.02,
      23.81,
      24.49,
      26.65,
    ];
    expect(periods).toEqual(expP);

  });

  it('page preserves original if applied', () => {

    const asset = makePPASimpleResults().results;

    const orgOrder = asset.map( s => s.dataId);


    let page: PageEvent;

    // @ts-ignore
    let paged = service.pageData(asset, page);
    expect(paged).toBe(asset);


    page = new PageEvent();
    page.pageIndex = 1;
    page.pageSize = 2;

    // @ts-ignore
    paged = service.pageData(asset, page);
    expect(paged).not.toBe(asset);

    const currentOrder = asset.map( s => s.dataId);
    expect(currentOrder).toEqual(orgOrder);

    expect(paged.length).toEqual(2);
    expect(paged.length).toBeLessThan(asset.length);

  });

  it('page pages', () => {

    const asset = makePPASimpleResults().results;

    const orgOrder = asset.map( s => s.dataId);



    let page = new PageEvent();
    page.pageIndex = 0;
    page.pageSize = 3;

    // @ts-ignore
    let paged = service.pageData(asset, page);
    let currentOrder = paged.map( s => s.dataId);
    let exp = [ orgOrder[0], orgOrder[1], orgOrder[2]];
    expect(currentOrder).toEqual(exp);


    page = new PageEvent();
    page.pageIndex = 1;
    page.pageSize = 2;

    // @ts-ignore
    paged = service.pageData(asset, page);
    currentOrder = paged.map( s => s.dataId);

    exp = [ orgOrder[2], orgOrder[3]];
    expect(currentOrder).toEqual(exp);

    page = new PageEvent();
    page.pageIndex = 10;
    page.pageSize = 20;

    // @ts-ignore
    paged = service.pageData(asset, page);
    currentOrder = paged.map( s => s.dataId);

    exp = [];
    expect(currentOrder).toEqual(exp);

  });


});
