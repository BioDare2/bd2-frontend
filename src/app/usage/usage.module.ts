import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsageComponent } from './usage.component';
import { GoogleAnalyticsComponent } from './google-analytics/google-analytics.component';
import { UsageStatsComponent } from './stats/usage-stats.component';
import { SpeciesCardsComponent } from './species-cards/species-cards.component';
import { UsageRoutingModule } from './usage-routing.module';

@NgModule({
  declarations: [
    UsageComponent,
    GoogleAnalyticsComponent,
    UsageStatsComponent,
    SpeciesCardsComponent
  ],
  imports: [
    CommonModule,
    UsageRoutingModule
  ],
  exports: [
    UsageComponent
  ]
})
export class UsageModule { }