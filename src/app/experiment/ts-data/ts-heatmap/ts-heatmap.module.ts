import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TsHeatmapViewComponent} from './ts-heatmap-view/ts-heatmap-view.component';
import {HeatmapDisplayParamsRformComponent} from './heatmap-display-params-rform/heatmap-display-params-rform.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import {HeatmapPlotComponent} from './heatmap-plot/heatmap-plot.component';
import {TsHeatmapRoutingModule} from './ts-heatmap-routing.module';
import {Bd2NgxHeatmapModule} from 'bd2-ngx-heatmap';
import {SimplePaginatorComponent} from './simple-paginator/simple-paginator.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatExpansionModule} from '@angular/material/expansion';
import {TSPlotModule} from '../../../tsdata/plots/ts-plot.module';

@NgModule({
  declarations: [TsHeatmapViewComponent, HeatmapDisplayParamsRformComponent, HeatmapPlotComponent, SimplePaginatorComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatExpansionModule,
    Bd2NgxHeatmapModule,
    TSPlotModule,
    TsHeatmapRoutingModule
  ]
})
export class TsHeatmapModule { }
