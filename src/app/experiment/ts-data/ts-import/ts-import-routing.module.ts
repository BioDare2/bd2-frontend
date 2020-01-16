import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TSImportDashboardComponent} from './tsimport-dashboard/tsimport-dashboard.component';

const routes: Routes = [{
  path: '',
  children: [
    {path: '', component: TSImportDashboardComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TsImportRoutingModule {
}
