import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PPARoutingModule} from './ppa-routing.module';
import {PPAStartFormComponent} from './ppa-start-form/ppa-start-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PPAJobParamsRFormComponent} from './ppa-start-form/ppajob-params-rform/ppajob-params-rform.component';
import {StaticContentModule} from '../../documents/static-content.module';
import {TSPlotModule} from '../../tsdata/plots/ts-plot.module';
import {AlertModule} from 'ngx-bootstrap/alert';
import {PPADashboardComponent} from './ppa-dashboard/ppa-dashboard.component';
import {SelectableFitDialogComponent} from './ppa-fit/selectable-fit-dialog.component';
import {PPAJobExportDialogComponent} from './ppa-dashboard/ppajob-pane/ppajob-export-dialog/ppajob-export-dialog.component';
import {PPAJobPaneComponent} from './ppa-dashboard/ppajob-pane/ppajob-pane.component';
import {PhasesOptionsWidgetComponent} from './ppa-dashboard/ppajob-pane/phases-options-widget.component';
import {HboxPlotModule} from 'bd2-ngx-hboxplot';
import {PolarPlotModule} from 'bd2-ngx-polarplot';
import {LegendModule} from '../../graphic/legend/legend.module';
import {SVGSaverModule} from '../../graphic/svg-saver/svg-saver.module';
import {PPAStatsTableComponent} from './ppa-dashboard/ppajob-pane/ppastats-table/ppastats-table.component';
import {PPAJobResultsTableComponent} from './ppa-dashboard/ppajob-pane/ppajob-results-table/ppajob-results-table.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {SharedComponentsModule} from '../../shared/shared-components.module';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {PPASelectPeriodsFormComponent} from './ppa-select-periods-form/ppa-select-periods-form.component';
import {MaterialsModule} from '../../shared/materials.module';
import { PPAStatsTable2Component } from './ppa-dashboard/ppajob-pane/ppastats-table2/ppastats-table2.component';
import { PPAResultsTable2Component } from './ppa-dashboard/ppajob-pane/pparesults-table2/pparesults-table2.component';

@NgModule({
  declarations: [PPAStartFormComponent, PPAJobParamsRFormComponent,
    PPADashboardComponent, PPAJobExportDialogComponent, PPAJobPaneComponent,
    PhasesOptionsWidgetComponent, PPAStatsTableComponent, PPAJobResultsTableComponent,
    SelectableFitDialogComponent,
    PPASelectPeriodsFormComponent,
    PPAStatsTable2Component,
    PPAResultsTable2Component],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    ButtonsModule,
    ModalModule,
    StaticContentModule,
    SharedComponentsModule,
    TSPlotModule,
    HboxPlotModule,
    PolarPlotModule,
    LegendModule,
    SVGSaverModule,
    PPARoutingModule,
    MaterialsModule
  ]
})
export class PPAModule {
}
