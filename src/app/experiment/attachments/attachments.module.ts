import {NgModule} from '@angular/core';
import {AttachmentsDashboardComponent} from './attachments-dashboard/attachments-dashboard.component';
import {CommonModule} from '@angular/common';
import {FileAssetModule} from '../../file-asset/file-asset.module';
import {AlertModule} from 'ngx-bootstrap/alert';

@NgModule({
  imports: [
    CommonModule,
    FileAssetModule,
    AlertModule
  ],
  declarations: [AttachmentsDashboardComponent],
  providers: []
})
export class AttachmentsModule { }
