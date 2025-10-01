import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsageDataService } from '../usage-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bd2-species-cards',
  templateUrl: './species-cards.component.html',
  styleUrl: './species-cards.component.css',
  standalone: false
})

export class SpeciesCardsComponent implements OnInit {
  speciesStats: any[] = [];
  speciesInfo: any[] = [];
  speciesData: any[] = [];
  animationEnabled = true;
  private speciesInfoSub?: Subscription;
  private speciesStatsSub?: Subscription;

  constructor(private usageDataService: UsageDataService, private http: HttpClient) {}

  ngOnInit() {
    this.loadSpeciesInfo();
  }

  loadSpeciesInfo() {
    this.speciesInfoSub = this.http.get<any[]>('assets/species/species-info.json').subscribe({
      next: data => {
        this.speciesInfo = data;
        this.fetchSpeciesStats();
      },
      error: error => {
        console.error('Error loading static species info', error);
      }
    });
  }

  fetchSpeciesStats() {
    this.speciesStatsSub = this.usageDataService.getUsageData().subscribe({
      next: (response: any) => {
        this.speciesStats = response.species_stats;
  
        this.speciesData = this.speciesInfo.map(species => {
          const stats = this.speciesStats.find(stat => stat.species === species.name);
          return stats ? { ...species, ...stats } : species;
        });
      },
      error: error => {
        console.error('Error fetching species stats from backend', error);
      }
    });
  }

  ngOnDestroy(): void {
    this.speciesInfoSub?.unsubscribe();
    this.speciesStatsSub?.unsubscribe();
  }
}
