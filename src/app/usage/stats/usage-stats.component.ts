import { Component, OnInit } from '@angular/core';
import { UsageStatsService } from './usage-stats.service';

@Component({
  selector: 'bd2-usage-stats',
  templateUrl: './usage-stats.component.html',
  styleUrl: './usage-stats.component.css',
  standalone: false
})
export class UsageStatsComponent implements OnInit {
  usageStats: any;
  totalSets: number = 0;
  totalSeries: number = 0;
  totalPublicSets: number = 0;
  totalPublicSeries: number = 0;
  totalUsers: number = 0;
  usersPerYear: { year: number, users: number }[] = [];

  constructor(private usagestatsService: UsageStatsService) { }

  ngOnInit(): void {
    this.fetchUsageStats();
  }

  fetchUsageStats() {
    this.usagestatsService.getUsageStats().subscribe(
      (response: any) => {
        console.log('API Response:', response);
        const yearStatsData = response.year_stats;
        this.usageStats = response;

        // Sum up the counts per year
        this.totalSets = yearStatsData.reduce((sum, stat) => sum + stat.sets, 0);
        this.totalSeries = yearStatsData.reduce((sum, stat) => sum + stat.series, 0);
        this.totalPublicSets = yearStatsData.reduce((sum, stat) => sum + stat.public_sets, 0);
        this.totalPublicSeries = yearStatsData.reduce((sum, stat) => sum + stat.public_series, 0);
        this.totalUsers = yearStatsData.reduce((sum, stat) => sum + stat.users, 0);
        this.usersPerYear = yearStatsData.map(stat => ({ year: stat.year, users: stat.users }));
        console.log('Users per year data:', this.usersPerYear);

      },
      (error) => {
        console.error('Error fetching usage stats:', error);
      }
    );
  }
}