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
import {TSPlotModule} from '../../tsdata/plots/ts-plot.module';
import {TSViewComponent} from './ts-view/ts-view.component';
import { TSImportDashboardComponent } from './tsimport-dashboard/tsimport-dashboard.component';
import {MaterialsModule} from '../../shared/materials.module';
import { UploadDataFileStepComponent } from './tsimport-dashboard/upload-data-file-step/upload-data-file-step.component';
import { ImportDetailsSummaryComponent } from './tsimport-dashboard/import-details-summary/import-details-summary.component';
import { DataSheetMDTableComponent } from './tsimport-dashboard/data-sheet-mdtable/data-sheet-mdtable.component';
import { DefineTimeStepComponent } from './tsimport-dashboard/define-time-step/define-time-step.component';

@NgModule({
  declarations: [UploadDataFileComponent,
    TSImportComponent,
    DescribeTSTableComponent, DescribeTopcountTableComponent, ColumnTypeDialogComponent, ConfirmRowCopyDialogComponent,
    SimpleAddDataFormComponent,
    TSViewComponent,
    TSImportDashboardComponent,
    UploadDataFileStepComponent,
    ImportDetailsSummaryComponent,
    DataSheetMDTableComponent,
    DefineTimeStepComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AlertModule,
    ModalModule,
    SharedComponentsModule,
    FileAssetModule,
    TSPlotModule,
    TsDataRoutingModule,
    MaterialsModule
  ],
  exports: [TSImportDashboardComponent, DataSheetMDTableComponent]
})
export class TsDataModule {
}
