import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'bd2-usage-stats-plot',
  template: `
    @if (dataset) {
      <div class="chart-container">
        <canvas baseChart width="auto" height="200"
          [type]="'bar'"
          [datasets]="dataset"
          [options]="barOptions"
          [labels]="labels"
        ></canvas>
      </div>
    }
    `,
  styleUrl: './usage-stats-plot.component.css',
  standalone: false
})
export class UsageStatsPlotComponent implements OnInit, OnChanges {
  @Input() publicData: { year: number, value: number }[];
  @Input() privateData: { year: number, value: number }[];
  @Input() chartLabel: string;
  @Input() barColor: string = 'rgba(75, 192, 192, 0.4)';

  dataset: any;
  labels: string[];
  barOptions: any;

  constructor() {
    this.barOptions = {
      scales: {
        x: {
          type: 'category',
          position: 'bottom',
          stacked: true
        },
        y: {
            beginAtZero: true,
            stacked:true
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      }
    };
  }

  ngOnInit() {
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.publicData || changes.privateData) {
      this.updateChart();
    }
  }

  updateChart() {
    if (this.publicData || this.privateData) {
      console.log('Input public data:', this.publicData);
      console.log('Input private data:', this.privateData);

      const dataToUse = this.publicData && this.publicData.length ? this.publicData : this.privateData;
      if (dataToUse) {
        this.labels = dataToUse.map(d => d.year.toString());
      } else {
        this.labels = [];
      }

      this.dataset = [];

      if (this.privateData && this.privateData.length) {
        this.dataset.push({
          label: this.publicData && this.publicData.length ? `Private ${this.chartLabel}` : this.chartLabel,
          data: this.privateData.map(d => d.value),
          backgroundColor: 'rgba(128, 128, 128, 0.4)',
          borderColor: 'rgba(128, 128, 128, 1)',
          borderWidth: 1
        });
      }

      if (this.publicData && this.publicData.length) {
        this.dataset.push({
          label: this.privateData && this.privateData.length ? `Public ${this.chartLabel}` : this.chartLabel,
          data: this.publicData.map(d => d.value),
          backgroundColor: this.barColor,
          borderColor: this.barColor.replace('0.4', '1'),
          borderWidth: 1
        });
      }

      console.log('Chart labels:', this.labels);
      console.log('Chart dataset:', this.dataset);
    }
  }
}
