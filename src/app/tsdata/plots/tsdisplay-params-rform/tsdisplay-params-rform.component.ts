import {Component, Input, OnInit, Output} from '@angular/core';
import {DisplayParameters, validTimeScale} from '../ts-display.dom';
import {AlignOptions, DetrendingType, DetrendingTypeOptions, NormalisationOptions} from '../../ts-data-dom';
import {Observable, zip} from 'rxjs';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';

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
    <!--{{paramsForm.value | json }}-->

  </form>

`
})
export class TSDisplayParamsRFormComponent implements OnInit {

  detrendingOptions = DetrendingTypeOptions;
  normalisationOptions = NormalisationOptions;
  alignOptions = AlignOptions;

  paramsForm: FormGroup;

  @Output()
  displayParams: Observable<DisplayParameters>;

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


    this.displayParams = zip(this.paramsForm.valueChanges, this.paramsForm.statusChanges,
      (value, status) => {
        return {value, status};
      }).pipe(
      filter(val => val.status === 'VALID'),
      map(val => {

        const params = new DisplayParameters(val.value.timeScale.timeStart,
          val.value.timeScale.timeEnd,
          DetrendingType.get(val.value.detrending),
          val.value.normalisation,
          val.value.align, DisplayParameters.firstPage()
        );
        return params;
      }),
      filter((params: DisplayParameters) => params.isValid()),
      distinctUntilChanged((prev: DisplayParameters, next: DisplayParameters) => {
        return next.equals(prev);
      }));

  }

  @Input()
  set disabled(val: boolean) {
    if (val) {
      this.paramsForm.disable();
    } else {
      this.paramsForm.enable();
    }
  }

  ngOnInit() {

  }


}
