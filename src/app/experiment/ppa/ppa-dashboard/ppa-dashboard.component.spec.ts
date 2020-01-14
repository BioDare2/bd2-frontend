import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExperimentsTestToolModule} from '../../experiment_test_tool.spec';

import {StaticContentTestModule} from '../../../documents/static-content/static-content_test_tool.spec';
import {PPADashboardComponent} from './ppa-dashboard.component';
import {TSPlotModule} from '../../../tsdata/plots/ts-plot.module';
import {PPAJobPaneComponentTestModule} from './ppajob-pane/ppajob-pane.component.spec';


describe('PPADashboardComponent', () => {
  let component: PPADashboardComponent;
  let fixture: ComponentFixture<PPADashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PPADashboardComponent

        ],
      imports: [ExperimentsTestToolModule, StaticContentTestModule, PPAJobPaneComponentTestModule,
        TSPlotModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPADashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
