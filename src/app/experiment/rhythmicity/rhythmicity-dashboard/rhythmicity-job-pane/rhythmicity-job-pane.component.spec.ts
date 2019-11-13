import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RhythmicityJobPaneComponent} from './rhythmicity-job-pane.component';
import {ExperimentsTestToolModule} from '../../../experiment_test_tool.spec';
import {StaticContentTestModule} from '../../../../documents/static-content_test_tool.spec';
import {PValueFormComponent} from './pvalue-form/pvalue-form.component';
import {RhythmicityResultsMDTableComponent} from './rhythmicity-results-mdtable/rhythmicity-results-mdtable.component';
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

describe('RhythmicityJobPaneComponent', () => {
  let component: RhythmicityJobPaneComponent;
  let fixture: ComponentFixture<RhythmicityJobPaneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RhythmicityJobPaneComponent, PValueFormComponent,
        RhythmicityResultsMDTableComponent],
      imports: [ExperimentsTestToolModule, StaticContentTestModule,
        MatRadioModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        MatCardModule,
        MatDividerModule]
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
