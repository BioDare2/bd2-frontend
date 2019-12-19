import {Component, Input, OnInit} from '@angular/core';
import {phaseValuesFromOptions, PPAJobSimpleResults, PPASimpleResultEntry, valueFromPhaseName} from '../../../../ppa-dom';
import {SelectableFitDialogComponent} from '../../../../ppa-fit/selectable-fit-dialog.component';

@Component({
  selector: 'bd2-ppajob-results-table',
  template: `


    <div *ngIf="!results || results.results.length === 0">
      No results found.
    </div>

    <div *ngIf="results && results.results.length > 0">

      <table class="table table-striped table-bordered">

        <thead>
        <tr>
          <th>Data</th>
          <th>S</th>
          <th>Period</th>
          <th>Phase</th>
          <th>Amp.</th>
          <th>GOF</th>
          <th>ERR</th>
          <th>Fit</th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let res of results.results"
            [ngClass]="{ppa_ignored: res.ignored, ppa_attention: (res.attention && !res.ignored) }"
        >
          <ng-template [ngIf]="res.failed">
            <td class="word_wrapping">{{res.dataRef}} {{ res.label}}</td>
            <td>{{extractState(res)}}</td>
            <td colspan="6">FAILED {{res.message}}</td>
          </ng-template>
          <ng-template [ngIf]="!res.failed">
            <td class="word_wrapping">{{res.dataRef}} {{ res.label}}</td>
            <td>{{extractState(res)}}</td>
            <td>{{res.per}}</td>
            <td>{{extractPhase(res)}}</td>
            <td>{{extractAmp(res)}}</td>
            <td>{{res.GOF}}</td>
            <td>{{res.ERR}}</td>
            <td><a role="button" (click)="showFit(res)">fit</a></td>
          </ng-template>

        </tr>
        </tbody>
      </table>

    </div>

  `,
  styles: []
})
class PPAJobResultsTableComponent implements OnInit {

  @Input()
  results: PPAJobSimpleResults;

  @Input()
  assayId: number;

  @Input()
  fitDialog: SelectableFitDialogComponent;

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

  extractState(res: PPASimpleResultEntry): string {
    if (res.failed) {
      return 'F';
    }
    if (res.ignored) {
      return 'I';
    }
    if (res.attention) {
      return 'A';
    }
    return '';
  }

  extractPhase(res: PPASimpleResultEntry): number {

    return valueFromPhaseName(phaseValuesFromOptions(res, this.relativeTo, this.phaseUnit), this.phaseType) as number;

  }

  extractAmp(res: PPASimpleResultEntry): number | string {
    const amp = valueFromPhaseName(res.amp, this.phaseType) as number;
    if (amp > 1000 || amp < 0.001) {
      return amp.toExponential(2);
    } else {
      return amp;
    }
  }

  showFit(res: PPASimpleResultEntry) {
    // console.log("Showing fit for: "+res.dataId,this.fitDialog);
    if (this.fitDialog) {
      this.fitDialog.show(this.assayId, res.jobId, res.dataId, false);
    }
  }

}
