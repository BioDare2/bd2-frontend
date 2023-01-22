import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ExperimentsTestToolModule} from '../experiment_test_tool.spec';
import {ExperimentAssayOverviewComponent} from './experiment-assay-overview.component';

describe('ExperimentAssayOverviewComponent', () => {
  let component: ExperimentAssayOverviewComponent;
  let fixture: ComponentFixture<ExperimentAssayOverviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExperimentAssayOverviewComponent
      ],
      imports: [ExperimentsTestToolModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentAssayOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
