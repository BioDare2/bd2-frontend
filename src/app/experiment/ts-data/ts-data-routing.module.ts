import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UploadDataFileComponent} from './upload-data-file/upload-data-file.component';
import {TSImportComponent} from './ts-import/ts-import.component';
import {TSViewComponent} from './ts-view/ts-view.component';

const routes: Routes = [{
  path: '',
  children: [
    {path: 'upload', component: UploadDataFileComponent},

    {path: 'ts-import/:format/:fileId', component: TSImportComponent},

    {path: 'view/ts', component: TSViewComponent},

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TsDataRoutingModule {
}
