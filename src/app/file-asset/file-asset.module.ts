import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FileAssetViewComponent} from './file-asset-view/file-asset-view.component';
import {FileAssetFormComponent} from './file-asset-form/file-asset-form.component';
import {FileAssetUploadComponent} from './file-asset-upload/file-asset-upload.component';
import {FileUploadWidgetComponent} from './file-upload-widget/file-upload-widget.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [FileAssetViewComponent, FileAssetFormComponent, FileAssetUploadComponent, FileUploadWidgetComponent],
  exports: [FileAssetViewComponent, FileUploadWidgetComponent],
  providers: []
})
export class FileAssetModule {
}
