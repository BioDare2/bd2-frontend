import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {isKnownStaticDoc, StaticDocsOptions} from '../../known-docs';

@Component({
  selector: 'bd2-static-content-dialog',
  template: `
    <h1 mat-dialog-title>{{title}}</h1>
    <div mat-dialog-content>
      <div class="alert alert-danger" role="alert" type="danger" *ngIf="missing">{{missing}}</div>
      <bd2-static-content *ngIf="!missing" [docName]="docName"></bd2-static-content>
    </div>
    <div mat-dialog-actions>
      <button mat-dialog-close class="btn btn-primary" tabindex="-1">Close</button>
    </div>
  `,
  styles: []
})
export class StaticContentDialogComponent implements OnInit {

  missing: string;
  docName: string;
  title: string;

  constructor(@Inject(MAT_DIALOG_DATA) data) {

    const docName = data ? data.docName : undefined;

    if (isKnownStaticDoc(docName)) {
      this.title = StaticDocsOptions.find(op => op[0] === docName)[1];
      this.docName = docName;
      this.missing = undefined;
    } else {
      this.missing = 'Unknown document: ' + docName;
      this.title = this.missing;
      this.docName = undefined;
    }
  }

  ngOnInit() {
  }

}
