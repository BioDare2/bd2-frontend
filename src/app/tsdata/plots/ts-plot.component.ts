import {Component, Input, OnInit} from '@angular/core';
import {TraceSet} from './ts-plot.dom';

@Component({
    selector: 'bd2-ts-plot',
    template: `

@if (dataset) {
  <div class="tsplot-shell" [class.compact]="compact">
    <canvas baseChart width="auto" height="200"
      [type]="'line'"
      [datasets]="dataset.traces"
      [options]="chartOptions">
    </canvas>
  </div>
}


`,
    standalone: false
})
export class TSPlotComponent implements OnInit {

  @Input() showLegend = true;
  @Input() compact = false;

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
        legend: {
          display: this.showLegend,
          position: 'top'
        }
      },
      scales: {
        x: { type: 'linear',
             position: 'bottom'
            }
      }
    };
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
