import { TestBed } from '@angular/core/testing';

import { PPADialogsService } from './ppadialogs.service';
import {MatDialogModule} from '@angular/material';

describe('PPADialogsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [MatDialogModule],
    providers: [PPADialogsService]
  }));

  it('should be created', () => {
    const service: PPADialogsService = TestBed.get(PPADialogsService);
    expect(service).toBeTruthy();
  });
});
