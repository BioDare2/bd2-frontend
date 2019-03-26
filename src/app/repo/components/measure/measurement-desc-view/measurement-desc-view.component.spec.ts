/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MeasurementDescViewComponent} from './measurement-desc-view.component';

describe('MeasurementDescViewComponent', () => {
  let component: MeasurementDescViewComponent;
  let fixture: ComponentFixture<MeasurementDescViewComponent>;

  beforeEach(async(() => {
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
