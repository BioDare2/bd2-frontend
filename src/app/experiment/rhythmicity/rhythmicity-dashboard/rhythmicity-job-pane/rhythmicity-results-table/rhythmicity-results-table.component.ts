import {Component, Input, OnInit} from '@angular/core';
import {BD2eJTKRes, TSResult} from '../../../rhythmicity-dom';

@Component({
  selector: 'bd2-rhythmicity-results-table',
  templateUrl: './rhythmicity-results-table.component.html',
  styles: []
})
export class RhythmicityResultsTableComponent implements OnInit {

  @Input()
  results: TSResult<BD2eJTKRes>[];

  constructor() { }

  ngOnInit() {
  }

  describePattern(res: BD2eJTKRes) {
    const pattern = res.pattern;
    const peak = Math.round(pattern.peak * 10) / 10;
    return `${pattern.waveform}${pattern.period}:${peak}`;
  }

}
