import {NgModule} from '@angular/core';
import {AttachmentsDashboardComponent} from './attachments-dashboard/attachments-dashboard.component';
import {CommonModule} from '@angular/common';
import {FileAssetModule} from '../../file-asset/file-asset.module';

@NgModule({
  imports: [
    CommonModule,
    FileAssetModule,
  ],
  declarations: [AttachmentsDashboardComponent],
  providers: []
})
export class AttachmentsModule {
}
