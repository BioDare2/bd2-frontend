import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RhythmicityDashboardComponent} from './rhythmicity-dashboard/rhythmicity-dashboard.component';
import {RhythmicityStartFormComponent} from './rhythmicity-start-form/rhythmicity-start-form.component';



const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'new', component: RhythmicityStartFormComponent},
      // {path: ':jobId/edit', component: PPASelectPeriodsFormComponent},
      {path: '', component: RhythmicityDashboardComponent, pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RhythmicityRoutingModule {
}
