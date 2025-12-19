import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Bd2NumHeatmapComponent} from './bd2-num-heatmap/bd2-num-heatmap.component';
import {PlotElementsModule} from '../plot-elements/plot-elements.module';

/**
 * Module for plotting a numerical heatmap.
 * 
 * @remarks
 * This module replaced the deprecated fixed-interval-heatmap module.
 */
@NgModule({
  declarations: [Bd2NumHeatmapComponent],
  imports: [
    CommonModule,
    PlotElementsModule
  ],
  exports: [Bd2NumHeatmapComponent]
})
export class Bd2NumHeatmapModule { }
