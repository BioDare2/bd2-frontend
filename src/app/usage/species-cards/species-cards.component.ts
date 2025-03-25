import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsageDataService } from '../usage-data.service';

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

  constructor(private usageDataService: UsageDataService, private http: HttpClient) {}

  ngOnInit() {
    this.loadSpeciesInfo();
  }

  loadSpeciesInfo() {
    this.http.get<any[]>('assets/species/species-info.json').subscribe(
      data => {
        this.speciesInfo = data;
        this.fetchSpeciesStats();
      },
      error => {
        console.error('Error loading static species info', error);
      }
    );
  }

  fetchSpeciesStats() {
    this.usageDataService.getUsageData().subscribe(
      (response: any) => {
        this.speciesStats = response.species_stats;
  
        this.speciesData = this.speciesInfo.map(species => {
          const stats = this.speciesStats.find(stat => stat.species === species.name);
          return stats ? { ...species, ...stats } : species;
        });
      },
      error => {
        console.error('Error fetching species stats from backend', error);
      }
    );
  }
}