import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StatTestOptions} from '../../../rhythmicity-dom';

@Component({
  selector: 'bd2-stat-test-options-widget',
  templateUrl: './stat-test-options-widget.component.html',
  styles: []
})
export class StatTestOptionsWidgetComponent implements OnInit {

  @Output()
  options = new EventEmitter<StatTestOptions>();

  currentOptions = new StatTestOptions(0, false, false, false);

  constructor() { }

  ngOnInit() {
    // this.options.next(this.currentOptions);
  }

  pValue(val: number) {
    this.currentOptions = this.currentOptions.clone();
    this.currentOptions.pValue = val;
    this.options.next(this.currentOptions);
  }

  bhCorrection(val: boolean) {
    this.currentOptions = this.currentOptions.clone();
    this.currentOptions.bhCorrection = val;
    this.options.next(this.currentOptions);
  }

  circadian(val: boolean) {
    this.currentOptions = this.currentOptions.clone();
    this.currentOptions.circadian = val;
    this.options.next(this.currentOptions);
  }

  showPattern(val: boolean) {
    this.currentOptions = this.currentOptions.clone();
    this.currentOptions.showPattern = val;
    this.options.next(this.currentOptions);
  }

}
