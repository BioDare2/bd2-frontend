import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PPAResultsGroupSummary} from '../../../../ppa-dom';

@Component({
  selector: 'bd2-ppaperiod-plot',
  templateUrl: './ppaperiod-plot.component.html',
  styles: []
})
export class PPAPeriodPlotComponent implements OnInit, OnChanges {

  @Input()
  groups: PPAResultsGroupSummary[] = [];

  @Input()
  legend: string[] = [];

  @Input()
  palette: string[] = [];

  @Input()
  removed: number[] = [];

  @Input()
  legendOn = 'always';

  @Input()
  sorted = 'none';

  periods: number[][];
  periodDomain: number[] = [17, 35];


  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updatePeriods(this.groups);
  }

  updatePeriods(groups: PPAResultsGroupSummary[]) {
    if (!groups) { return; }

    const periods = groups.map( set => set.periods);
    const domain = groups.length > 0 ? [groups[0].jobPeriodMin, groups[0].jobPeriodMax] : [17, 35];

    this.periods = periods;
    this.periodDomain = domain;

  }

}
