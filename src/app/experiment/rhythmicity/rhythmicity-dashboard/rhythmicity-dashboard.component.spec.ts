import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RhythmicityDashboardComponent} from './rhythmicity-dashboard.component';
import {ExperimentsTestToolModule} from '../../experiment_test_tool.spec';

describe('RhythmicityDashboardComponent', () => {
  let component: RhythmicityDashboardComponent;
  let fixture: ComponentFixture<RhythmicityDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RhythmicityDashboardComponent],
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
