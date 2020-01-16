import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TSOldImportComponent} from './ts-old-import.component';

const routes: Routes = [{
  path: '',
  children: [

    {path: ':format/:fileId', component: TSOldImportComponent},


  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TsOldImportRoutingModule {
}
