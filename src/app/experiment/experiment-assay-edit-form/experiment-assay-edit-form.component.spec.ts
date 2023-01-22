import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ExperimentsTestToolModule} from '../experiment_test_tool.spec';
import {ExperimentAssayEditFormComponent} from './experiment-assay-edit-form.component';

describe('ExperimentAssayEditFormComponent', () => {
  let component: ExperimentAssayEditFormComponent;
  let fixture: ComponentFixture<ExperimentAssayEditFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ExperimentAssayEditFormComponent
      ],
      imports: [ExperimentsTestToolModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentAssayEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
