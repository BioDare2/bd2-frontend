import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsageModule } from './usage.module';
import { UsageComponent } from './usage.component';
import { UsageStatsComponent } from './stats/usage-stats.component';
import { SpeciesCardsComponent } from './species-cards/species-cards.component'; 
import { GoogleAnalyticsComponent } from './google-analytics/google-analytics.component';
import { UsageDataService } from './usage-data.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('UsageComponent', () => {
  let component: UsageComponent;
  let fixture: ComponentFixture<UsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsageModule],
      declarations: [
        UsageComponent,
        UsageStatsComponent,
        GoogleAnalyticsComponent,
        SpeciesCardsComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        UsageDataService
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