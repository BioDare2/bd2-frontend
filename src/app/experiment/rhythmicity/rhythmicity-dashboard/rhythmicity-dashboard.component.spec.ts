import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {RhythmicityDashboardComponent} from './rhythmicity-dashboard.component';
import {ExperimentsTestToolModule} from '../../experiment_test_tool.spec';
import {MaterialsModule} from '../../../shared/materials.module';
import {RhythmicityJobPaneComponentTestModule} from './rhythmicity-job-pane/rhythmicity-job-pane.component.spec';


describe('RhythmicityDashboardComponent', () => {
  let component: RhythmicityDashboardComponent;
  let fixture: ComponentFixture<RhythmicityDashboardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RhythmicityDashboardComponent],
      imports: [ExperimentsTestToolModule, MaterialsModule,
        RhythmicityJobPaneComponentTestModule
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
