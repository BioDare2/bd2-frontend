import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TSPlotModule } from '../../tsdata/plots/ts-plot.module';
import { FeaturedDatasetComponent } from './featured-dataset.component';

@NgModule({
  declarations: [FeaturedDatasetComponent],
  imports: [
    CommonModule,
    TSPlotModule,
    RouterModule
  ],
  exports: [FeaturedDatasetComponent]
})
export class FeaturedDatasetModule { }
