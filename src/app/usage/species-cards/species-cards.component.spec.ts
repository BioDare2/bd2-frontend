import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpeciesCardsComponent } from './species-cards.component';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { UsageDataService } from '../usage-data.service';

describe('SpeciesCardsComponent', () => {
  let component: SpeciesCardsComponent;
  let httpTestingController: HttpTestingController;
  let fixture: ComponentFixture<SpeciesCardsComponent>;
  let usageDataService: UsageDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpeciesCardsComponent],
      providers: [
        UsageDataService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeciesCardsComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    usageDataService = TestBed.inject(UsageDataService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const req = httpTestingController.expectOne('assets/species/species-info.json');
    expect(req.request.method).toBe('GET');
    req.flush([]);
    const statsReq = httpTestingController.expectOne('https://biodare2.ed.ac.uk/api/usage/get_usage_stats');
    expect(statsReq.request.method).toBe('GET');
    statsReq.flush({ species_stats: [] });
  });

  it('should load species info on init', () => {
    const mockSpeciesInfo = [{ name: 'Species1' }, { name: 'Species2' }];
    const reqs = httpTestingController.match('assets/species/species-info.json');
    expect(reqs.length).toBeGreaterThan(0);
    reqs.forEach(req => {
      expect(req.request.method).toBe('GET');
      req.flush(mockSpeciesInfo);
    });
    const statsReq = httpTestingController.expectOne('https://biodare2.ed.ac.uk/api/usage/get_usage_stats');
    expect(statsReq.request.method).toBe('GET');
    statsReq.flush({ species_stats: [] });
    expect(component.speciesInfo).toEqual(mockSpeciesInfo);
  });

  it('should handle error when loading species info', () => {
    spyOn(console, 'error');
    const reqs = httpTestingController.match('assets/species/species-info.json');
    expect(reqs.length).toBeGreaterThan(0);
    reqs.forEach(req => {
      req.error(new ProgressEvent('Network error'));
    });
    expect(console.error).toHaveBeenCalledWith('Error loading static species info', jasmine.any(HttpErrorResponse));
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
