import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';

import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {DetrendingType} from '../../../../tsdata/ts-data-dom';
import {
  EJTPreset,
  EnabledEJTPresetOptions,
  EnabledRhythmicityMethodOptions,
  RhythmicityMethod,
  RhythmicityRequest
} from '../../rhythmicity-dom';
import {BaseTSDisplayParamsRForm} from '../../../../tsdata/plots/tsdisplay-params-rform/base-tsdisplay-params-rform';

@Component({
  selector: 'bd2-rhythmicityjob-params-rform',
  templateUrl: './rhythmicityjob-params-rform.component.html',
  styles: [],
  // tslint:disable-next-line:no-outputs-metadata-property
  outputs: ['displayParams', 'rhythmicityRequests'],
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: ['disabled', 'totalTraces', 'currentPage']
})
export class RhythmicityjobParamsRformComponent extends BaseTSDisplayParamsRForm implements OnInit, OnDestroy, AfterViewInit {

  methodOptions = EnabledRhythmicityMethodOptions;
  presetOptions = EnabledEJTPresetOptions;

  dataHelp = false;
  presetsHelp = false;
  methodHelp = false;

  rhythmicityRequests = new EventEmitter<RhythmicityRequest>();

  constructor(fb: FormBuilder) {
    super(fb);

    this.detrendingOptions = [ DetrendingType.NO_DTR, DetrendingType.LIN_DTR];
  }


  buildMainForm() {


    const form = this.fb.group({
      displayParams: this.displayParamsForm,
      periodScale: this.fb.group({
        periodMin: [18, [Validators.required]],
        periodMax: [34, [Validators.required]]
      }, {validator: (control: AbstractControl) => this.validPeriodScale(control.value)}),
      method: [RhythmicityMethod.BD2EJTK.name, [Validators.required]],
      preset: [EJTPreset.EJTK_CLASSIC.name, [Validators.required]],
    });

    return form;
  }

  defaultDetrending() {
    return DetrendingType.NO_DTR.name;
  }

  validPeriodScale(periodScale: any): { [key: string]: any } {
    // console.log("Validator called: "+JSON.stringify(control.value));
    const start = periodScale.periodMin;
    const end = periodScale.periodMax;
    if (start < 10) { return {validPeriodScale: 'Period min must >= 10'}; }
    if (end < 10) { return {validPeriodScale: 'Period max must >= 10'}; }
    if (end > 50) { return {validPeriodScale: 'Period max must < 50'}; }
    if (start >= end) { return {validPeriodScale: 'Period min must be < max'}; }
    // console.log("Validator passed: "+JSON.stringify(control.value));
    return null;
  }

  analyse() {
    if (this.mainForm.invalid) {
      return;
    }

    const req: RhythmicityRequest = this.map2RhythmicityRequest(this.mainForm.value);
    if (req.isValid()) {
      this.rhythmicityRequests.next(req);
    }
  }


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
