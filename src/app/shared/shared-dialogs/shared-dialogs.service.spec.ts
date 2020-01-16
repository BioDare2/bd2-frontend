import {TestBed} from '@angular/core/testing';

import {SharedDialogsService} from './shared-dialogs.service';
import {MatDialogModule} from '@angular/material';

describe('SharedDialogsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MatDialogModule]
  }));

  it('should be created', () => {
    const service: SharedDialogsService = TestBed.get(SharedDialogsService);
    expect(service).toBeTruthy();
  });
});
