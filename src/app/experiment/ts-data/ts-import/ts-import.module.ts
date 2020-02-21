import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TsImportRoutingModule} from './ts-import-routing.module';
import {TSImportDashboardComponent} from './tsimport-dashboard/tsimport-dashboard.component';
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
import {FileAssetModule} from '../../../file-asset/file-asset.module';
import {MaterialsModule} from '../../../shared/materials.module';

@NgModule({
  declarations: [
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
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileAssetModule,
    MaterialsModule,
    TsImportRoutingModule
  ],
  exports: []
})
export class TsImportModule {
}
