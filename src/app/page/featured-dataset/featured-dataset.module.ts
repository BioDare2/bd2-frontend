import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TSPlotModule } from '../../tsdata/plots/ts-plot.module';
import { FeaturedDatasetComponent } from './featured-dataset.component';

@NgModule({
  declarations: [FeaturedDatasetComponent],
  imports: [
    CommonModule,
    TSPlotModule
  ],
  exports: [FeaturedDatasetComponent]
})
export class FeaturedDatasetModule { }
