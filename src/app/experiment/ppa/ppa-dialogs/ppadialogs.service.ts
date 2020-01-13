import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';
import {PPAJobExportDialog2Component} from './ppajob-export-dialog2/ppajob-export-dialog2.component';

@Injectable()
export class PPADialogsService {

  constructor(private dialogs: MatDialog) { }

  exportJob(phaseType: string): Observable<string> {

    const dialog = this.dialogs.open(PPAJobExportDialog2Component, {data: {phaseType}});

    return dialog.afterClosed();

  }
}
