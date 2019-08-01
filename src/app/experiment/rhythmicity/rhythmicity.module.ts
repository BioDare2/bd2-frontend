import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RhythmicityDashboardComponent} from './rhythmicity-dashboard/rhythmicity-dashboard.component';
import {RhythmicityRoutingModule} from './rhythmicity-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AlertModule, ButtonsModule, ModalModule} from 'ngx-bootstrap';
import {StaticContentModule} from '../../documents/static-content.module';
import {SharedComponentsModule} from '../../shared/shared-components.module';
import { RhythmicityStartFormComponent } from './rhythmicity-start-form/rhythmicity-start-form.component';
import { RhythmicityjobParamsRformComponent } from './rhythmicity-start-form/rhythmicityjob-params-rform/rhythmicityjob-params-rform.component';
import {TSPlotModule} from '../../tsdata/plots/ts-plot.module';
import { RhythmicityJobPaneComponent } from './rhythmicity-dashboard/rhythmicity-job-pane/rhythmicity-job-pane.component';

@NgModule({
  declarations: [RhythmicityDashboardComponent, RhythmicityStartFormComponent, RhythmicityjobParamsRformComponent,
    RhythmicityJobPaneComponent],
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
    RhythmicityRoutingModule
  ]
})
export class RhythmicityModule {
}
