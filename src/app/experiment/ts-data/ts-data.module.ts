import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TsDataRoutingModule} from './ts-data-routing.module';
import {UploadDataFileComponent} from './upload-data-file/upload-data-file.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FileAssetModule} from '../../file-asset/file-asset.module';
import {TSImportComponent} from './ts-import/ts-import.component';
import {DescribeTopcountTableComponent} from './ts-import/widgets/describe-topcount-table.component';
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
// tslint:disable-next-line:max-line-length
import {SelectableRegionMDTableComponent} from './tsimport-dashboard/assign-labels-step/selectable-region-mdtable/selectable-region-mdtable.component';
import {EditLabelDialogComponent} from './tsimport-dashboard/assign-labels-step/edit-label-dialog/edit-label-dialog.component';
// tslint:disable-next-line:max-line-length
import {SelectBackgroundsLabelsStepComponent} from './tsimport-dashboard/select-backgrounds-labels-step/select-backgrounds-labels-step.component';
import {ColumnTypeMatDialogComponent} from './ts-import/widgets/column-type-mat-dialog/column-type-mat-dialog.component';
import {ConfirmRowCopyMatDialogComponent} from './ts-import/widgets/confirm-row-copy-mat-dialog/confirm-row-copy-mat-dialog.component';

@NgModule({
  declarations: [UploadDataFileComponent,
    TSImportComponent,
    DescribeTopcountTableComponent,
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
    SelectBackgroundsLabelsStepComponent,
    ColumnTypeMatDialogComponent,
    ConfirmRowCopyMatDialogComponent
  ],
  entryComponents: [
    EditLabelDialogComponent,
    ColumnTypeMatDialogComponent,
    ConfirmRowCopyMatDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileAssetModule,
    TSPlotModule,
    TsDataRoutingModule,
    MaterialsModule
  ],
  exports: []
})
export class TsDataModule {
}
