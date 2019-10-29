import {AfterViewInit, Component, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DisplayParameters, validTimeScale} from '../ts-display.dom';
import {AlignOptions, DetrendingType, DetrendingTypeOptions, NormalisationOptions} from '../../ts-data-dom';
import {BehaviorSubject, combineLatest, Observable, zip} from 'rxjs';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {distinctUntilChanged, filter, map, tap} from 'rxjs/operators';
import {MatPaginator, MatPaginatorIntl, PageEvent} from '@angular/material';

@Component({
  selector: 'bd2-tsdisplay-params-rform',
  template: `
  <form [formGroup]="paramsForm" class="form-horizontal" role="form">

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

`
})
export class TSDisplayParamsRFormComponent implements OnInit, AfterViewInit {

  detrendingOptions = DetrendingTypeOptions;
  normalisationOptions = NormalisationOptions;
  alignOptions = AlignOptions;

  paramsForm: FormGroup;
  disabledPagination = false;

  @Output()
  displayParams: Observable<DisplayParameters>;

  @Input()
  set disabled(val: boolean) {
    if (val) {
      this.paramsForm.disable();
    } else {
      this.paramsForm.enable();
    }
  }

  @Input()
  totalTraces = 0;

  @Input()
  currentPage = DisplayParameters.firstPage();

  @ViewChild('dataPaginator', { static: true })
  dataPaginator: MatPaginator;

  page$ = new BehaviorSubject<PageEvent>(DisplayParameters.firstPage());

  constructor(private fb: FormBuilder) {


    this.paramsForm = this.fb.group({
      timeScale: this.fb.group({
        timeStart: [0, [Validators.required]],
        timeEnd: [0, [Validators.required]]
      }, {validator: (control: AbstractControl) => validTimeScale(control.value)}),
      detrending: [DetrendingType.LIN_DTR.name, [Validators.required]],
      normalisation: [NormalisationOptions[0].name, [Validators.required]],
      align: [AlignOptions[0].name, [Validators.required]],
    });


    const validParams = zip(this.paramsForm.valueChanges, this.paramsForm.statusChanges).pipe(
      tap( v => console.log('Before valid params', v)),
      filter(([val, status]) => status === 'VALID' && val),
      tap( v => console.log('After filter params', v)),
      map(([val, status]) => val),
      tap( v => console.log('Valid param', v))
    );

    this.displayParams = combineLatest([validParams, this.page$]).pipe(
      tap( v => console.log('Param and page', v)),
      map(([val, page]) => {

        const params = new DisplayParameters(val.timeScale.timeStart,
          val.timeScale.timeEnd,
          DetrendingType.get(val.detrending),
          val.normalisation,
          val.align, page
        );
        return params;
      }),
      filter((params: DisplayParameters) => params.isValid()),
      tap( v => console.log('Filtered', v)),
      distinctUntilChanged((prev: DisplayParameters, next: DisplayParameters) => {
        return next.equals(prev);
      }),
      tap( v => console.log('Distinct', v)),

    );



  }



  ngOnInit() {

  }

  ngAfterViewInit() {
    if (this.dataPaginator) {
      this.dataPaginator._intl = new MatPaginatorIntl();
      this.dataPaginator._intl.itemsPerPageLabel = 'Series per page';
    }
  }

  loadDataPage(page: PageEvent) {
    this.page$.next(page);
  }

}
