import { AfterViewInit, EventEmitter, OnDestroy, OnInit, ViewChild, Directive } from '@angular/core';
import {DisplayParameters, validTimeScale} from '../ts-display.dom';
import {AlignOptions, DetrendingType, DetrendingTypeOptions, NormalisationOptions, TSOption} from '../../ts-data-dom';
import {BehaviorSubject, combineLatest, Subscription, zip} from 'rxjs';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {distinctUntilChanged, filter, map, startWith} from 'rxjs/operators';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';

@Directive()
export class BaseTSDisplayParamsRForm implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('dataPaginator', { static: true })
  dataPaginator: MatPaginator;
  totalTraces = 0;

  currentPage = DisplayParameters.firstPage();

  displayParams = new EventEmitter<DisplayParameters>();

  set disabled(val: boolean) {
    if (val) {
      this.mainForm.disable();
    } else {
      this.mainForm.enable();
    }
    this._disabled = val;
  }

  get disabled() {
    return this._disabled;
  }

  // tslint:disable-next-line:variable-name
  _disabled = false;




  detrendingOptions: DetrendingType[];
  normalisationOptions: TSOption[];
  alignOptions: TSOption[];

  mainForm: FormGroup;
  displayParamsForm: FormGroup;
  disabledPagination = false;

  page$ = new BehaviorSubject<PageEvent>(DisplayParameters.firstPage());

  private displayParamsSubscription: Subscription;

  constructor(protected fb: FormBuilder) {

    this.displayParamsForm = this.buildDisplayParamsForm();

    this.mainForm = this.buildMainForm();

    this.detrendingOptions = DetrendingTypeOptions;
    this.normalisationOptions = NormalisationOptions;
    this.alignOptions = AlignOptions;

  }






  ngOnInit() {
    this.initDisplayParamsStream();
  }

  ngOnDestroy(): void {

    if (this.displayParamsSubscription) {
      this.displayParamsSubscription.unsubscribe();
    }
  }



  initDisplayParamsStream() {



    const validParams = zip(this.displayParamsForm.valueChanges, this.displayParamsForm.statusChanges).pipe(
      startWith([this.displayParamsForm.value, this.displayParamsForm.status]),
      // tap( v => console.log('Before valid params', v)),
      filter(([val, status]) => status === 'VALID' && val),
      // tap( v => console.log('After filter params', v)),
      map(([val, status]) => val),
      // tap( v => console.log('Valid param', v))
    );

    const paramsStream = combineLatest([validParams, this.page$]).pipe(
      // tap( v => console.log('Param and page', v)),
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
      // tap( v => console.log('Filtered', v)),
      distinctUntilChanged((prev: DisplayParameters, next: DisplayParameters) => {
        return next.equals(prev);
      }),
      // tap( v => console.log('Distinct', v)),

    );

    this.displayParamsSubscription = paramsStream.subscribe( params => this.displayParams.next(params));


  }

  buildDisplayParamsForm() {
    return this.fb.group({
      timeScale: this.fb.group({
        timeStart: [0, [Validators.required]],
        timeEnd: [0, [Validators.required]]
      }, {validator: (control: AbstractControl) => validTimeScale(control.value)}),
      detrending: [this.defaultDetrending(), [Validators.required]],
      normalisation: [NormalisationOptions[0].name, [Validators.required]],
      align: [AlignOptions[0].name, [Validators.required]],
    });
  }

  defaultDetrending() {
    return DetrendingType.LIN_DTR.name;
  }

  buildMainForm() {
    return this.displayParamsForm;
  }

  loadDataPage(page: PageEvent) {
    // console.log('Load page', page);
    this.page$.next(page);
  }




  ngAfterViewInit() {
    if (this.dataPaginator) {
      this.dataPaginator._intl = new MatPaginatorIntl();
      this.dataPaginator._intl.itemsPerPageLabel = 'Series per page';
    }
  }



}
