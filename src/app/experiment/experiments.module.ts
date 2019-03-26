import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ExperimentsRoutingModule} from './experiments-routing.module';
import {ExperimentsListComponent} from './experiments-list/experiments-list.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {ExperimentAssayCreateFormComponent} from './experiment-assay-create-form/experiment-assay-create-form.component';
import {RepoComponentsModule} from '../repo/components/repo-comp.module';

@NgModule({
  declarations: [ExperimentsListComponent, ExperimentAssayCreateFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ButtonsModule,
    RouterModule,
    RepoComponentsModule,
    ExperimentsRoutingModule
  ]
})
export class ExperimentsModule {
}
