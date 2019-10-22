import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UploadDataFileComponent} from './upload-data-file/upload-data-file.component';
import {TSImportComponent} from './ts-import/ts-import.component';
import {TSViewComponent} from './ts-view/ts-view.component';
import {TSImportDashboardComponent} from './tsimport-dashboard/tsimport-dashboard.component';

const routes: Routes = [{
  path: '',
  children: [
    {path: 'upload', component: UploadDataFileComponent},

    {path: 'ts-import/:format/:fileId', component: TSImportComponent},

    {path: 'view/ts', component: TSViewComponent},

    {path: 'ts-import2', component: TSImportDashboardComponent }

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TsDataRoutingModule {
}
