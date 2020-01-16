import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TsDataRoutingModule} from './ts-data-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FileAssetModule} from '../../file-asset/file-asset.module';
import {TSPlotModule} from '../../tsdata/plots/ts-plot.module';
import {TSViewComponent} from './ts-view/ts-view.component';
import {TSImportDashboardComponent} from './ts-import/tsimport-dashboard/tsimport-dashboard.component';
import {MaterialsModule} from '../../shared/materials.module';
import {UploadDataFileStepComponent} from './ts-import/tsimport-dashboard/upload-data-file-step/upload-data-file-step.component';
import {ImportDetailsSummaryComponent} from './ts-import/tsimport-dashboard/import-details-summary/import-details-summary.component';
import {DataSheetMDTableComponent} from './ts-import/tsimport-dashboard/data-sheet-mdtable/data-sheet-mdtable.component';
import {DefineTimeStepComponent} from './ts-import/tsimport-dashboard/define-time-step/define-time-step.component';
import {ImportLabelsStepComponent} from './ts-import/tsimport-dashboard/import-labels-step/import-labels-step.component';
import {SelectDataStartStepComponent} from './ts-import/tsimport-dashboard/select-data-start-step/select-data-start-step.component';
import {ImportStepsComponent} from './ts-import/tsimport-dashboard/import-steps/import-steps.component';
import {AssignLabelsStepComponent} from './ts-import/tsimport-dashboard/assign-labels-step/assign-labels-step.component';
// tslint:disable-next-line:max-line-length
import {SelectableRegionMDTableComponent} from './ts-import/tsimport-dashboard/assign-labels-step/selectable-region-mdtable/selectable-region-mdtable.component';
import {EditLabelDialogComponent} from './ts-import/tsimport-dashboard/assign-labels-step/edit-label-dialog/edit-label-dialog.component';
// tslint:disable-next-line:max-line-length
import {SelectBackgroundsLabelsStepComponent} from './ts-import/tsimport-dashboard/select-backgrounds-labels-step/select-backgrounds-labels-step.component';

@NgModule({
  declarations: [
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

  ],
  entryComponents: [
    EditLabelDialogComponent,
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
