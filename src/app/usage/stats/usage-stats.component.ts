import { Component, OnInit } from '@angular/core';
import { UsageDataService } from '../usage-data.service';
import { Subscription } from 'rxjs';

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
  usersPerYear: { year: number, value: number }[] = [];
  publicSetsPerYear: { year: number, value: number }[] = [];
  publicSeriesPerYear: { year: number, value: number }[] = [];
  privateSetsPerYear: { year: number, value: number }[] = [];
  privateSeriesPerYear: { year: number, value: number }[] = [];
  private usageStatsSub?: Subscription;

  constructor(private usagedataService: UsageDataService) { }

  ngOnInit(): void {
    this.fetchUsageStats();
  }

  fetchUsageStats() {
    this.usageStatsSub?.unsubscribe();
    this.usageStatsSub = this.usagedataService.getUsageData().subscribe({
      next: (response: any) => {
        console.log('API Response:', response);
        const yearStatsData = response.year_stats;
        this.usageStats = response;

        // Total counts
        this.totalSets = yearStatsData.reduce((sum, stat) => sum + stat.sets, 0);
        this.totalSeries = yearStatsData.reduce((sum, stat) => sum + stat.series, 0);
        this.totalPublicSets = yearStatsData.reduce((sum, stat) => sum + stat.public_sets, 0);
        this.totalPublicSeries = yearStatsData.reduce((sum, stat) => sum + stat.public_series, 0);
        this.totalUsers = yearStatsData.reduce((sum, stat) => sum + stat.users, 0);
        
        // Counts per year
        this.usersPerYear = yearStatsData.map(stat => ({ year: stat.year, value: stat.users }));
        this.publicSetsPerYear = yearStatsData.map(stat => ({ year: stat.year, value: stat.public_sets }));
        this.publicSeriesPerYear = yearStatsData.map(stat => ({ year: stat.year, value: stat.public_series }));
        this.privateSetsPerYear = yearStatsData.map(stat => ({ year: stat.year, value: stat.sets - stat.public_sets }));
        this.privateSeriesPerYear = yearStatsData.map(stat => ({ year: stat.year, value: stat.series - stat.public_series }));
      },
      error: (error) => {
        console.error('Error fetching usage stats:', error);
      }
    });
  }

  ngOnDestroy(): void {
    this.usageStatsSub?.unsubscribe();
  }
}
