import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsageDataService } from '../usage-data.service';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';

declare const google: any;

@Component({
  selector: 'bd2-google-analytics',
  templateUrl: './google-analytics.component.html',
  standalone: false
})
export class GoogleAnalyticsComponent implements OnInit, OnDestroy {
  private analyticsSub?: Subscription;
  private API_KEY = environment.googleAnalyticsApiKey;
  analyticsData: any;
  chart: any;
  topCountries: { country: string, activeUsers: number }[] = [];

  constructor(private usagedataService: UsageDataService) { }

  ngOnInit(): void {
    this.fetchAnalyticsData();
  }

  fetchAnalyticsData() {
    this.analyticsSub = this.usagedataService.getUsageData().subscribe({
      next: (response: any) => {
        console.log('API Response:', response);
        const analyticsData = response.analytics;
        const filteredData = analyticsData.filter((row: any) => row.country !== '(not set)');
        this.topCountries = filteredData.sort((a, b) => b.activeUsers - a.activeUsers).slice(0, 5);
        this.drawChart(analyticsData);
      },
      error: (error) => {
        console.error('Error fetching analytics data:', error);
      }
    });
  }

  drawChart(data: any) {
    google.charts.load('current', {
      packages: ['geochart'],
      mapsApiKey: this.API_KEY
    });

    google.charts.setOnLoadCallback(() => {
      const chartData = [['Country', 'Users']];
      data.forEach((row: any) => {
        chartData.push([row.country, row.activeUsers]);
      });

      console.log('Chart Data:', chartData);

      const dataTable = google.visualization.arrayToDataTable(chartData);
      const options = {
        colorAxis: { colors: ['#9fc5e8', '#4374e0'] }
      };

      this.chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
      this.chart.draw(dataTable, options);
    });
  }

  ngOnDestroy(): void {
    this.analyticsSub?.unsubscribe();
    if (this.chart && typeof this.chart.clearChart === 'function') {
      this.chart.clearChart();
    }
    const chartDiv = document.getElementById('chart_div');
    if (chartDiv) chartDiv.innerHTML = '';
  }
}
