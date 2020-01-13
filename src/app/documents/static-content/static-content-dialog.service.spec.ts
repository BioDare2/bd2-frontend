import { TestBed } from '@angular/core/testing';

import { StaticContentDialogService } from './static-content-dialog.service';

describe('StaticContentDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StaticContentDialogService = TestBed.get(StaticContentDialogService);
    expect(service).toBeTruthy();
  });
});
