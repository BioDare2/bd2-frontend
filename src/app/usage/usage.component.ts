import { Component, OnInit } from '@angular/core';
import { UsageDataService } from './usage-data.service';

@Component({
  selector: 'bd2-usage',
  templateUrl: './usage.component.html',
  standalone: false
})
export class UsageComponent implements OnInit {
  currentDate: Date;

  constructor(private usagedataService: UsageDataService) { }

  ngOnInit(): void {
    this.fetchUsageDate();
  }

  fetchUsageDate() {
    this.usagedataService.getUsageData().subscribe(
      (response: any) => {
        console.log('API Response:', response);
        this.currentDate = new Date(response.timestamp);
      },
      (error) => {
        console.error('Error fetching usage date:', error);
      }
    );
  }
}