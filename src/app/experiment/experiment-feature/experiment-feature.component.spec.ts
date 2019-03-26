import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperimentFeatureComponent } from './experiment-feature.component';
import {ExperimentsTestToolModule} from '../experiment_test_tool.spec';
import {ExperimentNavigationComponent} from '../experiment-navigation.component';
import {ExperimentBasicInfoViewComponent} from '../experiment-basic-info-view.component';

describe('ExperimentFeatureComponent', () => {
  let component: ExperimentFeatureComponent;
  let fixture: ComponentFixture<ExperimentFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperimentFeatureComponent, ExperimentNavigationComponent,  ExperimentBasicInfoViewComponent ],
      imports: [ExperimentsTestToolModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperimentFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
