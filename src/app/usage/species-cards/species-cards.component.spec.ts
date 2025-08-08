import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpeciesCardsComponent } from './species-cards.component';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { BioDareEndPoints } from 'src/app/backend/biodare-rest.dom';
import { UsageDataService } from '../usage-data.service';
import { of } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';

describe('SpeciesCardsComponent', () => {
  let component: SpeciesCardsComponent;
  let httpTestingController: HttpTestingController;
  let fixture: ComponentFixture<SpeciesCardsComponent>;
  let usageDataService: UsageDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpeciesCardsComponent],
      imports: [MatSlideToggleModule, FormsModule],
      providers: [
        UsageDataService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: BioDareEndPoints, useValue: {} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeciesCardsComponent);
    component = fixture.componentInstance;
    httpTestingController = TestBed.inject(HttpTestingController);
    usageDataService = TestBed.inject(UsageDataService);

    spyOn(usageDataService, 'getUsageData').and.returnValue(of({
      species_stats: [
        { "speciesId": 1, name: 'Arabidopsis thaliana' },
        { "speciesId": 2, name: 'Homo sapiens' }
      ]
    }));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const req = httpTestingController.expectOne('assets/species/species-info.json');
    req.flush([{ name: 'Species1' }]);
    expect(usageDataService.getUsageData).toHaveBeenCalled();
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
