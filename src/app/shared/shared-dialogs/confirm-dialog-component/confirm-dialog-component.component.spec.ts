import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogComponentComponent } from './confirm-dialog-component.component';

describe('ConfirmDialogComponentComponent', () => {
  let component: ConfirmDialogComponentComponent;
  let fixture: ComponentFixture<ConfirmDialogComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDialogComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
