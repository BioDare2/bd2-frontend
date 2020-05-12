import {AfterViewInit, Component, OnDestroy, OnInit, } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {BaseTSDisplayParamsRForm} from './base-tsdisplay-params-rform';

@Component({
  selector: 'bd2-tsdisplay-params-rform',
  template: `
  <form [formGroup]="mainForm" class="form-horizontal container" role="form">

    <div class="row">
      <div class="col-md-8 col-sm-10">
      <div formGroupName="timeScale" class="form-group row">
        <label class="col-md-3 col-sm-3">Time range</label>

        <label class="col-md-1 col-sm-2" for="timeStart">from:</label>
        <div class="col-md-3 col-sm-3">
        <input type="number" step="any" min="0" size="5" class="form-control"
               id="timeStart"
               required
               formControlName="timeStart"
        >
        </div>
        <label class="col-md-1 col-sm-1" for="timeEnd">to:</label>
        <div class="col-md-3 col-sm-3">
        <input type="number" step="any" min="0" size="5"  class="form-control"
               required
               id="timeEnd"
               formControlName="timeEnd"
        >
        </div>
      </div></div>

      <div class="col-md-2 col-sm-4">
        <mat-slide-toggle formControlName="hourly" class="mr-3">hourly</mat-slide-toggle>
      </div>
    </div>

    <div class="form-group row">
      <label class="col-sm-2"  for="detrending">Detrending</label>

      <div class="col-sm-3">
      <select class="form-control" required
              id="detrending"
              formControlName="detrending"
      >
        <option *ngFor="let opt of detrendingOptions; let ix = index" [value]="opt.name" >{{opt.label}}</option>
      </select>
      </div>

      <div class="col-sm-1"></div>
      <label class="col-sm-1" for="align">Align</label>

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
      <div class="col-sm-2">
        <label for="normalisation">Normalize</label>
      </div>

      <div class="col-sm-3">
        <select class="form-control" required
                id="normalisation"
                formControlName="normalisation"
        >
          <option *ngFor="let opt of normalisationOptions; let ix = index" [value]="opt.name" >{{opt.label}}</option>
        </select>
      </div>

      <div class="col-sm">
        <mat-slide-toggle formControlName="trimFirst" class="mr-3">within range</mat-slide-toggle>
        <mat-slide-toggle formControlName="log2">log2 transf.</mat-slide-toggle>
      </div>


    </div>

    <div class="form-group row">




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
