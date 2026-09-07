import {Component, Inject, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {isKnownStaticDoc, StaticDocsOptions} from '../../known-docs';

/**
 * Component for displaying static HTML content in a dialog box.
 */
@Component({
    selector: 'bd2-static-content-dialog',
    templateUrl: './static-content-dialog.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
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
