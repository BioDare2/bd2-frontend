import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Trace} from '../../../../tsdata/plots/ts-plot.dom';


@Component({
    selector: 'bd2-heatmap-plot',
    templateUrl: './heatmap-plot.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class HeatmapPlotComponent implements OnInit {

  series: Trace[];

  @Input()
  set traces(traces: Trace[]) {
    this.series = traces;
  }

  @Input()
  middleZero = false;

  @Input()
  patterned = false;

  constructor() { }

  ngOnInit(): void {
  }

}
