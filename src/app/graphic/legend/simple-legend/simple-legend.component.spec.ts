import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SimpleLegendComponent} from './simple-legend.component';

describe('SimpleLegendComponent', () => {
  let component: SimpleLegendComponent;
  let fixture: ComponentFixture<SimpleLegendComponent>;

  beforeEach(async(() => {
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
