import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {BandSeriesBoxComponent} from './band-series-box.component';

describe('BandSeriesBoxComponent', () => {
  let component: BandSeriesBoxComponent;
  let fixture: ComponentFixture<BandSeriesBoxComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BandSeriesBoxComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BandSeriesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
