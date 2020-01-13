import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RhythmicityDashboardComponent} from './rhythmicity-dashboard/rhythmicity-dashboard.component';
import {RhythmicityRoutingModule} from './rhythmicity-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StaticContentModule} from '../../documents/static-content.module';
import {SharedComponentsModule} from '../../shared/shared-components.module';
import {RhythmicityStartFormComponent} from './rhythmicity-start-form/rhythmicity-start-form.component';
import {RhythmicityjobParamsRformComponent} from './rhythmicity-start-form/rhythmicityjob-params-rform/rhythmicityjob-params-rform.component';
import {TSPlotModule} from '../../tsdata/plots/ts-plot.module';
import {RhythmicityJobPaneComponent} from './rhythmicity-dashboard/rhythmicity-job-pane/rhythmicity-job-pane.component';
import {PValueFormComponent} from './rhythmicity-dashboard/rhythmicity-job-pane/pvalue-form/pvalue-form.component';
import {RhythmicityResultsMDTableComponent} from './rhythmicity-dashboard/rhythmicity-job-pane/rhythmicity-results-mdtable/rhythmicity-results-mdtable.component';
import {MaterialsModule} from '../../shared/materials.module';
import {StatTestOptionsWidgetComponent} from './rhythmicity-dashboard/rhythmicity-job-pane/stat-test-options-widget/stat-test-options-widget.component';
import {ButtonsModule, ModalModule} from 'ngx-bootstrap';

@NgModule({
  declarations: [RhythmicityDashboardComponent, RhythmicityStartFormComponent, RhythmicityjobParamsRformComponent,
    RhythmicityJobPaneComponent,
    PValueFormComponent,
    RhythmicityResultsMDTableComponent,
    StatTestOptionsWidgetComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule,
    ModalModule,
    StaticContentModule,
    SharedComponentsModule,
    TSPlotModule,

    MaterialsModule,
    RhythmicityRoutingModule
  ]
})
export class RhythmicityModule {
}
