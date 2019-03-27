import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PPAStartFormComponent} from './ppa-start-form/ppa-start-form.component';
import {PPADashboardComponent} from './ppa-dashboard/ppa-dashboard.component';
import {PPASelectPeriodsFormComponent} from './ppa-select-periods-form/ppa-select-periods-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'new', component: PPAStartFormComponent},
      {path: ':jobId/edit', component: PPASelectPeriodsFormComponent},
      {path: '', component: PPADashboardComponent, pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PPARoutingModule {
}
