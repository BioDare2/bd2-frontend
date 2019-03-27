import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TsDataRoutingModule } from './ts-data-routing.module';
import { UploadDataFileComponent } from './upload-data-file/upload-data-file.component';
import {FormsModule} from '@angular/forms';
import {FileAssetModule} from '../../file-asset/file-asset.module';
import {AlertModule} from "ngx-bootstrap/alert";

@NgModule({
  declarations: [UploadDataFileComponent],
  imports: [
    CommonModule,
    FormsModule,
    AlertModule,
    FileAssetModule,
    TsDataRoutingModule
  ]
})
export class TsDataModule { }
