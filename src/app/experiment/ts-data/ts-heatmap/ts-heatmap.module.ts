import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TsHeatmapViewComponent } from './ts-heatmap-view/ts-heatmap-view.component';
import { HeatmapDisplayParamsRformComponent } from './heatmap-display-params-rform/heatmap-display-params-rform.component';
import { ReactiveFormsModule} from '@angular/forms';
import { MatPaginatorModule} from '@angular/material/paginator';
import { HeatmapPlotComponent } from './heatmap-plot/heatmap-plot.component';
import {TsHeatmapRoutingModule} from './ts-heatmap-routing.module';
import {Bd2NgxHeatmapModule} from 'bd2-ngx-heatmap';



@NgModule({
  declarations: [TsHeatmapViewComponent, HeatmapDisplayParamsRformComponent, HeatmapPlotComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    Bd2NgxHeatmapModule,
    TsHeatmapRoutingModule
  ]
})
export class TsHeatmapModule { }
