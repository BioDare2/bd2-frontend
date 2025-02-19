import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { GoogleAnalyticsComponent } from './google-analytics.component';
import { GoogleAnalyticsService } from './google-analytics.service';
import { of, throwError } from 'rxjs';

// Mock the google object
const googleMock = {
  charts: {
    load: jasmine.createSpy('load').and.callFake((version: string, settings: any) => {
      if (settings && typeof settings.callback === 'function') {
        settings.callback();
      }
    }),
    setOnLoadCallback: jasmine.createSpy('setOnLoadCallback').and.callFake((callback: Function) => {
      callback();
    })
  },
  visualization: {
    arrayToDataTable: jasmine.createSpy('arrayToDataTable').and.callFake((data: any) => data),
    GeoChart: jasmine.createSpy('GeoChart').and.returnValue({
      draw: jasmine.createSpy('draw')
    })
  }
};

// Mock the document.getElementById method
const mockElement = document.createElement('div');
mockElement.id = 'chart_div';
document.getElementById = jasmine.createSpy('getElementById').and.returnValue(mockElement);

describe('GoogleAnalyticsComponent', () => {
  let component: GoogleAnalyticsComponent;
  let fixture: ComponentFixture<GoogleAnalyticsComponent>;
  let googleAnalyticsService: GoogleAnalyticsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoogleAnalyticsComponent],
      providers: [
        GoogleAnalyticsService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    (window as any).google = googleMock;

    fixture = TestBed.createComponent(GoogleAnalyticsComponent);
    component = fixture.componentInstance;
    googleAnalyticsService = TestBed.inject(GoogleAnalyticsService);

    spyOn(googleAnalyticsService, 'getAnalyticsData').and.returnValue(of([
      { country: 'Country1', activeUsers: 100 },
      { country: 'Country2', activeUsers: 200 }
    ]));

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch analytics data on init', () => {
    component.ngOnInit();
    expect(googleAnalyticsService.getAnalyticsData).toHaveBeenCalled();
  });

  it('should draw chart with fetched data', () => {
    spyOn(component, 'drawChart').and.callThrough();
    component.fetchAnalyticsData();
    expect(component.drawChart).toHaveBeenCalledWith([
      { country: 'Country1', activeUsers: 100 },
      { country: 'Country2', activeUsers: 200 }
    ]);
  });

  it('should handle error when fetching analytics data', () => {
    spyOn(console, 'error');
    (googleAnalyticsService.getAnalyticsData as jasmine.Spy).and.returnValue(throwError(() => new Error('Error fetching analytics data')));
    component.fetchAnalyticsData();
    expect(console.error).toHaveBeenCalledWith('Error fetching analytics data:', new Error('Error fetching analytics data'));
  });

  it('should verify google.visualization is defined', () => {
    console.log('google.visualization:', (window as any).google.visualization);
    expect((window as any).google.visualization).toBeDefined();
    expect((window as any).google.visualization.arrayToDataTable).toBeDefined();
    expect((window as any).google.visualization.GeoChart).toBeDefined();
  });
});