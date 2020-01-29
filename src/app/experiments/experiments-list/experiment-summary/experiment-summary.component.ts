import {Component, Input, OnInit} from '@angular/core';
import {ExperimentSummary} from '../../../dom/repo/exp/experiment-summary';

@Component({
  selector: 'bd2-experiment-summary',
  templateUrl: './experiment-summary.component.html',
  styles: []
})
export class ExperimentSummaryComponent implements OnInit {

  @Input()
  exp: ExperimentSummary;

  constructor() { }

  ngOnInit() {
  }

}
