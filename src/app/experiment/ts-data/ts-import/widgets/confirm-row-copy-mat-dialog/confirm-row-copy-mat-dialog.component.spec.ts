import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRowCopyMatDialogComponent } from './confirm-row-copy-mat-dialog.component';

describe('ConfirmRowCopyMatDialogComponent', () => {
  let component: ConfirmRowCopyMatDialogComponent;
  let fixture: ComponentFixture<ConfirmRowCopyMatDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmRowCopyMatDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmRowCopyMatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
