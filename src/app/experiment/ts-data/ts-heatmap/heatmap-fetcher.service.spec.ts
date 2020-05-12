import {HeatmapFetcher} from './heatmap-fetcher.service';
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



});
