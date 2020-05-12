import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {PPAJobExportDialog2Component} from './ppajob-export-dialog2/ppajob-export-dialog2.component';
import {SharedDialogsService} from '../../../shared/shared-dialogs/shared-dialogs.service';
import {FitSelection} from '../ppa-dom';
import {PPAFitDialogComponent, PPAFitDialogComponentParams} from './ppa-fit-dialog/ppa-fit-dialog.component';

@Injectable()
export class PPADialogsService {

  constructor(private dialogs: MatDialog,
              private sharedDialogs: SharedDialogsService) { }

  exportJob(phaseType: string): Observable<string> {

    const dialog = this.dialogs.open(PPAJobExportDialog2Component, {data: {phaseType}, autoFocus: false});

    return dialog.afterClosed();

  }

  confirm(question: string, details: string) {
    return this.sharedDialogs.confirm(question, details);
  }

  ppaFit(expId: number, jobId: string, dataId: number, selectable?: boolean, selection?: string): Observable<FitSelection> {

    const data = new PPAFitDialogComponentParams(expId, jobId, dataId, selectable, selection);
    const dialog = this.dialogs.open(PPAFitDialogComponent, {data, autoFocus: false, maxWidth: '90%', minWidth: '55%'});

    return dialog.afterClosed();

  }
}
