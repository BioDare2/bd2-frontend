import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FileAssetModule} from '../../../file-asset/file-asset.module';
import {MaterialsModule} from '../../../shared/materials.module';
import {ColumnTypeMatDialogComponent} from './widgets/column-type-mat-dialog/column-type-mat-dialog.component';
import {ConfirmRowCopyMatDialogComponent} from './widgets/confirm-row-copy-mat-dialog/confirm-row-copy-mat-dialog.component';
import {TSOldImportComponent} from './ts-old-import.component';
import {DescribeTopcountTableComponent} from './widgets/describe-topcount-table.component';
import {SimpleAddDataFormComponent} from './widgets/simple-add-data.form.component';
import {TsOldImportRoutingModule} from './ts-old-import-routing.module';


@NgModule({
  declarations: [TSOldImportComponent,
    DescribeTopcountTableComponent,
    SimpleAddDataFormComponent,
    ColumnTypeMatDialogComponent,
    ConfirmRowCopyMatDialogComponent
  ],
  entryComponents: [
    ColumnTypeMatDialogComponent,
    ConfirmRowCopyMatDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileAssetModule,
    MaterialsModule,
    TsOldImportRoutingModule
  ],
  exports: []
})
export class TsDataModule {
}
