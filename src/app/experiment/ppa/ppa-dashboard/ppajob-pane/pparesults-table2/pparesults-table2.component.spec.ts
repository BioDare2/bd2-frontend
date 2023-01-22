import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {PPAResultsTable2Component} from './pparesults-table2.component';
import {PPAService} from '../../../ppa.service';
import {MaterialsModule} from '../../../../../shared/materials.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PPADialogsService} from '../../../ppa-dialogs/ppadialogs.service';

describe('PPAResultsTable2Component', () => {
  let ppaService: PPAService;

  let component: PPAResultsTable2Component;
  let fixture: ComponentFixture<PPAResultsTable2Component>;

  beforeEach(waitForAsync(() => {
    ppaService = jasmine.createSpyObj('ppaService', ['getPPAJob']);

    TestBed.configureTestingModule({
      imports: [MaterialsModule, NoopAnimationsModule],
      declarations: [ PPAResultsTable2Component ],
      providers: [
        {provide: PPAService, useValue: ppaService},
        PPADialogsService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPAResultsTable2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
