import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TsDataRoutingModule} from './ts-data-routing.module';
import {UploadDataFileComponent} from './upload-data-file/upload-data-file.component';
import {FormsModule} from '@angular/forms';
import {FileAssetModule} from '../../file-asset/file-asset.module';
import {AlertModule} from 'ngx-bootstrap/alert';
import {DescribeTSTableComponent} from './ts-import/widgets/describe-ts-table.component';
import {TSImportComponent} from './ts-import/ts-import.component';
import {DescribeTopcountTableComponent} from './ts-import/widgets/describe-topcount-table.component';
import {SharedComponentsModule} from '../../shared/shared-components.module';
import {ColumnTypeDialogComponent} from './ts-import/widgets/column-type.dialog.component';
import {ConfirmRowCopyDialogComponent} from './ts-import/widgets/confirm-row-copy.dialog.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import {SimpleAddDataFormComponent} from './ts-import/widgets/simple-add-data.form.component';

@NgModule({
  declarations: [UploadDataFileComponent, TSImportComponent,
    DescribeTSTableComponent, DescribeTopcountTableComponent, ColumnTypeDialogComponent, ConfirmRowCopyDialogComponent,
    SimpleAddDataFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AlertModule,
    ModalModule,
    SharedComponentsModule,
    FileAssetModule,
    TsDataRoutingModule
  ]
})
export class TsDataModule {
}
