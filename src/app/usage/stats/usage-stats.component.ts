import { Component, OnInit } from '@angular/core';
import { UsageStatsService } from './usage-stats.service';

@Component({
  selector: 'bd2-usage-stats',
  templateUrl: './usage-stats.component.html',
  standalone: false
})
export class UsageStatsComponent implements OnInit {
  usageStats: any;

  constructor(private usagestatsService: UsageStatsService) { }

  ngOnInit(): void {
    this.fetchUsageStats();
  }

  fetchUsageStats() {
    this.usagestatsService.getUsageStats().subscribe(
      (response: any) => {
        console.log('API Response:', response);
        this.usageStats = response;
      },
      (error) => {
        console.error('Error fetching usage stats:', error);
      }
    );
  }
}