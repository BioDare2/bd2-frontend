import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BaseTSDisplayParamsRForm} from './base-tsdisplay-params-rform';
import {MatPaginator, MatPaginatorIntl} from '@angular/material';

@Component({
  selector: 'bd2-tsdisplay-params-rform',
  template: `
  <form [formGroup]="mainForm" class="form-horizontal" role="form">

    <div formGroupName="timeScale" class="form-group row">
      <label class="col-sm-2">Time scale</label>

      <label class="col-sm-1" for="timeStart">from:</label>
      <div class="col-sm-3">
      <input type="number" step="any" min="0" size="5" class="form-control"
             id="timeStart"
             required
             formControlName="timeStart"
      >
      </div>
      <label class="col-sm-1" for="timeEnd">to:</label>
      <div class="col-sm-3">
      <input type="number" step="any" min="0" size="5"  class="form-control"
             required
             id="timeEnd"
             formControlName="timeEnd"
      >
      </div>
    </div>

    <div class="form-group row">
      <label class="col-sm-2"  for="detrending">Processing</label>
      <label class="col-sm-2"  for="detrending">Detrending</label>

      <div class="col-sm-6">
      <select class="form-control" required
              id="detrending"
              formControlName="detrending"
      >
        <option *ngFor="let opt of detrendingOptions; let ix = index" [value]="opt.name" >{{opt.label}}</option>
      </select>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-sm-2"></label>
      <label class="col-sm-1">Norm.</label>

      <div class="col-sm-3">
      <select class="form-control" required
              id="normalisation"
              formControlName="normalisation"
      >
        <option *ngFor="let opt of normalisationOptions; let ix = index" [value]="opt.name" >{{opt.label}}</option>
      </select>
      </div>

      <label class="col-sm-1">Align</label>

      <div class="col-sm-3">
      <select class="form-control" required
              id="align"
              formControlName="align"
      >
        <option *ngFor="let opt of alignOptions; let ix = index" [value]="opt.name" >{{opt.label}}</option>
      </select>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-sm-2"></label>
      <div class="col-sm-8">

        <mat-paginator #dataPaginator [length]="totalTraces" [disabled]="disabledPagination"
                       [pageSize]="currentPage.pageSize"
                       [pageIndex]="currentPage.pageIndex"
                       [pageSizeOptions]="[10, 25, 50, 100, 200]"
                       (page)="loadDataPage($event)"

        >
        </mat-paginator>
      </div>
    </div>
    <!--{{paramsForm.value | json }}-->
  </form>

`,
  // tslint:disable-next-line:no-outputs-metadata-property
  outputs: ['displayParams'],
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: ['disabled', 'totalTraces', 'currentPage'],

})
export class TSDisplayParamsRFormComponent extends BaseTSDisplayParamsRForm implements OnInit, OnDestroy, AfterViewInit {


  constructor(fb: FormBuilder) {
    super(fb);

  }


}
