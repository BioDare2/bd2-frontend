import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsageComponent } from './usage.component';
import { GoogleAnalyticsComponent } from './google-analytics/google-analytics.component';
import { UsageStatsComponent } from './stats/usage-stats.component';
import { UsageRoutingModule } from './usage-routing.module';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    UsageComponent,
    GoogleAnalyticsComponent,
    UsageStatsComponent
  ],
  imports: [
    CommonModule,
    UsageRoutingModule
  ],
  providers: [
    provideHttpClient()
  ],
  exports: [
    UsageComponent
  ]
})
export class UsageModule { }