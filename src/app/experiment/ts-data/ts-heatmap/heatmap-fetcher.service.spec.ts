import { TestBed } from '@angular/core/testing';

import { HeatmapFetcher} from './heatmap-fetcher.service';
import {Timepoint, Trace} from '../../../tsdata/plots/ts-plot.dom';
import {throwError} from 'rxjs';

describe('HeatmapFetcher', () => {
  let service: HeatmapFetcher;
  let tsDataService;

  beforeEach(() => {

    tsDataService = jasmine.createSpyObj('TSDataService', [
      'loadBinnedDataSet'
    ]);

    tsDataService.loadBinnedDataSet.and.returnValue(throwError('mock service not initialized'));
    service = new HeatmapFetcher(tsDataService, true);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('normalizes to range positives', () => {
    const trace = new Trace();
    trace.data.push(new Timepoint(0, 0.5));
    trace.data.push(new Timepoint(1, 1));
    trace.data.push(new Timepoint(2, 3));
    trace.data.push(new Timepoint(3, 2.5));
    trace.data.push(new Timepoint(4, 3));
    trace.min = 0.5;
    trace.max = 3;
    trace.mean = 2;

    // @ts-ignore
    const res = service.normalizeTraceToRange(trace);
    expect(res.min).toBe(-1);
    expect(res.max).toBe(1/1.5);
    expect(res.mean).toBe(0);

    expect(res.data[0]).toEqual(new Timepoint(0, -1));
    expect(res.data[4]).toEqual(new Timepoint(4, 1/1.5));

  });

  it('normalizes to range negative', () => {
    const trace = new Trace();
    trace.data.push(new Timepoint(0, -2));
    trace.data.push(new Timepoint(1, 1));
    trace.data.push(new Timepoint(2, -1));
    trace.data.push(new Timepoint(3, 2));
    trace.min = -2;
    trace.max = 2;
    trace.mean = 0;

    // @ts-ignore
    const res = service.normalizeTraceToRange(trace);
    expect(res.min).toBe(-1);
    expect(res.max).toBe(1);
    expect(res.mean).toBe(0);

    expect(res.data[0]).toEqual(new Timepoint(0, -1));
    expect(res.data[2]).toEqual(new Timepoint(2, -0.5));
    expect(res.data[3]).toEqual(new Timepoint(3, 1));

  });

  it('normalizes to fold positives', () => {
    const trace = new Trace();
    trace.data.push(new Timepoint(0, 0.5));
    trace.data.push(new Timepoint(1, 1));
    trace.data.push(new Timepoint(2, 3));
    trace.data.push(new Timepoint(3, 2.5));
    trace.data.push(new Timepoint(4, 3));
    trace.min = 0.5;
    trace.max = 3;
    trace.mean = 2;

    // @ts-ignore
    const res = service.normalizeTraceToFoldChange(trace);
    expect(res.min).toBe(1);
    expect(res.max).toBe(6);
    expect(res.mean).toBe(4);

    expect(res.data[0]).toEqual(new Timepoint(0, 1));
    expect(res.data[4]).toEqual(new Timepoint(4, 6));

  });

  it('normalizes to fold negative', () => {
    const trace = new Trace();
    trace.data.push(new Timepoint(0, -2));
    trace.data.push(new Timepoint(1, 1));
    trace.data.push(new Timepoint(2, -1));
    trace.data.push(new Timepoint(3, 2));
    trace.min = -2;
    trace.max = 2;
    trace.mean = 0;

    // @ts-ignore
    const res = service.normalizeTraceToFoldChange(trace);
    expect(res.min).toBe(1);
    expect(res.max).toBe(5);
    expect(res.mean).toBe(3);

    expect(res.data[0]).toEqual(new Timepoint(0, 1));
    expect(res.data[2]).toEqual(new Timepoint(2, 2));
    expect(res.data[3]).toEqual(new Timepoint(3, 5));

  });

});
