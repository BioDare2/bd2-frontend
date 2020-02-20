import {Component, Inject, OnInit} from '@angular/core';
import {CellRangeDescription} from '../../../ts-import/sheet-dom';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './confirm-row-copy-mat-dialog.component.html',
  styles: []
})
export class ConfirmRowCopyMatDialogComponent implements OnInit {

  rowNr: number;
  values: string;
  orgRange: CellRangeDescription;

  constructor(@Inject(MAT_DIALOG_DATA) data: CellRangeDescription) {

    this.show(data);
  }

  ngOnInit() {
  }

  show(selectedRange: CellRangeDescription) {
    this.orgRange = selectedRange;

    this.rowNr = selectedRange.range.first.row;
    this.values = selectedRange.content;


  }

}
