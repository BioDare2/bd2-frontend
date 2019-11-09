import { TestBed } from '@angular/core/testing';

import { PPAStatsFetcherService } from './ppastats-fetcher.service';
import {PPAJobFetcherService} from './ppajob-fetcher.service';
import {throwError} from 'rxjs';
import {PPAService} from '../../../ppa.service';
import {PPAJobSimpleStats, PPASimpleStats} from '../../../ppa-dom';
import {makePPAStats} from './ppa-test-data.spec';
import {PageEvent, Sort} from '@angular/material';

describe('PPAStatsFetcherService', () => {

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
    const service1: PPAStatsFetcherService = TestBed.get(PPAStatsFetcherService);
    expect(service1).toBeTruthy();

    expect(service).toBeTruthy();
  });

  it('sortingKey gets correct extractor', () => {

    const stat = new PPASimpleStats();
    stat.per = 20;
    stat.label = 'a';

    let sort: Sort = {active: 'label', direction: 'asc'};
    // @ts-ignore
    let ext = service.sortingKey(sort);
    expect(ext(stat)).toEqual('a');

    sort = {active: 'period', direction: 'asc'};
    // @ts-ignore
    ext = service.sortingKey(sort);
    expect(ext(stat)).toEqual(20);

    sort = {active: 'unknown', direction: 'asc'};
    // @ts-ignore
    ext = service.sortingKey(sort);
    expect(ext(stat)).toEqual(0);

    sort = {active: 'period', direction: 'asc'};
    stat.per = 'NaN' as any;
    // @ts-ignore
    ext = service.sortingKey(sort);
    expect(ext(stat)).toEqual(Number.MAX_VALUE);
    // expect(ext(stat)).toEqual(Number.NaN);
  });

  it('sortingKey handles NaN as last', () => {

    const stat = new PPASimpleStats();
    stat.per = 20;
    stat.label = 'a';



    const sort = {active: 'period', direction: 'asc'};
    // @ts-ignore
    let ext = service.sortingKey(sort);

    stat.per = 'NaN' as any;
    expect(ext(stat)).toEqual(Number.MAX_VALUE);

    stat.per = Number.NaN;
    expect(ext(stat)).toEqual(Number.MAX_VALUE);

  });

  it('sorts by label and period', () => {

      const stats = makePPAStats(123);

      const orgOrder = stats.stats.map( s => s.memberDataId);

      let sort: Sort = {active: 'label', direction: 'asc'};

      // @ts-ignore
      let sorted = service.sortAsset(stats, sort);

      const labels = sorted.stats.map( s => s.label);
      const exp = [
        'WT LHY',
        'WT PRR5',
        'WT PRR7',
        'WT PRR9',
        'WT TOC1',
        'WT XYZ',
        'prr79 LHY',
        'prr79 PRR5',
        'prr79 TOC1',
        'prr79 XYZ',
      ];

      expect(labels).toEqual(exp);

      sort = {active: 'period', direction: 'asc'};
      // @ts-ignore
      sorted = service.sortAsset(stats, sort);

      let periods: any[] = sorted.stats.map(s => s.per);
      let expP = [
        24.04,
        24.04,
        24.12,
        24.27,
        24.38,
        30.42,
        30.6,
        31,
        31.08,
        'NaN',
      ];

      // console.log(periods);
      expect(periods).toEqual(expP);

      sort = {active: 'period', direction: 'desc'};
      // @ts-ignore
      sorted = service.sortAsset(stats, sort);
      periods = sorted.stats.map(s => s.per);
      expP = expP.reverse();
      expect(periods).toEqual(expP);
  });

  it('sorts preserves the original if applied', () => {

    const stats = makePPAStats(123);

    const orgOrder = stats.stats.map( s => s.memberDataId);


    let sort: Sort;

    // @ts-ignore
    let sorted = service.sortAsset(stats, sort);
    expect(sorted).toBe(stats);


    sort = {active: 'label', direction: 'asc'};

    // @ts-ignore
    sorted = service.sortAsset(stats, sort);
    expect(sorted).not.toBe(stats);

    const sortedOrder = sorted.stats.map( s => s.memberDataId);
    const currentOrder = stats.stats.map( s => s.memberDataId);

    expect(sortedOrder).not.toEqual(orgOrder);
    expect(currentOrder).toEqual(orgOrder);

  });

  it('page preserves original if applied', () => {

    const stats = makePPAStats(123);

    const orgOrder = stats.stats.map( s => s.memberDataId);


    let page: PageEvent;

    // @ts-ignore
    let paged = service.pageAsset(stats, page);
    expect(paged).toBe(stats);


    page = new PageEvent();
    page.pageIndex = 1;
    page.pageSize = 2;

    // @ts-ignore
    paged = service.pageAsset(stats, page);
    expect(paged).not.toBe(stats);

    const currentOrder = stats.stats.map( s => s.memberDataId);
    expect(currentOrder).toEqual(orgOrder);

    expect(paged.stats.length).toEqual(2);
    expect(paged.stats.length).toBeLessThan(stats.stats.length);

  });

  it('page pages', () => {

    const stats = makePPAStats(123);

    const orgOrder = stats.stats.map( s => s.memberDataId);


    let page = new PageEvent();
    page.pageIndex = 0;
    page.pageSize = 3;

    // @ts-ignore
    let paged = service.pageAsset(stats, page);
    let currentOrder = paged.stats.map( s => s.memberDataId);
    let exp = [ orgOrder[0], orgOrder[1], orgOrder[2]];
    expect(currentOrder).toEqual(exp);


    page = new PageEvent();
    page.pageIndex = 1;
    page.pageSize = 2;

    // @ts-ignore
    paged = service.pageAsset(stats, page);
    currentOrder = paged.stats.map( s => s.memberDataId);

    exp = [ orgOrder[2], orgOrder[3]];
    expect(currentOrder).toEqual(exp);

    page = new PageEvent();
    page.pageIndex = 10;
    page.pageSize = 20;

    // @ts-ignore
    paged = service.pageAsset(stats, page);
    currentOrder = paged.stats.map( s => s.memberDataId);

    exp = [];
    expect(currentOrder).toEqual(exp);

  });


});
