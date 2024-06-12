import {TestBed} from '@angular/core/testing';

import {PPADialogsService} from './ppadialogs.service';
import {MatLegacyDialogModule as MatDialogModule} from '@angular/material/legacy-dialog';

describe('PPADialogsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MatDialogModule],
    providers: [PPADialogsService]
  }));

  it('should be created', () => {
    const service: PPADialogsService = TestBed.inject(PPADialogsService);
    expect(service).toBeTruthy();
  });
});
