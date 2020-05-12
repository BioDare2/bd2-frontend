import {fakeAsync, TestBed, tick} from '@angular/core/testing';
import {of, throwError} from 'rxjs';
import {PPAService} from '../../../ppa.service';
import {Sort} from '@angular/material/sort';
import {PPAGroupResultsFetcherService} from './ppagroupresults-fetcher.service';
import {PPAJobSummary, PPAResultsGroupSummary} from '../../../ppa-dom';
import {makePPAGroupResults} from './ppa-test-data.spec';

describe('PPAGroupResultsFetcherService', () => {
  let ppaService;
  let service: PPAGroupResultsFetcherService;

  beforeEach(() => {

    ppaService = jasmine.createSpyObj('PPAService', [
      'getPPAJob', 'getPPAJobResultsGrouped'
    ]);

    ppaService.getPPAJob.and.returnValue(throwError('mock service not initialized'));

    service = new PPAGroupResultsFetcherService(ppaService, true);
  });

  it('should be created', () => {
    TestBed.configureTestingModule({providers: [
        PPAGroupResultsFetcherService,
        {provide: PPAService, useValue: ppaService}]}
    );
    const service1: PPAGroupResultsFetcherService = TestBed.inject(PPAGroupResultsFetcherService);
    expect(service1).toBeTruthy();

    expect(service).toBeTruthy();
  });

  it('sortingKey gets correct extractor', () => {


    const res =       {
        memberDataId: 4,
        rawId: 4,
        bioId: 3,
        envId: 3,
        label: '22 0.5',
        failures: 0,
        excluded: 0,
        periods: [
          22.14,
          22.04
        ],
        phases2Z: {
          m: [
            21.92,
            21.92
          ],
          f: [
            21.92,
            21.92
          ],
          p: [
            20.9,
            20.2
          ],
          a: [
            20.59,
            20.79
          ]
        },
        phases2W: {
          m: [
            21.92,
            21.92
          ],
          f: [
            21.92,
            21.92
          ],
          p: [
            20.9,
            20.2
          ],
          a: [
            20.59,
            20.79
          ]
        },
        phases2ZCir: {
          m: [
            23.76,
            23.87
          ],
          f: [
            23.76,
            23.87
          ],
          p: [
            22.66,
            22.0
          ],
          a: [
            22.32,
            22.64
          ]
        },
        phases2WCir: {
          m: [
            23.76,
            23.87
          ],
          f: [
            23.76,
            23.87
          ],
          p: [
            22.66,
            22.0
          ],
          a: [
            22.32,
            22.64
          ]
        },
        amps: {
          m: [
            2.43,
            2.71
          ],
          f: [
            2.43,
            2.71
          ],
          p: [
            3.942,
            4.713
          ],
          a: [
            3.782,
            4.355
          ]
        }
      } as PPAResultsGroupSummary;

    let sort: Sort = {active: 'label', direction: 'asc'};
    // @ts-ignore
    let ext = service.sortingKey(sort);
    expect(ext(res)).toEqual('22 0.5');

    sort = {active: 'period', direction: 'asc'};
    // @ts-ignore
    ext = service.sortingKey(sort);
    expect(ext(res)).toEqual(22.14);

  });

  it('sortingKey for period caches results', () => {

    const res = new PPAResultsGroupSummary();
    res.periods = [1, 3, 4];

    const sort = {active: 'period', direction: 'asc'};
    // @ts-ignore
    const ext = service.sortingKey(sort);
    expect(ext(res)).toEqual(3);

    res.periods = [2];
    expect(ext(res)).toEqual(3);

    res.periods = [];
    expect(ext(res)).toEqual(3);
  });

  it('fetchAsset copies job min max if not present', fakeAsync( () => {

    const groups = makePPAGroupResults();
    groups.groups[0].jobPeriodMin = undefined;
    groups.groups[0].jobPeriodMax = undefined;

    groups.groups[1].jobPeriodMin = 20;
    groups.groups[1].jobPeriodMax = 30;

    groups.periodMin = 18;
    groups.periodMax = 35;

    ppaService.getPPAJobResultsGrouped.and.returnValue(of(groups));

    const job = new PPAJobSummary();
    job.jobId = '1';
    job.parentId = 2;

    let val;

    // @ts-ignore
    service.fetchAsset(job).subscribe( res => val = res);
    tick();

    expect(val).toBeDefined();
    expect(val.groups[0].jobPeriodMin).toBe(18);
    expect(val.groups[0].jobPeriodMax).toBe(35);

    expect(val.groups[1].jobPeriodMin).toBe(20);
    expect(val.groups[1].jobPeriodMax).toBe(30);

  }));



});
