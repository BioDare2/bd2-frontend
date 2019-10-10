import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable, zip} from 'rxjs';
import {DisplayParameters, validTimeScale} from '../../../../tsdata/plots/ts-display.dom';

import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DetrendingType, DetrendingTypeOptions} from '../../../../tsdata/ts-data-dom';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';
import {
  EJTPreset,
  EnabledEJTPresetOptions,
  EnabledRhythmicityMethodOptions,
  RhythmicityMethod, RhythmicityRequest
} from '../../rhythmicity-dom';

@Component({
  selector: 'bd2-rhythmicityjob-params-rform',
  templateUrl: './rhythmicityjob-params-rform.component.html',
  styles: []
})
export class RhythmicityjobParamsRformComponent implements OnInit {

  @Input()
  blocked = false;

  @Output()
  displayParams: Observable<DisplayParameters>;

  @Output()
  rhythmicityRequests = new EventEmitter<RhythmicityRequest>();

  paramsForm: FormGroup;

  methodOptions = EnabledRhythmicityMethodOptions;
  presetOptions = EnabledEJTPresetOptions;

  detrendingOptions = [ DetrendingType.NO_DTR, DetrendingType.LIN_DTR];

  dataHelp = false;
  presetsHelp = false;
  methodHelp = false;

  constructor(private fb: FormBuilder) {


    this.paramsForm = this.fb.group({
      displayParams: this.fb.group({
        timeScale: this.fb.group({
          timeStart: [0, [Validators.required]],
          timeEnd: [0, [Validators.required]]
        }, {validator: (control: AbstractControl) => validTimeScale(control.value)}),
        detrending: [DetrendingType.NO_DTR.name, [Validators.required]]
      }),
      periodScale: this.fb.group({
        periodMin: [18, [Validators.required]],
        periodMax: [34, [Validators.required]]
      }, {validator: (control: AbstractControl) => this.validPeriodScale(control.value)}),
      method: [RhythmicityMethod.BD2EJTK.name, [Validators.required]],
      preset: [EJTPreset.EJTK_CLASSIC.name, [Validators.required]],
    });

    const dispG = this.paramsForm.get('displayParams');
    this.displayParams = zip(dispG.valueChanges, dispG.statusChanges,
      (value, status) => {
        return {value, status};
      }).pipe(
      filter(val => val.status === 'VALID'),
      distinctUntilChanged((prev: any, next: any) => {
        // console.log(prev.value.timeScale.timeStart+":"+next.value.timeScale.timeStart);
        if (prev.value.timeScale.timeStart !== next.value.timeScale.timeStart) {
          return false;
        }
        if (prev.value.timeScale.timeEnd !== next.value.timeScale.timeEnd) {
          return false;
        }
        if (prev.value.detrending !== next.value.detrending) {
          return false;
        }

        return true;
      }),
      map(val => {

        const params = new DisplayParameters(val.value.timeScale.timeStart,
          val.value.timeScale.timeEnd,
          DetrendingType.get(val.value.detrending),
          undefined, undefined
        );
        return params;
      }));

    // .filter((params: DisplayParameters) => params.isValid())
    /*.distinctUntilChanged((prev: DisplayParameters, next: DisplayParameters) => {
      return next.equals(prev);
    })*/

  }


  ngOnInit() {
  }

  /* tslint:disable:curly */
  validPeriodScale(periodScale: any): { [key: string]: any } {
    // console.log("Validator called: "+JSON.stringify(control.value));
    const start = periodScale.periodMin;
    const end = periodScale.periodMax;
    if (start < 10) return {validPeriodScale: 'Period min must >= 10'};
    if (end < 10) return {validPeriodScale: 'Period max must >= 10'};
    if (end > 50) return {validPeriodScale: 'Period max must < 50'};
    if (start >= end) return {validPeriodScale: 'Period min must be < max'};
    // console.log("Validator passed: "+JSON.stringify(control.value));
    return null;
  }

  /* tslint:enable:curly */

  /* tslint:disable:curly */
  analyse() {
    if (this.paramsForm.invalid)
      return;

    const req: RhythmicityRequest = this.map2RhythmicityRequest(this.paramsForm.value);
    if (req.isValid())
      this.rhythmicityRequests.next(req);
  }

  /* tslint:enable:curly */

  protected map2RhythmicityRequest(value: any): RhythmicityRequest {
    const req = new RhythmicityRequest();
    req.detrending = DetrendingType.get(value.displayParams.detrending);
    req.method = RhythmicityMethod.get(value.method);
    req.preset = EJTPreset.get(value.preset);
    req.periodMax = value.periodScale.periodMax;
    req.periodMin = value.periodScale.periodMin;
    req.windowEnd = value.displayParams.timeScale.timeEnd;
    req.windowStart = value.displayParams.timeScale.timeStart;
    return req;
  }
}
