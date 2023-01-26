import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {PPAPeriodPlotComponent} from './ppaperiod-plot.component';
import {BD2NgxHBoxplotModule} from 'bd2-ngx-hboxplot';

describe('PPAPeriodPlotComponent', () => {
  let component: PPAPeriodPlotComponent;
  let fixture: ComponentFixture<PPAPeriodPlotComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BD2NgxHBoxplotModule],
      declarations: [ PPAPeriodPlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPAPeriodPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
