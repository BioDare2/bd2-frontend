import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {Timepoint, Trace} from '../../../../tsdata/plots/ts-plot.dom';



@Component({
  selector: 'bd2-heatmap-plot',
  templateUrl: './heatmap-plot.component.html',
  styles: [
  ],
})
export class HeatmapPlotComponent implements OnInit {

  series: Trace[];

  @Input()
  set traces(traces: Trace[]) {
    this.series = traces;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
