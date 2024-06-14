import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PPARoutingModule} from './ppa-routing.module';
import {PPAStartFormComponent} from './ppa-start-form/ppa-start-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {PPAJobParamsRFormComponent} from './ppa-start-form/ppajob-params-rform/ppajob-params-rform.component';
import {StaticContentModule} from '../../documents/static-content/static-content.module';
import {TSPlotModule} from '../../tsdata/plots/ts-plot.module';
import {PPADashboardComponent} from './ppa-dashboard/ppa-dashboard.component';
import {PPAJobPaneComponent} from './ppa-dashboard/ppajob-pane/ppajob-pane.component';
import {PhasesOptionsWidgetComponent} from './ppa-dashboard/ppajob-pane/phases-options-widget.component';
import {BD2NgxHBoxplotModule} from '../../bd2-ngx-hboxplot/bd2-ngx-hboxplot.module';
import {LegendModule} from '../../graphic/legend/legend.module';
import {SVGSaverModule} from '../../graphic/svg-saver/svg-saver.module';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {PPASelectPeriodsFormComponent} from './ppa-select-periods-form/ppa-select-periods-form.component';
import {MaterialsModule} from '../../shared/materials.module';
import {PPAStatsTable2Component} from './ppa-dashboard/ppajob-pane/ppastats-table2/ppastats-table2.component';
import {PPAResultsTable2Component} from './ppa-dashboard/ppajob-pane/pparesults-table2/pparesults-table2.component';
import {PPAPlotsComponent} from './ppa-dashboard/ppajob-pane/ppaplots/ppaplots.component';
import {PPAPhasePlotComponent} from './ppa-dashboard/ppajob-pane/ppaplots/ppaphase-plot/ppaphase-plot.component';
import {PPAPeriodPlotComponent} from './ppa-dashboard/ppajob-pane/ppaplots/ppaperiod-plot/ppaperiod-plot.component';
import {PPASortWidgetComponent} from './ppa-dashboard/ppajob-pane/ppaplots/ppasort-widget/ppasort-widget.component';
import {PPAJobExportDialog2Component} from './ppa-dialogs/ppajob-export-dialog2/ppajob-export-dialog2.component';
import {PPADialogsService} from './ppa-dialogs/ppadialogs.service';
import {PPAFitDialogComponent} from './ppa-dialogs/ppa-fit-dialog/ppa-fit-dialog.component';
import {BD2NgxPolarplotModule} from "../../bd2-ngx-polarplot/bd2-ngx-polarplot.module";

@NgModule({
  declarations: [PPAStartFormComponent, PPAJobParamsRFormComponent,
    PPADashboardComponent, PPAJobPaneComponent,
    PhasesOptionsWidgetComponent,
    PPASelectPeriodsFormComponent,
    PPAStatsTable2Component,
    PPAResultsTable2Component,
    PPAPlotsComponent,
    PPAPhasePlotComponent,
    PPAPeriodPlotComponent,
    PPASortWidgetComponent,
    PPAJobExportDialog2Component,
    PPAFitDialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule,
    StaticContentModule,
    TSPlotModule,
    BD2NgxHBoxplotModule,
    BD2NgxPolarplotModule,
    LegendModule,
    SVGSaverModule,
    PPARoutingModule,
    MaterialsModule
  ],
  providers: [PPADialogsService]
})
export class PPAModule {
}
