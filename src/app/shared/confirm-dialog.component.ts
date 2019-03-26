import {Component, Output, EventEmitter, ViewChild, Input} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {first} from 'rxjs/operators';

@Component({
  selector: 'bd2-confirm-dialog',
  template: `

  <div bsModal #confirmDialog="bs-modal" (onHide)="hidden()" [config]="modalOptions"
      class="modal fade" tabindex="-1" role="dialog" aria-labelledby="confirmDialog" aria-hidden="true">

    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" aria-label="Close" (click)="cancel()">
            <span aria-hidden="true">&times;</span>
          </button>
          <h4 class="modal-title">{{question}}</h4>
        </div>
        <div class="modal-body">
          <div *ngIf="details" [innerHTML]="details">
          </div>
          <hr>
          <div>
            <button class="btn btn-primary btn-sm" (click)="cancel()">{{cancelLabel}}</button>
            <button class="btn btn-primary btn-sm" (click)="accepted()">{{okLabel}}</button>
          </div>
        </div>
      </div>
    </div>

  </div>

`
})
export class ConfirmDialogComponent {

  question: string;

  details: string;

  modalOptions = {};

  @Input()
  set ignorable(val: boolean) {
      if (val) {
        this.modalOptions = {} as any;
     } else {
        this.modalOptions = {backdrop: 'static'};
     }
  }

  @Input()
  cancelLabel = 'Cancel';

  @Input()
  okLabel = 'OK';

  @Output()
  onAccepted = new EventEmitter<boolean>();

  @ViewChild(ModalDirective)
  private myModal: ModalDirective;


  hidden() {
    // console.log("Hidden");
    this.onAccepted.emit(false);
  }

  /* tslint:disable:curly */

  cancel() {
    // this.onAccepted.emit(false);
    if (this.myModal) this.myModal.hide();
  }



  accepted() {
    // console.log("accepted")
    this.onAccepted.emit(true);
    if (this.myModal) this.myModal.hide();
  }

  show() {
    if (this.myModal) this.myModal.show();
  }

  /* tslint:enable:curly */


  ask(question: string, details?: string): Promise<boolean> {
    this.question = question;
    this.details = details;
    this.show();
    // return this.onAccepted.toPromise();
    return this.onAccepted.pipe(first()).toPromise();
  }

}
