import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBackgroundsLabelsStepComponent } from './select-backgrounds-labels-step.component';

describe('SelectBackgroundsLabelsStepComponent', () => {
  let component: SelectBackgroundsLabelsStepComponent;
  let fixture: ComponentFixture<SelectBackgroundsLabelsStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBackgroundsLabelsStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBackgroundsLabelsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
