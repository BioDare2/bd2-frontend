import {Injectable} from '@angular/core';
import {MatLegacyDialog as MatDialog} from '@angular/material/legacy-dialog';
import {Observable} from 'rxjs';
import {ConfirmationQuestion, ConfirmDialogComponentComponent} from './confirm-dialog-component/confirm-dialog-component.component';

@Injectable({
  providedIn: 'root'
})
export class SharedDialogsService {

  constructor(private dialogs: MatDialog) { }

  confirm(question: string, details: string, cancelLabel = 'Cancel', okLabel = 'OK'): Observable<boolean> {

    const data = new ConfirmationQuestion(question, details, cancelLabel, okLabel);
    const dialog = this.dialogs.open(ConfirmDialogComponentComponent , {data, autoFocus: false});

    return dialog.afterClosed();

  }
}
