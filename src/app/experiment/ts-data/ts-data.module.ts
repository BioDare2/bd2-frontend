import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TsDataRoutingModule} from './ts-data-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FileAssetModule} from '../../file-asset/file-asset.module';
import {TSPlotModule} from '../../tsdata/plots/ts-plot.module';
import {TSViewComponent} from './ts-view/ts-view.component';
import {MaterialsModule} from '../../shared/materials.module';
import {TsHeatmapModule} from './ts-heatmap/ts-heatmap.module';

@NgModule({
  declarations: [
    TSViewComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FileAssetModule,
    TSPlotModule,
    TsDataRoutingModule,
    TsHeatmapModule,
    MaterialsModule
  ],
  exports: []
})
export class TsDataModule {
}
