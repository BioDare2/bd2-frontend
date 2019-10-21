import {Component, OnDestroy, OnInit} from '@angular/core';
import {TimeColumnType} from '../../ts-import/sheet-dom';
import {DataTableService} from '../data-table.service';
import {FeedbackService} from '../../../../feedback/feedback.service';
import {DataTableDependentStep} from '../data-table-dependent-step';
import {CellSelection} from '../data-table-dom';

@Component({
  selector: 'bd2-define-time-step',
  templateUrl: './define-time-step.component.html',
  styles: [],
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: ['importDetails']
})
export class DefineTimeStepComponent extends DataTableDependentStep implements OnInit, OnDestroy {

  timeTypeOptions = [TimeColumnType.TIME_IN_HOURS, TimeColumnType.TIME_IN_MINUTES,
    TimeColumnType.TIME_IN_SECONDS, TimeColumnType.IMG_NUMBER];

  constructor(dataService: DataTableService, feedback: FeedbackService) {
    super(dataService, feedback);
  }


  applyDefaultSelections() {
    super.applyDefaultSelections();

    if (this.firstTimeCell && !this.firstTimeCell.fake) {
      this.selectFirstTime(this.reselect(this.firstTimeCell));
    } else {
      // lets set sensible defaults
      let fake = this.importDetails.inRows ?
        new CellSelection(
          1, this.colNumber(1), undefined,
          0, this.rowNumber(0), undefined, undefined
        ) :
        new CellSelection(
          0, this.colNumber(0), undefined,
          1, this.rowNumber(1), undefined, undefined
        );
      fake = this.reselect(fake);
      fake.fake = true;
      this.selectFirstTime(fake);
    }
  }

  firstTimeNotNumber() {
    if (this.firstTimeCell) {
      return isNaN(Number(this.firstTimeCell.value));
    }
    return false;
  }


}
