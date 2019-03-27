import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import {CellRangeDescription} from '../sheet-dom';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
  selector: 'bd2-confirm-row-copy-dialog',
  template: `


    <div bsModal #rowCopyDialog="bs-modal" class="modal fade" tabindex="-1" role="dialog"
         aria-labelledby="rowCopyDialog" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" aria-label="Close" (click)="hide()">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">Use row content as data labels</h4>
          </div>
          <div class="modal-body">
            <div>
              <p>Use values from row <strong>[{{rowNr}}]</strong> as data labels</p>
              <p>Existing labels and column types will be overwritten</p>
            </div>
            <div>
              <p><strong>Labels: </strong>{{values}}</p>
            </div>
            <div>
              <button class="btn btn-primary btn-sm" (click)="accepted()">Copy labels</button>
              <button class="btn btn-default btn-sm" (click)="hide()">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ConfirmRowCopyDialogComponent {


  rowNr: number;
  values: string;

  @Output()
  onAccepted = new EventEmitter<CellRangeDescription>();

  private orgRange: CellRangeDescription;

  @ViewChild(ModalDirective)
  private myModal: ModalDirective;

  show(selectedRange: CellRangeDescription) {
    this.orgRange = selectedRange;

    this.rowNr = selectedRange.range.first.row;
    this.values = selectedRange.content;

    if (this.myModal) {
      this.myModal.show();
    }
  }

  hide() {
    if (this.myModal) {
      this.myModal.hide();
    }
    // this.onAccepted.emit(null);
  }


  accepted() {
    this.onAccepted.emit(this.orgRange);
    if (this.myModal) {
      this.myModal.hide();
    }
  }

}
