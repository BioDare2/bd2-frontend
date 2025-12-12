import {Component, Input, OnInit, ViewChild} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import {TraceSet} from './ts-plot.dom';

@Component({
    selector: 'bd2-ts-plot',
    template: `

  @if (dataset) {
    <div class="tsplot-shell" [class.compact]="compact">
      @if (showLegend) {
        <div class="custom-legend">
          @for (trace of dataset.traces; track trace) {
            <button
              type="button"
              [attr.aria-pressed]="!trace.hidden"
              [class.strike]="trace.hidden"
              (click)="toggleDataset($index)"
            >
              <span [style.background]="trace.borderColor" class="legend-color"></span>
              {{ trace.label }}
            </button>
          }
        </div>
      }
      <canvas baseChart width="auto" height="200"
        [type]="'line'"
        [datasets]="dataset.traces"
        [options]="chartOptions"
        aria-label="Timeseries graph for the current dataset">
      </canvas>
    </div>
  }
`,
  styleUrls: ['./ts-plot.component.css'],
  standalone: false
})
export class TSPlotComponent implements OnInit {

  @Input() showLegend = true;
  @Input() compact = false;

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  dataset: TraceSet;
  chartOptions: any;

  scatterOptions: any;

  constructor() {}

  @Input()
  set data(data: TraceSet) {
    this.dataset = data;
  }

  ngOnInit() {
    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {display: false}
      },
      scales: {
        x: { type: 'linear', position: 'bottom' }
      }
    };
  }

  toggleDataset(index: number) {
    const chart = this.chart?.chart;
    if (chart) {
      const meta = chart.getDatasetMeta(index);
      meta.hidden = meta.hidden === null ? !chart.data.datasets[index].hidden : !meta.hidden;
      chart.update();
      this.dataset.traces[index].hidden = meta.hidden === true;
    }
  }

  // events
  public chartClicked(e: any): void {
    // console.log(e);
    /*if (e.active) {
        e.active.forEach( v => {
              console.log(v);
          }
        )
    }*/
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

}
