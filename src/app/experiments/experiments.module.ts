import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExperimentsRoutingModule} from './experiments-routing.module';
import {ExperimentsListComponent} from './experiments-list/experiments-list.component';
import {FormsModule} from '@angular/forms';
import {RepoComponentsModule} from '../repo/components/repo-comp.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { ExperimentSummaryComponent } from './experiments-list/experiment-summary/experiment-summary.component';
import {ExperimentAssayCreateFormComponent} from '../experiment/experiment-assay-create-form/experiment-assay-create-form.component';

@NgModule({
  declarations: [ExperimentsListComponent, ExperimentAssayCreateFormComponent, ExperimentSummaryComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSlideToggleModule,
    RepoComponentsModule,
    ExperimentsRoutingModule
  ]
})
export class ExperimentsModule {
}
