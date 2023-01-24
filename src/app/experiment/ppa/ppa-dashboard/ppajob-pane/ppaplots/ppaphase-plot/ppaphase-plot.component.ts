import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PPAResultsGroupSummary, valueFromPhaseName} from '../../../../ppa-dom';
import {PhaseParams} from '../../phases-options-widget.component';
import {ShowIndividualsOptions} from "bd2-ngx-polarplot/lib/polar-plot/polar-plot.dom";

@Component({
  selector: 'bd2-ppaphase-plot',
  templateUrl: './ppaphase-plot.component.html',
  styles: []
})
export class PPAPhasePlotComponent implements OnInit, OnChanges {

  @Input()
  groups: PPAResultsGroupSummary[] = [];

  @Input()
  phaseParams: PhaseParams;

  @Input()
  legend: string[] = [];

  @Input()
  palette: string[] = [];

  @Input()
  removed: number[] = [];

  showIndividuals: ShowIndividualsOptions;
  phases: number[][];
  phaseDomain: [number,number] = [0, 24];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {

    // console.log('OnChange, Current', this.phaseParams);
    // console.log('Chagne', changes);
    this.updatePhases(this.groups, this.phaseParams);
  }

  updatePhases(groups: PPAResultsGroupSummary[], params: PhaseParams) {
    if (!groups || !params) { return; }

    const phaseType = params.phaseType;

    let phases: number[][];
    let domain: [number,number];

    if (params.phaseUnit === 'circ') {
      phases = groups.map(set =>
        params.relativeTo === 'zero' ? valueFromPhaseName(set.phases2ZCir, phaseType)
          : valueFromPhaseName(set.phases2WCir, phaseType)) as number[][];
      domain = [0, 24];
    } else {
      phases = groups.map(set =>
        params.relativeTo === 'zero' ? valueFromPhaseName(set.phases2Z, phaseType)
          : valueFromPhaseName(set.phases2W, phaseType)) as number[][];
      domain = groups.length > 0 ? [0, groups[0].jobPeriodMax] : [0, 24];
    }

    this.phases = phases;
    this.phaseDomain = domain;
    this.showIndividuals = params.showIndividuals as ShowIndividualsOptions;
  }

}
