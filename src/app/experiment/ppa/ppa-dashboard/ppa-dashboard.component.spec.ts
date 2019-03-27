import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ExperimentsTestToolModule} from '../../experiment_test_tool.spec';
// import {PPAJobParamsRFormComponent} from './ppajob-params-rform/ppajob-params-rform.component';
import {StaticContentTestModule} from '../../../documents/static-content_test_tool.spec';
import {PPADashboardComponent} from './ppa-dashboard.component';
import {SelectableFitDialogComponent} from '../ppa-fit/selectable-fit-dialog.component';
import {PPAJobExportDialogComponent} from './ppajob-export-dialog/ppajob-export-dialog.component';
import {PPAJobPaneComponent} from './ppajob-pane/ppajob-pane.component';
import {PhasesOptionsWidgetComponent} from './ppajob-pane/phases-options-widget.component';
import {PPAStatsTableComponent} from './ppajob-pane/ppastats-table/ppastats-table.component';
import {PPAJobResultsTableComponent} from './ppajob-pane/ppajob-results-table/ppajob-results-table.component';
import {TSPlotModule} from '../../../tsdata/plots/ts-plot.module';
import {HboxPlotModule} from 'bd2-ngx-hboxplot';
import {SVGSaverModule} from '../../../graphic/svg-saver/svg-saver.module';
import {PolarPlotModule} from 'bd2-ngx-polarplot';
import {LegendModule} from '../../../graphic/legend/legend.module';


describe('PPADashboardComponent', () => {
  let component: PPADashboardComponent;
  let fixture: ComponentFixture<PPADashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PPADashboardComponent, SelectableFitDialogComponent, PPAJobExportDialogComponent,
        PPAJobPaneComponent, PPAStatsTableComponent, PhasesOptionsWidgetComponent, PPAJobResultsTableComponent],
      imports: [ExperimentsTestToolModule, StaticContentTestModule, TSPlotModule, HboxPlotModule, SVGSaverModule,
        PolarPlotModule, LegendModule]
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
