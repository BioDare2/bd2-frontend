import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'bd2-usage-stats-plot',
  template: `
    <div *ngIf="dataset" class="chart-container">
      <canvas baseChart width="auto" height="200"
              [type]="'bar'"
              [datasets]="dataset"
              [options]="barOptions"
              [labels]="labels"
              ></canvas>
    </div>
  `,
  styleUrl: './usage-stats-plot.component.css',
  standalone: false
})
export class UsageStatsPlotComponent implements OnInit, OnChanges {
  @Input() data: { year: number, users: number }[];

  dataset: any;
  labels: string[];
  barOptions: any;

  constructor() {
    this.barOptions = {
      scales: {
        x: {
          type: 'category',
          position: 'bottom'
        },
        y: {
            beginAtZero: true
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
    if (changes.data) {
      this.updateChart();
    }
  }

  updateChart() {
    if (this.data) {
      console.log('Input data:', this.data);
      this.labels = this.data.map(d => d.year.toString());
      this.dataset = [{
        label: 'New users per Year',
        data: this.data.map(d => d.users),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }];
      console.log('Chart labels:', this.labels);
      console.log('Chart dataset:', this.dataset);
    }
  }
}
