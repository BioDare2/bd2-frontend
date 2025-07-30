import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsageComponent } from './usage.component';
import { GoogleAnalyticsComponent } from './google-analytics/google-analytics.component';
import { UsageStatsComponent } from './stats/usage-stats.component';
import { UsageStatsPlotComponent } from './stats/usage-stats-plot.component';
import { NgChartsModule } from 'ng2-charts';
import { SpeciesCardComponent } from './species-cards/species-card.component';
import { SpeciesCardsComponent } from './species-cards/species-cards.component';
import { UsageRoutingModule } from './usage-routing.module';
import { FormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    UsageComponent,
    GoogleAnalyticsComponent,
    UsageStatsComponent,
    UsageStatsPlotComponent,
    SpeciesCardComponent,
    SpeciesCardsComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    UsageRoutingModule,
    FormsModule,
    MatSlideToggleModule
  ],
  exports: [
    UsageComponent
  ]
})
export class UsageModule { }