import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataTableDependentStep} from '../data-table-dependent-step';
import {DataTableService} from '../data-table.service';
import {FeedbackService} from '../../../../../feedback/feedback.service';
import {CellSelection} from '../../import-dom';


@Component({
  selector: 'bd2-select-data-start-step',
  templateUrl: './select-data-start-step.component.html',
  styles: [],
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: ['importDetails']
})
export class SelectDataStartStepComponent extends DataTableDependentStep implements OnInit, OnDestroy {

  constructor(dataService: DataTableService, feedback: FeedbackService) {
    super(dataService, feedback);
  }


  applyDefaultSelections() {
    super.applyDefaultSelections();

    if (this.dataStart && !this.dataStart.fake) {
      this.selectDataStart(this.reselect(this.dataStart));
    } else {
      // let set data to the next row col after time
      if (this.firstTimeCell) {
        const fake = this.reselect(
          new CellSelection(
            this.firstTimeCell.colIx + 1, this.colNumber(this.firstTimeCell.colIx + 1), undefined,
            this.firstTimeCell.rowIx + 1, this.rowNumber(this.firstTimeCell.rowIx + 1), undefined, undefined
          ));
        fake.fake = true;
        this.selectDataStart(fake);
      }
    }
  }

  markSelections() {
    super.markSelections();
    this.markFirstTime();
    this.markLabels();
  }



}
