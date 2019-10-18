import {Component, OnDestroy, OnInit} from '@angular/core';
import {CellSelection} from '../data-table-dom';
import {DataTableService} from '../data-table.service';
import {FeedbackService} from '../../../../feedback/feedback.service';
import {DataTableDependentStep} from '../data-table-dependent-step';

@Component({
  selector: 'bd2-import-labels-step',
  templateUrl: './import-labels-step.component.html',
  styles: [],
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: ['importDetails']
})
export class ImportLabelsStepComponent extends DataTableDependentStep implements OnInit, OnDestroy {

  constructor(dataService: DataTableService, feedback: FeedbackService) {
    super(dataService, feedback);
  }


  applyDefaultSelections() {
    super.applyDefaultSelections();

    if (this.labelsSelection && !this.labelsSelection.fake) {
      this.selectLabels(this.reselect(this.labelsSelection));
    } else {
      if (this.firstTimeCell) {
        const fake = this.reselect(
          new CellSelection(
            this.firstTimeCell.colIx - 1, undefined, undefined,
            this.firstTimeCell.rowIx - 1, undefined, undefined, undefined
          ));
        fake.fake = true;
        this.selectLabels(fake);
      }
    }
  }

  markSelections() {
    super.markSelections();
    this.markFirstTime();
  }



}
