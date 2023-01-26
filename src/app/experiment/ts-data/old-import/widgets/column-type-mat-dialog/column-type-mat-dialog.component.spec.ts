import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import {ColumnTypeMatDialogComponent, ColumnTypeMatDialogComponentParams} from './column-type-mat-dialog.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {CellCoordinates, CellRange, CellRangeDescription} from '../../../ts-import/sheet-dom';

describe('ColumnTypeMatDialogComponent', () => {
  let component: ColumnTypeMatDialogComponent;
  let fixture: ComponentFixture<ColumnTypeMatDialogComponent>;

  beforeEach(waitForAsync(() => {

    const ref = {};

    const f = new CellCoordinates(2, 1);
    const l = new CellCoordinates(3, 2);

    const range = new CellRange(f, l);
    const data = new ColumnTypeMatDialogComponentParams(new CellRangeDescription(range), 3, false, 'A');

    TestBed.configureTestingModule({
      declarations: [ ColumnTypeMatDialogComponent ],
      imports: [MatDialogModule, FormsModule],
      providers: [
        {provide: MatDialogRef, useValue: ref},
        {provide: MAT_DIALOG_DATA, useValue: data}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnTypeMatDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
