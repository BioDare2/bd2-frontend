import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExperimentsTestToolModule} from '../experiment_test_tool.spec';
import {ExperimentAssayEditFormComponent} from './experiment-assay-edit-form.component';

describe('ExperimentAssayEditFormComponent', () => {
  let component: ExperimentAssayEditFormComponent;
  let fixture: ComponentFixture<ExperimentAssayEditFormComponent>;

  beforeEach(async(() => {
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
