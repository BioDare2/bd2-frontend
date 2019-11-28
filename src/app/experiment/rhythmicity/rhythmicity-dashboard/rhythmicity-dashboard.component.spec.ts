import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RhythmicityDashboardComponent} from './rhythmicity-dashboard.component';
import {ExperimentsTestToolModule} from '../../experiment_test_tool.spec';
import {RhythmicityJobPaneComponent} from './rhythmicity-job-pane/rhythmicity-job-pane.component';
import {PValueFormComponent} from './rhythmicity-job-pane/pvalue-form/pvalue-form.component';
import {RhythmicityResultsMDTableComponent} from './rhythmicity-job-pane/rhythmicity-results-mdtable/rhythmicity-results-mdtable.component';
import {MaterialsModule} from "../../../shared/materials.module";


describe('RhythmicityDashboardComponent', () => {
  let component: RhythmicityDashboardComponent;
  let fixture: ComponentFixture<RhythmicityDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RhythmicityDashboardComponent, RhythmicityJobPaneComponent, PValueFormComponent,
        RhythmicityResultsMDTableComponent],
      imports: [ExperimentsTestToolModule, MaterialsModule
      ]
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
