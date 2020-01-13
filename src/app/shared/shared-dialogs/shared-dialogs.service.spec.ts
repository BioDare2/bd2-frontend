import { TestBed } from '@angular/core/testing';

import { SharedDialogsService } from './shared-dialogs.service';

describe('SharedDialogsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SharedDialogsService = TestBed.get(SharedDialogsService);
    expect(service).toBeTruthy();
  });
});
