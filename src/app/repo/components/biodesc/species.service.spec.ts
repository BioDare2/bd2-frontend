import {TestBed} from '@angular/core/testing';
import {SpeciesService} from './species.service';

describe('SpeciesService', () => {
  let service: SpeciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: []
    });

    service = TestBed.get(SpeciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
