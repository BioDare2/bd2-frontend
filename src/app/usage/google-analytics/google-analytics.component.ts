import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from './google-analytics.service';
import { environment } from '../../../environments/environment';

declare const google: any;

@Component({
  selector: 'bd2-google-analytics',
  templateUrl: './google-analytics.component.html',
  standalone: false
})
export class GoogleAnalyticsComponent implements OnInit {
  private API_KEY = environment.googleAnalyticsApiKey;
  analyticsData: any;
  topCountries: { country: string, activeUsers: number }[] = [];

  constructor(private googleanalyticsService: GoogleAnalyticsService) { }

  ngOnInit(): void {
    this.fetchAnalyticsData();
  }

  fetchAnalyticsData() {
    this.googleanalyticsService.getAnalyticsData().subscribe(
      (response: any) => {
        console.log('API Response:', response);
        this.topCountries = response.sort((a, b) => b.activeUsers - a.activeUsers).slice(0, 5);
        this.drawChart(response);
      },
      (error) => {
        console.error('Error fetching analytics data:', error);
      }
    );
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

      const chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
      chart.draw(dataTable, options);
    });
  }
}
