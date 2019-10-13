import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefineTimeStepComponent } from './define-time-step.component';

describe('DefineTimeStepComponent', () => {
  let component: DefineTimeStepComponent;
  let fixture: ComponentFixture<DefineTimeStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefineTimeStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineTimeStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
