import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExperimentFeatureComponent} from './experiment-feature/experiment-feature.component';

const routes: Routes = [
  {
    path: ':id',
    component: ExperimentFeatureComponent,
    children: [

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperimentRoutingModule {
}
