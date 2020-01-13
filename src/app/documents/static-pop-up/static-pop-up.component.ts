import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap/modal';
import {isKnownStaticDoc, StaticDocsOptions} from '../known-docs';

@Component({
  selector: 'bd2-static-pop-up',
  template: `

    <div bsModal #docsModal="bs-modal" class="modal fade" tabindex="-1" role="dialog"
         aria-labelledby="columnTypeModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lr">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" aria-label="Close" (click)="hide()">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">{{title}}</h4>
          </div>
          <div class="modal-body">

            <div class="alert alert-danger" role="alert" type="danger" *ngIf="missing">{{missing}}</div>
            <bd2-static-content *ngIf="!missing" [docName]="docName"></bd2-static-content>

            <hr>
            <button class="btn btn-primary btn-sm" (click)="hide()">Close</button>

          </div>
        </div>
      </div>
    </div>

  `
})
export class StaticPopUpComponent implements OnInit {

  title: string;
  docName: string;
  missing: string;

  @ViewChild('docsModal', { static: true })
  private myModal: ModalDirective;

  constructor() {
  }

  ngOnInit() {
  }

  show(docName: string) {

    if (isKnownStaticDoc(docName)) {
      this.title = StaticDocsOptions.find(op => op[0] === docName)[1];
      this.docName = docName;
      this.missing = undefined;
    } else {
      this.missing = 'Unknown document: ' + docName;
      this.title = this.missing;
      this.docName = undefined;
    }

    if (this.myModal) {
      this.myModal.show();
    }

  }

  hide() {
    if (this.myModal) {
      this.myModal.hide();
    }
  }
}
