import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material';
import {ConfirmationQuestion, ConfirmDialogComponentComponent} from './confirm-dialog-component.component';

describe('ConfirmDialogComponentComponent', () => {
  let component: ConfirmDialogComponentComponent;
  let fixture: ComponentFixture<ConfirmDialogComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDialogComponentComponent ],
      imports: [MatDialogModule],
      providers: [{provide: MAT_DIALOG_DATA, useValue: new ConfirmationQuestion('sure')}]
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
