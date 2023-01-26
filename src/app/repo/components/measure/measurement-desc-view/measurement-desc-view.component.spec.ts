/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {MeasurementDescViewComponent} from './measurement-desc-view.component';

describe('MeasurementDescViewComponent', () => {
  let component: MeasurementDescViewComponent;
  let fixture: ComponentFixture<MeasurementDescViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MeasurementDescViewComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasurementDescViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
