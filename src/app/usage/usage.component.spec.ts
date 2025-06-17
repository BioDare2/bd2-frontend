import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsageModule } from './usage.module';
import { UsageComponent } from './usage.component';
import { UsageDataService } from './usage-data.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BioDareEndPoints } from 'src/app/backend/biodare-rest.dom';

describe('UsageComponent', () => {
  let component: UsageComponent;
  let fixture: ComponentFixture<UsageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsageModule],
      declarations: [
        UsageComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        UsageDataService,
        { provide: BioDareEndPoints, useValue: {} }
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
