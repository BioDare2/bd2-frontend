import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PPAStartFormComponent} from './ppa-start-form/ppa-start-form.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'new', component: PPAStartFormComponent},
      // {path: ':jobId/edit', component: PPASelectPeriodsFormComponent},
      // {path: '', component: PPADashboardComponent, pathMatch: 'full'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PPARoutingModule {
}
