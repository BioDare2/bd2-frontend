import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TsHeatmapViewComponent } from './ts-heatmap-view/ts-heatmap-view.component';
import { HeatmapDisplayParamsRformComponent } from './heatmap-display-params-rform/heatmap-display-params-rform.component';



@NgModule({
  declarations: [TsHeatmapViewComponent, HeatmapDisplayParamsRformComponent],
  imports: [
    CommonModule
  ]
})
export class TsHeatmapModule { }
