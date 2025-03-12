import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsageStatsPlotComponent } from './usage-stats-plot.component';
import { SimpleChanges } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NgChartsModule } from 'ng2-charts';

describe('UsageStatsPlotComponent', () => {
  let component: UsageStatsPlotComponent;
  let fixture: ComponentFixture<UsageStatsPlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UsageStatsPlotComponent],
      imports: [NgChartsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageStatsPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize chart options', () => {
    expect(component.barOptions).toEqual({
      scales: {
        x: {
          type: 'category',
          position: 'bottom',
          stacked: true
        },
        y: {
          beginAtZero: true,
          stacked: true
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      }
    });
  });

  it('should update chart on input changes', () => {
    const publicData = [
      { year: 2019, value: 10 },
      { year: 2020, value: 20 }
    ];
    const privateData = [
      { year: 2019, value: 5 },
      { year: 2020, value: 15 }
    ];

    component.publicData = publicData;
    component.privateData = privateData;
    component.chartLabel = 'Test Chart';
    component.ngOnChanges({
      publicData: { currentValue: publicData, previousValue: null, firstChange: true, isFirstChange: () => true },
      privateData: { currentValue: privateData, previousValue: null, firstChange: true, isFirstChange: () => true }
    } as SimpleChanges);

    expect(component.labels).toEqual(['2019', '2020']);
    expect(component.dataset.length).toBe(2);
    expect(component.dataset[0].label).toBe('Private Test Chart');
    expect(component.dataset[1].label).toBe('Public Test Chart');
  });

  it('should render chart container when dataset is available', () => {
    component.dataset = [
      {
        label: 'Test Data',
        data: [10, 20],
        backgroundColor: 'rgba(75, 192, 192, 0.4)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ];
    fixture.detectChanges();

    const chartContainer = fixture.debugElement.query(By.css('.chart-container'));
    expect(chartContainer).toBeTruthy();
  });
});