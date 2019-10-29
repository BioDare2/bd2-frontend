import {AfterViewInit, Component, EventEmitter, OnDestroy, OnInit} from '@angular/core';
import {EnabledPPAMethodOptions, PPAMethod, PPARequest} from '../../ppa-dom';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {DetrendingType} from '../../../../tsdata/ts-data-dom';
import {BaseTSDisplayParamsRForm} from '../../../../tsdata/plots/tsdisplay-params-rform/base-tsdisplay-params-rform';

@Component({
  selector: 'bd2-ppajob-params-rform',
  templateUrl: './ppajob-params-rform.component.html',
  // tslint:disable-next-line:no-outputs-metadata-property
  outputs: ['displayParams', 'ppaRequests'],
  // tslint:disable-next-line:no-inputs-metadata-property
  inputs: ['disabled', 'totalTraces', 'currentPage'],
})
export class PPAJobParamsRFormComponent extends BaseTSDisplayParamsRForm implements OnInit, OnDestroy, AfterViewInit {

  methodOptions = EnabledPPAMethodOptions;

  ppaRequests = new EventEmitter<PPARequest>();


  constructor(fb: FormBuilder) {
    super(fb);


  }


  buildMainForm() {

    const form = this.fb.group({
      displayParams: this.displayParamsForm,
      periodScale: this.fb.group({
        periodMin: [18, [Validators.required]],
        periodMax: [34, [Validators.required]]
      }, {validator: (control: AbstractControl) => this.validPeriodScale(control.value)}),
      method: [PPAMethod.NLLS.name, [Validators.required]],
    });

    return form;
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

    const req: PPARequest = this.map2PPAReq(this.mainForm.value);
    if (req.isValid()) {
      this.ppaRequests.next(req);
    }
  }


  protected map2PPAReq(value: any): PPARequest {
    const req = new PPARequest();
    req.detrending = DetrendingType.get(value.displayParams.detrending);
    req.method = PPAMethod.get(value.method);
    req.periodMax = value.periodScale.periodMax;
    req.periodMin = value.periodScale.periodMin;
    req.windowEnd = value.displayParams.timeScale.timeEnd;
    req.windowStart = value.displayParams.timeScale.timeStart;
    return req;
  }
}
