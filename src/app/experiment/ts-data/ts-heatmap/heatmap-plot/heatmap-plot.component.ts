import { Component, OnInit, Input } from '@angular/core';
import {Trace} from '../../../../tsdata/plots/ts-plot.dom';
import {ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexPlotOptions
} from 'ng-apexcharts'

@Component({
  selector: 'bd2-heatmap-plot',
  templateUrl: './heatmap-plot.component.html',
  styles: [
  ],
})
export class HeatmapPlotComponent implements OnInit {

  series: ApexAxisChartSeries = [];
  chart: ApexChart = { type: 'heatmap',
    animations: {
    speed: 400,
    animateGradually: {enabled: false}
    }
  };
  xaxis: ApexXAxis = {};
  plotTitle = { text: 'Heatmap'};

  plotOptions: ApexPlotOptions = {
    heatmap: {
      distributed: true,
      useFillColorAsStroke: false,
      radius: 0
    }
  }

  @Input()
  set traces(traces: Trace[]) {
    this.mapToHeatMapData(traces)
  }

  constructor() { }

  ngOnInit(): void {
  }

  mapToHeatMapData(traces: Trace[]) {

    this.series = traces.map( trace => {
      return {
        name: trace.label,
        data: trace.data
      }
    });

    this.chart.height = 'auto';
  }
}
