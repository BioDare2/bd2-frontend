import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  template: `
    <h4 mat-dialog-title class="modal-title">Export job results</h4>

    <div mat-dialog-content class="modal-body">
      <label class="" for="phaseType">Phase type</label>
      <select class="form-control" required
              id="phaseType"
              [(ngModel)]="phaseType"
              name="phaseType"
      >
        <option value="ByMethod">method specific</option>
        <option value="ByFit">by fit</option>
        <option value="ByFirstPeak">by first peak</option>
        <option value="ByAvgMax">by averaged peaks</option>

      </select>
      <hr>
    </div>
    <div mat-dialog-actions>
      <button class="btn btn-primary btn-sm mr-1" mat-dialog-close>Cancel</button>
      <button class="btn btn-primary btn-sm" [mat-dialog-close]="phaseType">Export</button>
    </div>
  `,
  styles: []
})
export class PPAJobExportDialog2Component implements OnInit {

  phaseType: string;

  constructor(@Inject(MAT_DIALOG_DATA) data) {

    const phaseType = data ? data.phaseType : undefined;
    this.phaseType = phaseType || 'ByFit';
  }

  ngOnInit() {
  }

}
