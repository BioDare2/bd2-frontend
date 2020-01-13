import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

export class ConfirmationQuestion {

  constructor(public question: string,
              // tslint:disable-next-line:no-unnecessary-initializer
              public details: string = undefined,
              public cancelLabel = 'Cancel',
              public okLabel= 'OK') {}
}

@Component({
  template: `
    <h4 mat-dialog-title class="modal-title">{{question.question}}
    </h4>
    <div mat-dialog-content class="modal-body">
      <div *ngIf="question.details" [innerHTML]="question.details">
      </div>
    </div>
    <hr>
    <div>
      <button class="btn btn-primary btn-sm mr-2" mat-dialog-close>{{question.cancelLabel}}</button>
      <button class="btn btn-primary btn-sm" [mat-dialog-close]="true">{{question.okLabel}}</button>
    </div>
  `,
  styles: []
})
export class ConfirmDialogComponentComponent implements OnInit {

  question: ConfirmationQuestion;

  constructor(@Inject(MAT_DIALOG_DATA) data: ConfirmationQuestion) {

    this.question = data ? data : new ConfirmationQuestion('Missing question');

  }

  ngOnInit() {
  }

}
