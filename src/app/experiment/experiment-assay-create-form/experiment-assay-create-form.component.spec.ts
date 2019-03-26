import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ExperimentAssayCreateFormComponent} from './experiment-assay-create-form.component';
import {ExperimentsTestToolModule} from '../experiment_test_tool.spec';

describe('ExperimentAssayCreateFormComponent', () => {
  let component: ExperimentAssayCreateFormComponent;
  let fixture: ComponentFixture<ExperimentAssayCreateFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExperimentAssayCreateFormComponent],
      imports: [ExperimentsTestToolModule],
      providers: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentAssayCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
