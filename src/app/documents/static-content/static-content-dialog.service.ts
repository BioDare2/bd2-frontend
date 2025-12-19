import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {StaticContentDialogComponent} from './static-content-dialog/static-content-dialog.component';

/**
 * Service for displaying static content in dialog boxes.
 */
@Injectable({
  providedIn: 'root'
})
export class StaticContentDialogService {

  constructor(private dialog: MatDialog) { }

  /* Open a dialog to show the static document with the given name. */
  show(docName: string) {
    this.dialog.open(StaticContentDialogComponent, {data: {docName}});
  }
}
