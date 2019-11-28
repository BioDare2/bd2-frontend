import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StatTestOptions} from "../../../rhythmicity-dom";

@Component({
  selector: 'bd2-stat-test-options-widget',
  templateUrl: './stat-test-options-widget.component.html',
  styles: []
})
export class StatTestOptionsWidgetComponent implements OnInit {

  @Output()
  options = new EventEmitter<StatTestOptions>();

  currentOptions = new StatTestOptions();

  constructor() { }

  ngOnInit() {
    // this.options.next(this.currentOptions);
  }

  pValue(val: number) {

    this.currentOptions = new StatTestOptions(val, this.currentOptions.bhCorrection);
    this.options.next(this.currentOptions);
  }

  bhCorrection(val: boolean) {
    this.currentOptions = new StatTestOptions(this.currentOptions.pValue, val);
    this.options.next(this.currentOptions);
  }
}
