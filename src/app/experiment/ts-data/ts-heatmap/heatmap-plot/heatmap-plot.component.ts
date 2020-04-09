import {Component, OnInit, Input, ViewChild} from '@angular/core';
import {Timepoint, Trace} from '../../../../tsdata/plots/ts-plot.dom';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexPlotOptions, ChartComponent
} from 'ng-apexcharts';
import {HeatmapScale} from '../heatmap-scale';

@Component({
  selector: 'bd2-heatmap-plot',
  templateUrl: './heatmap-plot.component.html',
  styles: [
  ],
})
export class HeatmapPlotComponent implements OnInit {



  scales = new HeatmapScale();

  series: ApexAxisChartSeries = [];

  chart: ApexChart = {
    type: 'heatmap',
    animations: {
      enabled: false,
    // speed: 400,
    // animateGradually: {enabled: false}
    }
  };

  xaxis: ApexXAxis = {};
  plotTitle = { text: 'Heatmap'};

  plotOptions: ApexPlotOptions = {
    heatmap: {
      distributed: false,
      enableShades: false,
      shadeIntensity: 1,
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



    const [min, max] = this.minMax(traces);

    const scale = this.scales.customScale(min, max);

    this.plotOptions = {
      heatmap: {
        distributed: false,
        useFillColorAsStroke: false,
        radius: 0,
        colorScale: {ranges: scale}
      }
    };

    this.chart.height = 'auto';

    this.series = this.mapTracesToPaddedSeries(traces).reverse();

  }

  mapTracesToPaddedSeries(traces: Trace[]) {

    const startX = Math.min(...traces.filter( t => t.data.length > 0)
      .map( t => t.data[0].x));

    return traces.map( trace => {
      return {
        name: trace.label,
        data: this.padData(trace.data, startX)
      }
    });
  }

  padData(data: Timepoint[], startX: number) {
    if (data.length === 0) return data;
    if (data[0].x === startX) return data;

    const firstX = data[0].x;
    const firstY = data[0].y;
    const padding: Timepoint[] = [];
    for (let i = startX; i< firstX; i++) {
      padding.push(new Timepoint(i, firstY));
    }
    return padding.concat(data);
  }

  minMax(traces: Trace[]) {
    if (traces.length === 0) return [NaN, NaN];
    let min = traces[0].min;
    let max = traces[0].max;

    traces.forEach( tr => {
      min = Math.min(min, tr.min);
      max = Math.max(max, tr.max);
    });

    return [min, max];
  }
}
