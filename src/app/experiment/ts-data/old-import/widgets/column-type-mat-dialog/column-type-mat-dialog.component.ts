import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  CellCoordinates,
  CellRange,
  CellRangeDescription,
  CellRole,
  DataColumnProperties,
  TimeColumnProperties,
  TimeColumnType
} from '../../../ts-import/sheet-dom';
import {NgForm} from '@angular/forms';

export class ColumnTypeMatDialogComponentParams {

  constructor(public selectedRange: CellRangeDescription,
              public lastCol?: number,
              public showTime?: boolean,
              public label?: string) {}
}

@Component({
  templateUrl: './column-type-mat-dialog.component.html',
  styles: []
})
export class ColumnTypeMatDialogComponent implements OnInit {

  lastCol: number;

  errors: string[] = null;
  rangeLabel: string;
  cellRole: string;
  cellRoles = [CellRole.IGNORED, CellRole.BACKGROUND, CellRole.TIME, CellRole.DATA];
  dataLabel: string;
  timeType: string;
  timeTypeOptions = [TimeColumnType.TIME_IN_HOURS, TimeColumnType.TIME_IN_MINUTES,
    TimeColumnType.TIME_IN_SECONDS, TimeColumnType.IMG_NUMBER];
  firstRow: number;
  timeOffset: number;
  imgInterval: number;
  rangeSize: number;
  private orgRange: CellRangeDescription;

  @ViewChild('columnTypeForm', { static: true })
  private columnTypeForm: NgForm;

  constructor(private myself: MatDialogRef<ColumnTypeMatDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data: ColumnTypeMatDialogComponentParams) {

    this.lastCol = data.lastCol;
    this.showTime = data.showTime;
    this.show(data.selectedRange, data.label);
  }

  ngOnInit() {
  }

  set showTime(val: boolean) {
    if (val) {
      this.cellRoles = [CellRole.IGNORED, CellRole.BACKGROUND, CellRole.TIME, CellRole.DATA];
    } else {
      this.cellRoles = [CellRole.IGNORED, CellRole.BACKGROUND, CellRole.DATA];
    }
  }

  isData(): boolean {
    return (this.cellRole === CellRole.DATA.name);
  }

  isTime(): boolean {
    return (this.cellRole === CellRole.TIME.name);
  }

  isImageBased(): boolean {
    return (this.isTime() && (this.timeType === TimeColumnType.IMG_NUMBER.name));
  }

  show(selectedRange: CellRangeDescription, label?: string) {

    if (!selectedRange) {
      return;
    }


    this.orgRange = selectedRange;

    this.rangeSize = selectedRange.range.size();
    this.rangeLabel = label ? label : selectedRange.columnRangeLabel;
    // this.rangeContent = selectedRange.content;
    if (selectedRange.role) {
      this.cellRole = selectedRange.role.name;
    }

    if (selectedRange.role == CellRole.DATA && selectedRange.details) {
      this.dataLabel = selectedRange.details.dataLabel;
    }
    if (selectedRange.role == CellRole.TIME && selectedRange.details) {
      this.timeType = selectedRange.details.timeType.name;
      this.timeOffset = selectedRange.details.timeOffset;
      this.imgInterval = selectedRange.details.imgInterval;
      this.firstRow = selectedRange.details.firstRow;
    }

  }

  hide() {
    this.myself.close();
  }

  accepted() {


    if (!this.isValid()) {
      return;
    }

    this.myself.close(this.emitDescription());


  }

  acceptedAndNext() {
    if (!this.isValid()) {
      return;
    }

    const description = this.emitDescription();
    if (description.range.lastCol >= this.lastCol) {
      // this.hide();
      // return;
    } else {

      const range = this.nextRange(description.range, this.rangeSize);
      const next = new CellRangeDescription(range);
      next.role = CellRole.DATA;
      next.details = description.details;

      description.follow = next;
    }


    this.myself.close(description);

  }

  nextRange(last: CellRange, size: number) {

    const f = last.lastCol + 1;
    let l = f + size - 1;
    l = Math.min(l, this.lastCol);

    return new CellRange(new CellCoordinates(f, last.first.row), new CellCoordinates(l, last.first.row));
  }

  emitDescription(): CellRangeDescription {
    const range = this.recalculateRange(this.orgRange.range);

    let details: any = {};
    if (this.isData()) {
      details = new DataColumnProperties(this.dataLabel);
    } else if (this.isTime()) {
      const v = new TimeColumnProperties();
      v.firstRow = this.firstRow;
      v.timeType = TimeColumnType.get(this.timeType);
      v.timeOffset = this.timeOffset;
      if (this.isImageBased()) {
        v.imgInterval = this.imgInterval;
      }

      details = v;
    }

    const description = new CellRangeDescription(range, this.orgRange.content);
    description.role = CellRole.get(this.cellRole);
    description.details = details;


    return description;

  }

  protected isValid(): boolean {
    const err: string[] = [];
    const role = CellRole.get(this.cellRole);
    if (!role) {
      err.push('Unknown role: ' + this.cellRole);
    }
    if (this.isData()) {
      if (!this.dataLabel || this.dataLabel.trim() === '') {
        err.push('Non empty data label is required');
        this.dataLabel = null;
      }
    }
    if (this.isTime()) {
      if (!this.firstRow || this.firstRow < 1) {
        err.push('Row nr of the first time point must be >= 1');
      }
      if (this.isImageBased()) {
        if (!this.imgInterval || this.imgInterval <= 0) {
          err.push('Image interval must be > 0');
        }
      }
    } else {
      // not time
      if (!this.rangeSize || this.rangeSize < 1) {
        err.push('Block size must be >= 1');
      }
    }

    if (err.length === 0) {
      this.errors = null;
      return true;
    }
    return false;

  }

  protected recalculateRange(range: CellRange): CellRange {

    let f = range.first;
    // let l = range.last;

    if (this.isTime()) {
      // set row to selected time row
      f = new CellCoordinates(f.col, this.firstRow);
      return new CellRange(f, f);
    }


    if (this.rangeSize !== range.size()) {
      const nr = f.col + this.rangeSize - 1;
      const l = new CellCoordinates(Math.min(nr, this.lastCol), f.row);
      return new CellRange(f, l);
    }
    return range;
  }

}
