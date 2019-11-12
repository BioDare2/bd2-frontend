import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExperimentsTestToolModule} from '../../experiment_test_tool.spec';

import {StaticContentTestModule} from '../../../documents/static-content_test_tool.spec';
import {PPADashboardComponent} from './ppa-dashboard.component';
import {SelectableFitDialogComponent} from '../ppa-fit/selectable-fit-dialog.component';
import {PPAJobExportDialogComponent} from './ppajob-pane/ppajob-export-dialog/ppajob-export-dialog.component';
import {TSPlotModule} from '../../../tsdata/plots/ts-plot.module';
import {PPAJobPaneComponentTestModule} from './ppajob-pane/ppajob-pane.component.spec';


describe('PPADashboardComponent', () => {
  let component: PPADashboardComponent;
  let fixture: ComponentFixture<PPADashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PPADashboardComponent, SelectableFitDialogComponent, PPAJobExportDialogComponent,

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
