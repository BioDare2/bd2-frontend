import {TestBed} from '@angular/core/testing';

import {RhythmicityService} from './rhythmicity.service';
import {BioDareRestService} from '../../backend/biodare-rest.service';
import {fakeBioDareRestService} from '../../backend/biodare-rest_test_tool.spec';

describe('RhythmicityService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: BioDareRestService, useValue: fakeBioDareRestService()}
    ]
  }));

  it('should be created', () => {
    const service: RhythmicityService = TestBed.inject(RhythmicityService);
    expect(service).toBeTruthy();
  });
});
