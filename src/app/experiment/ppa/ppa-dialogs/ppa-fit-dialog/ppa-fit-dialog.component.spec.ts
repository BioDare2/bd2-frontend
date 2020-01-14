import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PPAFitDialogComponent } from './ppa-fit-dialog.component';

describe('PpaFitDialogComponent', () => {
  let component: PPAFitDialogComponent;
  let fixture: ComponentFixture<PPAFitDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PPAFitDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PPAFitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
