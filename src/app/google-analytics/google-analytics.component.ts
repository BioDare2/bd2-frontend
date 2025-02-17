import { Component, OnInit } from '@angular/core';
import { GoogleAnalyticsService } from './google-analytics.service';

declare const google: any;

@Component({
  selector: 'bd2-analytics',
  templateUrl: './google-analytics.component.html',
  styleUrls: ['./google-analytics.component.css'],
  standalone: true
})
export class GoogleAnalyticsComponent implements OnInit {
  private API_KEY = 'AIzaSyDF_971Jkn9spiaqFc5xc3fAXjDN6qimdU';
  analyticsData: any;

  constructor(private googleanalyticsService: GoogleAnalyticsService) { }

  ngOnInit(): void {
    this.fetchAnalyticsData();
  }

  fetchAnalyticsData() {
    this.googleanalyticsService.getAnalyticsData().subscribe(
      (response: any) => {
        console.log('API Response:', response);
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
        chartData.push([row.country, row.sessions]);
      });

      console.log('Chart Data:', chartData);

      const dataTable = google.visualization.arrayToDataTable(chartData);
      const options = {
        colorAxis: { colors: ['#e7711c', '#4374e0'] }
      };

      const chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
      chart.draw(dataTable, options);
    });
  }
}
