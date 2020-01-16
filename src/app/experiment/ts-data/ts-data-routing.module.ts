import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TSViewComponent} from './ts-view/ts-view.component';

const routes: Routes = [{
  path: '',
  children: [
    // {path: 'upload', component: UploadDataFileComponent},

    // {path: 'ts-import/:format/:fileId', component: TSOldImportComponent},
    {path: 'view/ts', component: TSViewComponent},

    {path: 'ts-old-import', loadChildren: () => import('./old-import/ts-old-import.module').then(m => m.TsOldImportModule)},


    {path: 'ts-import', loadChildren: () => import('./ts-import/ts-import.module').then(m => m.TsImportModule) }

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TsDataRoutingModule {
}
