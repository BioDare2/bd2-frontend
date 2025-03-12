import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpeciesCardComponent } from './species-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SpeciesCardComponent', () => {
  let component: SpeciesCardComponent;
  let fixture: ComponentFixture<SpeciesCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpeciesCardComponent],
      imports: [BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpeciesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default state', () => {
    expect(component.data.state).toBe('default');
  });

  it('should flip the card on click', () => {
    component.cardClicked();
    expect(component.data.state).toBe('flipped');
    component.cardClicked();
    expect(component.data.state).toBe('default');
  });

  it('should accept input properties', () => {
    component.name = 'Test Species';
    component.image = 'test-image.jpg';
    component.reference = 'Test Reference';
    component.datasets = 10;
    component.publicDatasets = 5;
    component.timeseries = 20;
    component.publicTimeseries = 10;
    component.keywords = 'test, species';

    fixture.detectChanges();

    expect(component.name).toBe('Test Species');
    expect(component.image).toBe('test-image.jpg');
    expect(component.reference).toBe('Test Reference');
    expect(component.datasets).toBe(10);
    expect(component.publicDatasets).toBe(5);
    expect(component.timeseries).toBe(20);
    expect(component.publicTimeseries).toBe(10);
    expect(component.keywords).toBe('test, species');
  });
});