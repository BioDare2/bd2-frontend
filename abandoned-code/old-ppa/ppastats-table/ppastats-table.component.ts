import {Component, Input, OnInit} from '@angular/core';
import {phaseValuesFromOptions, PPAJobSimpleStats, PPASimpleStats, valueFromPhaseName} from '../../../src/app/experiment/ppa/ppa-dom';


@Component({
  selector: 'bd2-ppastats-table',
  template: `

    <table *ngIf="jobStats" class="table table-striped table-bordered">
      <thead>
      <tr>
        <th>Data</th>
        <th>N</th>
        <th>Period</th>
        <th>P.Std</th>
        <th>Phase</th>
        <th>Ph.Std</th>
        <th>Amp.</th>
        <th>Amp.Std</th>
        <!--<th>GOF</th>
        <th>ERR</th>-->
      </tr>
      </thead>
      <tbody>
      <tr *ngFor="let stats of jobStats.stats">
        <td class="word_wrapping">{{stats.label}}</td>
        <td>{{stats.N}}</td>
        <td>{{stats.per}}</td>
        <td>{{stats.perStd}}</td>
        <td>{{extractPhase(stats)}}</td>
        <td>{{extractPhaseStd(stats)}}</td>
        <td>{{extractAmp(stats)}}</td>
        <td>{{extractAmpStd(stats)}}</td>
        <!--<td>{{stats.GOF}}</td>
        <td>{{stats.ERR}}</td>-->
      </tr>
      </tbody>
    </table>

  `,
  styles: []
})
class PPAStatsTableComponent implements OnInit {

  @Input()
  jobStats: PPAJobSimpleStats;

  @Input()
  phaseType = 'ByFit';
  @Input()
  relativeTo = 'zero';
  @Input()
  phaseUnit = 'circ';

  constructor() {
  }

  ngOnInit() {
  }

  extractPhase(stat: PPASimpleStats): number {

    return valueFromPhaseName(phaseValuesFromOptions(stat, this.relativeTo, this.phaseUnit), this.phaseType) as number;

  }

  extractPhaseStd(stat: PPASimpleStats): number {
    if (this.phaseUnit === 'circ') {
      return valueFromPhaseName(stat.phStdCir, this.phaseType) as number;
    } else {
      return valueFromPhaseName(stat.phStd, this.phaseType) as number;
    }

  }


  extractAmp(stat: PPASimpleStats): string | number {
    const amp = valueFromPhaseName(stat.amp, this.phaseType) as number;
    if (isNaN(amp)) {
      return amp;
    }
    return amp.toExponential(2);
    /*if (amp > 9999 || amp < 0.001) {
      return amp.toExponential(2);
    } else {
      return amp;
    }*/
  }

  extractAmpStd(stat: PPASimpleStats): string | number {
    const amp = valueFromPhaseName(stat.ampStd, this.phaseType) as number;
    if (isNaN(amp)) {
      return amp;
    }
    return amp.toExponential(2);
    /*
    if (amp !== 0 && (amp > 9999 || amp < 0.001)) {
      return amp.toExponential(2);
    } else {
      return amp;
    }*/
  }


}
