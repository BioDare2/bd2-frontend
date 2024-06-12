import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {StaticContentDialogComponent} from './static-content-dialog/static-content-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class StaticContentDialogService {

  constructor(private dialog: MatDialog) { }

  show(docName: string) {
    this.dialog.open(StaticContentDialogComponent, {data: {docName}});
  }
}
