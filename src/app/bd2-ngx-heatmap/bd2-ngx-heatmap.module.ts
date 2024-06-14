import { NgModule } from '@angular/core';
import {Bd2NumHeatmapModule} from './bd2-num-heatmap/bd2-num-heatmap.module';
import {Bd2NumHeatmapComponent} from './bd2-num-heatmap/bd2-num-heatmap/bd2-num-heatmap.component';



@NgModule({
  declarations: [],
  imports: [
    Bd2NumHeatmapModule
  ],
  exports: [Bd2NumHeatmapComponent]
})
export class Bd2NgxHeatmapModule { }
