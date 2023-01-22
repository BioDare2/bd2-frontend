import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {SimpleLegendComponent} from './simple-legend.component';

describe('SimpleLegendComponent', () => {
  let component: SimpleLegendComponent;
  let fixture: ComponentFixture<SimpleLegendComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SimpleLegendComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleLegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
