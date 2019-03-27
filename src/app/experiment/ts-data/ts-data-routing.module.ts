import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UploadDataFileComponent} from "./upload-data-file/upload-data-file.component";

const routes: Routes = [{
  path: '',
  children: [
    {path: 'upload', component: UploadDataFileComponent},

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TsDataRoutingModule { }
