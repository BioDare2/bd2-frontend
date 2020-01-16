import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {FitSelection} from '../../../experiment/ppa/ppa-dom';
import {PPAFitService} from '../../../experiment/ppa/ppa-fit/ppa-fit.service';
import {PPAFitPack} from '../../../experiment/ppa/ppa-fit/ppa-fit.dom';
import {FeedbackService} from '../../../feedback/feedback.service';

@Component({
  selector: 'bd2-selectable-fit-dialog',
  templateUrl: './selectable-fit-dialog.component.html',
})
export class SelectableFitDialogComponent implements OnInit {

  @Input()
  selectable = false;

  @Output()
  selected = new EventEmitter<FitSelection>();

  jobId: number;
  dataId: number;
  fitPack: PPAFitPack;
  selectedPeriod: string;

  @ViewChild(ModalDirective, { static: true })
  private myModal: ModalDirective;

  constructor(private fitService: PPAFitService, private feedback: FeedbackService) {
  }

  ngOnInit() {
  }

  cancel() {
    if (this.myModal) {
      this.myModal.hide();
    }
  }

  show(expId: number, jobId: number, dataId: number, selectable?: boolean, selection?: string) {
    if (!this.myModal) {
      return;
    }

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
      .then(() => this.myModal.show())
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
      this.selected.next(sel);
    }

    if (this.myModal) {
      this.myModal.hide();
    }
  }

}
