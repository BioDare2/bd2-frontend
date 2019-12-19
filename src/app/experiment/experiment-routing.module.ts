import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExperimentFeatureComponent} from './experiment-feature/experiment-feature.component';
import {ExperimentAssayOverviewComponent} from './experiment-assay-overview/experiment-assay-overview.component';
import {ExperimentAssayEditFormComponent} from './experiment-assay-edit-form/experiment-assay-edit-form.component';
import {AttachmentsDashboardComponent} from './attachments/attachments-dashboard/attachments-dashboard.component';
import {PublishFormComponent} from './publish/publish-form/publish-form.component';

const routes: Routes = [
  {
    path: ':id',
    component: ExperimentFeatureComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ExperimentAssayOverviewComponent
      },
      {path: 'edit', component: ExperimentAssayEditFormComponent},
      {path: 'file', component: AttachmentsDashboardComponent},
      {path: 'publish', component: PublishFormComponent},

      {path: 'data', loadChildren: () => import('./ts-data/ts-data.module').then(m => m.TsDataModule)},

      {path: 'ppa', loadChildren: () => import('./ppa/ppa.module').then(m => m.PPAModule)},

      {path: 'rhythmicity', loadChildren: () => import('./rhythmicity/rhythmicity.module').then(m => m.RhythmicityModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperimentRoutingModule {
}
