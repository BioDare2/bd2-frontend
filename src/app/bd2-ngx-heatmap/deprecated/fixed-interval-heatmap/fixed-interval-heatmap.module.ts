import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Bd2FixedIntervalHeatmapComponent} from './bd2-fixed-interval-heatmap.component';
import {BandAxisBoxComponent} from './band-axis-box/band-axis-box.component';
import {BandXAxisComponent} from './band-axis-box/band-x-axis/band-x-axis.component';
import {PlotElementsModule} from '../../plot-elements/plot-elements.module';
import {BandPointBoxComponent} from './band-series-box/band-serie-row/band-point-box/band-point-box.component';
import {BandSerieRowComponent} from './band-series-box/band-serie-row/band-serie-row.component';
import {BandSeriesBoxComponent} from './band-series-box/band-series-box.component';


@NgModule({
  declarations: [
    BandXAxisComponent,
    BandAxisBoxComponent,
    BandPointBoxComponent,
    BandSerieRowComponent,
    BandSeriesBoxComponent,
    Bd2FixedIntervalHeatmapComponent,
  ],
  imports: [
    CommonModule,
    PlotElementsModule
  ],
  exports: [
    Bd2FixedIntervalHeatmapComponent,
  ]

})
export class Bd2FixedIntervalHeatmapModule { }
