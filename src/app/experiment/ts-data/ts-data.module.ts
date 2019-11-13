import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TsDataRoutingModule} from './ts-data-routing.module';
import {UploadDataFileComponent} from './upload-data-file/upload-data-file.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {TSImportDashboardComponent} from './tsimport-dashboard/tsimport-dashboard.component';
import {MaterialsModule} from '../../shared/materials.module';
import {UploadDataFileStepComponent} from './tsimport-dashboard/upload-data-file-step/upload-data-file-step.component';
import {ImportDetailsSummaryComponent} from './tsimport-dashboard/import-details-summary/import-details-summary.component';
import {DataSheetMDTableComponent} from './tsimport-dashboard/data-sheet-mdtable/data-sheet-mdtable.component';
import {DefineTimeStepComponent} from './tsimport-dashboard/define-time-step/define-time-step.component';
import {ImportLabelsStepComponent} from './tsimport-dashboard/import-labels-step/import-labels-step.component';
import {SelectDataStartStepComponent} from './tsimport-dashboard/select-data-start-step/select-data-start-step.component';
import {ImportStepsComponent} from './tsimport-dashboard/import-steps/import-steps.component';
import {AssignLabelsStepComponent} from './tsimport-dashboard/assign-labels-step/assign-labels-step.component';
import {SelectableRegionMDTableComponent} from './tsimport-dashboard/assign-labels-step/selectable-region-mdtable/selectable-region-mdtable.component';
import {EditLabelDialogComponent} from './tsimport-dashboard/assign-labels-step/edit-label-dialog/edit-label-dialog.component';
import {SelectBackgroundsLabelsStepComponent} from './tsimport-dashboard/select-backgrounds-labels-step/select-backgrounds-labels-step.component';

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
    DefineTimeStepComponent,
    ImportLabelsStepComponent,
    SelectDataStartStepComponent,
    ImportStepsComponent,
    AssignLabelsStepComponent,
    SelectableRegionMDTableComponent,
    EditLabelDialogComponent,
    SelectBackgroundsLabelsStepComponent
  ],
  entryComponents: [
    EditLabelDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule,
    ModalModule,
    SharedComponentsModule,
    FileAssetModule,
    TSPlotModule,
    TsDataRoutingModule,
    MaterialsModule
  ],
  exports: []
})
export class TsDataModule {
}
