import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataTableSlice} from '../data-table-dom';
import {DataTableService} from '../data-table.service';
import {FeedbackService} from '../../../../feedback/feedback.service';
import {DataTableDependentStep} from '../data-table-dependent-step';

@Component({
  selector: 'bd2-import-labels-step',
  templateUrl: './import-labels-step.component.html',
  styles: [],
  providers: [ DataTableService],
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: ['importDetails']
})
export class ImportLabelsStepComponent extends DataTableDependentStep implements OnInit, OnDestroy {

  constructor(dataService: DataTableService, feedback: FeedbackService) {
    super(dataService, feedback);
  }


  setDataSlice(dataSlice: DataTableSlice) {
    super.setDataSlice(dataSlice);

    if (this.firstTimeCell) {
      this.selectFirstTime(this.reselect(this.firstTimeCell));
    }

    if (this.labelsSelection) {
      this.selectLabels(this.reselect(this.labelsSelection));
    }
  }


}
