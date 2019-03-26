import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExperimentsListComponent} from './experiments-list/experiments-list.component';
import {ExperimentAssayCreateFormComponent} from './experiment-assay-create-form/experiment-assay-create-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: ExperimentsListComponent, pathMatch: 'full'},
      {path: 'new', component: ExperimentAssayCreateFormComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperimentsRoutingModule {
}
