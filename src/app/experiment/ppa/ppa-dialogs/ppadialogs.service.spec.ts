import { TestBed } from '@angular/core/testing';

import { PPADialogsService } from './ppadialogs.service';

describe('PPADialogsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PPADialogsService = TestBed.get(PPADialogsService);
    expect(service).toBeTruthy();
  });
});
