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
      totalSets: 20190,
      totalPublicSets: 12345,
      totalSeries: 123456,
      totalPublicSeries: 67890,
      totalUsers: 7890
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
    expect(compiled.querySelector('div').textContent).toContain('20,190');
    expect(compiled.querySelector('div').textContent).toContain('123,456');
    expect(compiled.querySelector('div').textContent).toContain('7,890');
    expect(compiled.querySelector('div').textContent).toContain('12,345');
    expect(compiled.querySelector('div').textContent).toContain('67,890');
  });
});