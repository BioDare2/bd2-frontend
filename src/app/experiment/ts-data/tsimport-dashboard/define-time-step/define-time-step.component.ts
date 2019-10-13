import { Component, Input, OnInit} from '@angular/core';
import {ImportDetails} from '../../import-dom';
import {TimeColumnType} from '../../ts-import/sheet-dom';
import {CellSelection} from '../data-table-dom';

@Component({
  selector: 'bd2-define-time-step',
  templateUrl: './define-time-step.component.html',
  styles: []
})
export class DefineTimeStepComponent implements OnInit {

  @Input()
  importDetails: ImportDetails;

  timeTypeOptions = [TimeColumnType.TIME_IN_HOURS, TimeColumnType.TIME_IN_MINUTES,
    TimeColumnType.TIME_IN_SECONDS, TimeColumnType.IMG_NUMBER];

  get firstTimeCell() {
    return this.importDetails ? this.importDetails.firstTimeCell : undefined;
  }

  constructor() { }

  ngOnInit() {
  }

  selectFirstTime(selection: CellSelection) {
    this.importDetails.firstTimeCell = selection;
  }

  firstTimeNotNumber() {
    if (this.firstTimeCell) {
      return isNaN(Number(this.firstTimeCell.value));
    }
    return false;
  }


}
