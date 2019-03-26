import {TestBed} from '@angular/core/testing';

import {ExperimentService} from './experiment.service';
import {BioDareRestService} from '../backend/biodare-rest.service';
import {fakeBioDareRestService} from '../backend/biodare-rest_test_tool.spec';

describe('ExperimentService', () => {
  let BD2REST: jasmine.SpyObj<BioDareRestService>;
  let service: ExperimentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        {provide: BioDareRestService, useValue: fakeBioDareRestService()}
      ]

    });

    service = TestBed.get(ExperimentService);
    BD2REST = TestBed.get(BioDareRestService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



});
