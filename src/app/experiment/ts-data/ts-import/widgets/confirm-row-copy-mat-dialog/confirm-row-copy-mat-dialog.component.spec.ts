import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ConfirmRowCopyMatDialogComponent} from './confirm-row-copy-mat-dialog.component';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material';
import {CellCoordinates, CellRange, CellRangeDescription} from '../../sheet-dom';

describe('ConfirmRowCopyMatDialogComponent', () => {
  let component: ConfirmRowCopyMatDialogComponent;
  let fixture: ComponentFixture<ConfirmRowCopyMatDialogComponent>;

  beforeEach(async(() => {

    const f = new CellCoordinates(2, 1);
    const l = new CellCoordinates(2, 1);

    const range = new CellRange(f, l);
    const data = new CellRangeDescription(range);

    TestBed.configureTestingModule({
      declarations: [ ConfirmRowCopyMatDialogComponent ],
      imports: [MatDialogModule],
      providers: [{provide: MAT_DIALOG_DATA, useValue: data}]
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
