import {Component, Input, OnInit, Output} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';


export class PhaseParams {
  constructor(public phaseType: string,
              public relativeTo: string,
              public phaseUnit: string) {
  }

  static same(prev: PhaseParams, next: PhaseParams): boolean {
    if (!prev && !next) {
      return true;
    }
    if ((prev && !next) || (!prev && next)) {
      return false;
    }
    return (prev.phaseType === next.phaseType) &&
      (prev.relativeTo === next.relativeTo) &&
      (prev.phaseUnit === next.phaseUnit);
  }
}

@Component({
  selector: 'bd2-phases-options',
  template: `

    <div class="spaced">
      <div class="btn-group spaced">
        <label class="btn btn-success btn-xs" [(ngModel)]="phaseType"
               btnRadio="ByFit">Fit</label>
        <label class="btn btn-success btn-xs" [(ngModel)]="phaseType"
               btnRadio="ByMethod">Method</label>
        <label class="btn btn-success btn-xs" [(ngModel)]="phaseType"
               btnRadio="ByFirstPeak">First</label>
        <label class="btn btn-success btn-xs" [(ngModel)]="phaseType"
               btnRadio="ByAvgMax">Avg.</label>
      </div>

      <div class="btn-group spaced">
        <label class="btn btn-success btn-xs" [(ngModel)]="relativeTo"
               btnRadio="zero">Zero</label>
        <label class="btn btn-success btn-xs" [(ngModel)]="relativeTo"
               btnRadio="dw">Window</label>
      </div>

      <div class="btn-group spaced">
        <label class="btn btn-success btn-xs" [(ngModel)]="phaseUnit"
               btnRadio="circ">Circadian</label>
        <label class="btn btn-success btn-xs" [(ngModel)]="phaseUnit"
               btnRadio="abs">Absolute</label>
      </div>
    </div>
  `,
  styles: [
      `div.spaced {
      padding-top: 0.5em;
      padding-bottom: 0.5em;
      padding-right: 1em;
    }`
  ]
})
export class PhasesOptionsWidgetComponent implements OnInit {

  @Output()
  options: Observable<PhaseParams>;
  change = new Subject<boolean>();

  constructor() {

    this.options = this.change.pipe(
      // needed so not error on value changed appears
      debounceTime(50),
      map(() => new PhaseParams(this.phaseType, this.relativeTo, this._phaseUnit)),
      distinctUntilChanged(PhaseParams.same));
  }

  _phaseType = 'ByFit';

  get phaseType(): string {
    return this._phaseType;
  }

  @Input()
  set phaseType(val: string) {
    this._phaseType = val;
    this.change.next(true);
  }

  _relativeTo = 'zero';

  get relativeTo(): string {
    return this._relativeTo;
  }

  @Input()
  set relativeTo(val: string) {
    this._relativeTo = val;
    this.change.next(true);
  }

  _phaseUnit = 'circ';

  get phaseUnit(): string {
    return this._phaseUnit;
  }

  @Input()
  set phaseUnit(val: string) {
    this._phaseUnit = val;
    this.change.next(true);
  }

  ngOnInit() {
    /*this.options.subscribe( o => {
     console.log("PH",o);
     });*/
  }
}
