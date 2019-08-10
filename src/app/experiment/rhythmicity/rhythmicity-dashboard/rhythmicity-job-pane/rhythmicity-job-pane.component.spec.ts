import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RhythmicityJobPaneComponent } from './rhythmicity-job-pane.component';
import {ExperimentsTestToolModule} from '../../../experiment_test_tool.spec';
import {StaticContentTestModule} from '../../../../documents/static-content_test_tool.spec';
import {PValueFormComponent} from './pvalue-form/pvalue-form.component';
import {RhythmicityResultsTableComponent} from './rhythmicity-results-table/rhythmicity-results-table.component';

describe('RhythmicityJobPaneComponent', () => {
  let component: RhythmicityJobPaneComponent;
  let fixture: ComponentFixture<RhythmicityJobPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RhythmicityJobPaneComponent, PValueFormComponent, RhythmicityResultsTableComponent ],
      imports: [ExperimentsTestToolModule, StaticContentTestModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RhythmicityJobPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
