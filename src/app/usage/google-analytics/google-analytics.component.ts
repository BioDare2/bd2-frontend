import { Component, OnInit, OnDestroy, AfterViewChecked, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { UsageDataService } from '../usage-data.service';
import { environment } from '../../../environments/environment';
import { Subscription } from 'rxjs';

declare const google: any;

@Component({
  selector: 'bd2-google-analytics',
  templateUrl: './google-analytics.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class GoogleAnalyticsComponent implements OnInit, OnDestroy, AfterViewChecked {
  private analyticsSub?: Subscription;
  private API_KEY = environment.googleAnalyticsApiKey;
  private chartDrawn = false;
  analyticsData: any;
  chart: any;
  topCountries: { country: string, activeUsers: number }[] = [];

  constructor(
    private usagedataService: UsageDataService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.fetchAnalyticsData();
  }

  ngAfterViewChecked(): void {
    // Only draw chart if analyticsData is set, chart_div exists, and chart not yet drawn
    if (this.analyticsData && !this.chartDrawn && document.getElementById('chart_div')) {
      this.drawChart(this.analyticsData);
      this.chartDrawn = true;
    }
  }

  fetchAnalyticsData() {
    this.analyticsSub = this.usagedataService.getUsageData().subscribe({
      next: (response: any) => {
        console.log('API Response:', response);
        const analyticsData = response.analytics;
        this.analyticsData = analyticsData;
        const filteredData = analyticsData.filter((row: any) => row.country !== '(not set)');
        this.topCountries = filteredData.sort((a, b) => b.activeUsers - a.activeUsers).slice(0, 5);
        this.chartDrawn = false; // Reset so chart can be drawn after DOM update
        this.cdr.detectChanges(); 
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
      this.chart = null;
    }
    const chartDiv = document.getElementById('chart_div');
    if (chartDiv && chartDiv.parentNode) {
      chartDiv.parentNode.removeChild(chartDiv);
    }
    this.analyticsData = null;
  }
}
