import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TooltipComponent} from './tooltip/tooltip.component';
import {LabelsComponent} from './labels/labels.component';
import {LabelBoxComponent} from './labels/label-box/label-box.component';
import {SerieRowComponent} from './series-box/serie-row/serie-row.component';
import {DataPointBoxComponent} from './series-box/serie-row/data-point-box/data-point-box.component';
import {SeriesBoxComponent} from './series-box/series-box.component';
import {PaneBackComponent} from './pane-back/pane-back.component';
import {AxisModule} from './axis/axis.module';


@NgModule({
  declarations: [
    LabelsComponent,
    LabelBoxComponent,
    TooltipComponent,
    PaneBackComponent,
    SeriesBoxComponent,
    SerieRowComponent,
    DataPointBoxComponent,
  ],
  imports: [
    CommonModule,
    AxisModule
  ],
  exports: [
    LabelsComponent,
    LabelBoxComponent,
    TooltipComponent,
    PaneBackComponent,
    SeriesBoxComponent,
    SerieRowComponent,
    DataPointBoxComponent,
    AxisModule
  ]

})
export class PlotElementsModule { }
