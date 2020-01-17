import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExperimentsRoutingModule} from './experiments-routing.module';
import {ExperimentsListComponent} from './experiments-list/experiments-list.component';
import {FormsModule} from '@angular/forms';
import {ExperimentAssayCreateFormComponent} from './experiment-assay-create-form/experiment-assay-create-form.component';
import {RepoComponentsModule} from '../repo/components/repo-comp.module';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@NgModule({
  declarations: [ExperimentsListComponent, ExperimentAssayCreateFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatSlideToggleModule,
    // RouterModule,
    RepoComponentsModule,
    ExperimentsRoutingModule
  ]
})
export class ExperimentsModule {
}
