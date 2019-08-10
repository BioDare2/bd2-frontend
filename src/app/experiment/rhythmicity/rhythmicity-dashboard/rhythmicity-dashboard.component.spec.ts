import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RhythmicityDashboardComponent} from './rhythmicity-dashboard.component';
import {ExperimentsTestToolModule} from '../../experiment_test_tool.spec';
import {RhythmicityJobPaneComponent} from './rhythmicity-job-pane/rhythmicity-job-pane.component';
import {PValueFormComponent} from './rhythmicity-job-pane/pvalue-form/pvalue-form.component';
import {RhythmicityResultsTableComponent} from './rhythmicity-job-pane/rhythmicity-results-table/rhythmicity-results-table.component';

describe('RhythmicityDashboardComponent', () => {
  let component: RhythmicityDashboardComponent;
  let fixture: ComponentFixture<RhythmicityDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RhythmicityDashboardComponent, RhythmicityJobPaneComponent, PValueFormComponent, RhythmicityResultsTableComponent],
      imports: [ExperimentsTestToolModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RhythmicityDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
