import {Component, OnDestroy, OnInit} from '@angular/core';
import {TimeColumnType} from '../../ts-import/sheet-dom';
import {DataTableService} from '../data-table.service';
import {FeedbackService} from '../../../../feedback/feedback.service';
import {DataTableDependentStep} from '../data-table-dependent-step';
import {DataTableSlice} from '../data-table-dom';

@Component({
  selector: 'bd2-define-time-step',
  templateUrl: './define-time-step.component.html',
  styles: [],
  providers: [ DataTableService],
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: ['importDetails']
})
export class DefineTimeStepComponent extends DataTableDependentStep implements OnInit, OnDestroy {

  timeTypeOptions = [TimeColumnType.TIME_IN_HOURS, TimeColumnType.TIME_IN_MINUTES,
    TimeColumnType.TIME_IN_SECONDS, TimeColumnType.IMG_NUMBER];

  constructor(dataService: DataTableService, feedback: FeedbackService) {
    super(dataService, feedback);
  }


  setDataSlice(dataSlice: DataTableSlice) {
    super.setDataSlice(dataSlice);

    if (this.firstTimeCell) {
      this.selectFirstTime(this.reselect(this.firstTimeCell));
    }
  }

  firstTimeNotNumber() {
    if (this.firstTimeCell) {
      return isNaN(Number(this.firstTimeCell.value));
    }
    return false;
  }


}
