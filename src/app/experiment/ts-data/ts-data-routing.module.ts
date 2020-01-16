import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UploadDataFileComponent} from './old-import/upload-data-file/upload-data-file.component';
import {TSOldImportComponent} from './old-import/ts-old-import.component';
import {TSViewComponent} from './ts-view/ts-view.component';
import {TSImportDashboardComponent} from './ts-import/tsimport-dashboard/tsimport-dashboard.component';

const routes: Routes = [{
  path: '',
  children: [
    // {path: 'upload', component: UploadDataFileComponent},

    // {path: 'ts-import/:format/:fileId', component: TSOldImportComponent},
    {path: 'ts-old-import', loadChildren: () => import('./old-import/ts-old-import.module').then(m => m.TsDataModule)},

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
