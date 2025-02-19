import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsageComponent } from './usage.component';
import { UsageStatsComponent } from './stats/usage-stats.component';
import { UsageStatsService } from './stats/usage-stats.service';
import { GoogleAnalyticsComponent } from './google-analytics/google-analytics.component';
import { GoogleAnalyticsService } from './google-analytics/google-analytics.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('UsageComponent', () => {
  let component: UsageComponent;
  let fixture: ComponentFixture<UsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        UsageComponent,
        UsageStatsComponent,
        GoogleAnalyticsComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        UsageStatsService,
        GoogleAnalyticsService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});