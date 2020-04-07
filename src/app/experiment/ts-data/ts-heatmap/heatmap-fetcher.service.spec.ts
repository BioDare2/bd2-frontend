import { TestBed } from '@angular/core/testing';

import { HeatmapFetcher} from './heatmap-fetcher.service';

describe('HeatmapFetcher', () => {
  let service: HeatmapFetcher;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeatmapFetcher);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
