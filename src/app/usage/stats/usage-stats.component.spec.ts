import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsageStatsComponent } from './usage-stats.component';
import { UsageStatsService } from './usage-stats.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('UsageStatsComponent', () => {
  let component: UsageStatsComponent;
  let fixture: ComponentFixture<UsageStatsComponent>;
  let mockUsageStatsService: jasmine.SpyObj<UsageStatsService>;

  beforeEach(async () => {
    mockUsageStatsService = jasmine.createSpyObj('UsageStatsService', ['getUsageStats']);
    await TestBed.configureTestingModule({
      declarations: [UsageStatsComponent],
      imports: [CommonModule],
      providers: [
        { provide: UsageStatsService, useValue: mockUsageStatsService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    const mockStats = {
      year_stats: [
        { year: 2019, sets: 19, series: 3838, public_sets: 19, public_series: 3838, users: 10 },
        { year: 2018, sets: 1, series: 95, public_sets: 1, public_series: 95, users: 5 },
        { year: 2017, sets: 14, series: 1079, public_sets: 0, public_series: 0, users: 3 }
      ]
    };
    mockUsageStatsService.getUsageStats.and.returnValue(of(mockStats));

    fixture = TestBed.createComponent(UsageStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display usage stats', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('div').textContent).toContain('34');
    expect(compiled.querySelector('div').textContent).toContain('5,012');
    expect(compiled.querySelector('div').textContent).toContain('18');
    expect(compiled.querySelector('div').textContent).toContain('3,933');
    expect(compiled.querySelector('div').textContent).toContain('18');
  });

  it('should correctly sum up the counts per year', () => {
    expect(component.totalSets).toBe(34);
    expect(component.totalSeries).toBe(5012);
    expect(component.totalPublicSets).toBe(20);
    expect(component.totalPublicSeries).toBe(3933);
    expect(component.totalUsers).toBe(18);
  });
});