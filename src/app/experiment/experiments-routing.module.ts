import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExperimentsListComponent} from './experiments-list/experiments-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {path: '', component: ExperimentsListComponent, pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperimentsRoutingModule {
}
