import {Component, Inject, OnInit} from '@angular/core';
import {PPAFitPack} from '../../ppa-fit/ppa-fit.dom';
import {PPAFitService} from '../../ppa-fit/ppa-fit.service';
import {FeedbackService} from '../../../../feedback/feedback.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {FitSelection} from '../../ppa-dom';

export class PPAFitDialogComponentParams {

  constructor(public expId: number, public jobId: string, public dataId: number,
              public selectable?: boolean, public selection?: string) {

  }
}

@Component({
  templateUrl: './ppa-fit-dialog.component.html',
  styles: []
})
export class PPAFitDialogComponent implements OnInit {

  selectable = false;

  jobId: string;
  dataId: number;
  fitPack: PPAFitPack;
  selectedPeriod: string;

  constructor(private fitService: PPAFitService, private feedback: FeedbackService,
              private dialogRef: MatDialogRef<PPAFitDialogComponent>, @Inject(MAT_DIALOG_DATA) data: PPAFitDialogComponentParams) {

    this.show(data.expId, data.jobId, data.dataId, data.selectable, data.selection);
  }

  ngOnInit() {
  }

  show(expId: number, jobId: string, dataId: number, selectable?: boolean, selection?: string) {

    this.jobId = jobId;
    this.dataId = dataId;
    if (selectable !== null && selectable !== undefined) {
      this.selectable = selectable;
    }
    this.fitPack = undefined;
    this.selectedPeriod = undefined;

    this.fitService.getFit(expId, jobId, dataId, selectable)
      .then(fitPack => {
        this.fitPack = fitPack;
        this.selectedPeriod = selection;

        if (!selection) {
          const sel = fitPack.options.find(o => o.selected);
          if (sel) {
            this.selectedPeriod = sel.id;
          }
        }
      })
      .catch(reason => {
        this.feedback.error(reason);
      });

  }

  accepted() {
    // console.log("accepted")
    // this.onAccepted.emit(true);
    if (this.selectedPeriod) {
      const sel = new FitSelection();
      sel.jobId = this.jobId;
      sel.dataId = this.dataId;
      sel.selected = this.selectedPeriod;

      this.dialogRef.close(sel);
    } else {
      this.dialogRef.close();
    }

  }

}
