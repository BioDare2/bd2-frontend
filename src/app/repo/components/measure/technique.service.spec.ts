import {TestBed} from '@angular/core/testing';
import {TechniqueService} from './technique.service';

describe('TechniqueService', () => {
  let service: TechniqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: []
    });

    service = TestBed.get(TechniqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
