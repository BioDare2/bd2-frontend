import {Component, Input, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {ExperimentSummary} from '../../../dom/repo/exp/experiment-summary';

@Component({
    selector: 'bd2-experiment-summary',
    templateUrl: './experiment-summary.component.html',
    styles: [],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ExperimentSummaryComponent implements OnInit {

  @Input()
  exp: ExperimentSummary;

  constructor() { }

  ngOnInit() {
  }

}
