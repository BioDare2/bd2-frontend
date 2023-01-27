import {TestBed} from '@angular/core/testing';

import {StaticContentDialogService} from './static-content-dialog.service';
import {MatDialogModule} from '@angular/material/dialog';

describe('StaticContentDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MatDialogModule]
  }));

  it('should be created', () => {
    const service: StaticContentDialogService = TestBed.inject(StaticContentDialogService);
    expect(service).toBeTruthy();
  });
});
