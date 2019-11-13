import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RhythmicityDashboardComponent} from './rhythmicity-dashboard.component';
import {ExperimentsTestToolModule} from '../../experiment_test_tool.spec';
import {RhythmicityJobPaneComponent} from './rhythmicity-job-pane/rhythmicity-job-pane.component';
import {PValueFormComponent} from './rhythmicity-job-pane/pvalue-form/pvalue-form.component';
import {RhythmicityResultsMDTableComponent} from './rhythmicity-job-pane/rhythmicity-results-mdtable/rhythmicity-results-mdtable.component';
import {
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSlideToggleModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';

describe('RhythmicityDashboardComponent', () => {
  let component: RhythmicityDashboardComponent;
  let fixture: ComponentFixture<RhythmicityDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RhythmicityDashboardComponent, RhythmicityJobPaneComponent, PValueFormComponent,
        RhythmicityResultsMDTableComponent],
      imports: [ExperimentsTestToolModule,
        MatRadioModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatCardModule,
        MatDividerModule
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
