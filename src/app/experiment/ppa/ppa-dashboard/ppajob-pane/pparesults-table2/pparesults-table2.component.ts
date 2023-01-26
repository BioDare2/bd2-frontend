import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PPAResultsFetcherService} from '../services/pparesults-fetcher.service';
import {LegacyPageEvent as PageEvent} from '@angular/material/legacy-paginator';
import {Sort} from '@angular/material/sort';
import {phaseValuesFromOptions, PPAJobSummary, PPASimpleResultEntry, valueFromPhaseName} from '../../../ppa-dom';
import {PhaseParams} from '../phases-options-widget.component';
import {Reloadable} from '../reloadable';
import {FeedbackService} from '../../../../../feedback/feedback.service';
import {PPADialogsService} from '../../../ppa-dialogs/ppadialogs.service';

@Component({
  selector: 'bd2-pparesults-table2',
  templateUrl: './pparesults-table2.component.html',
  styles: [],
  providers: [PPAResultsFetcherService]
})
export class PPAResultsTable2Component implements OnInit, OnDestroy, Reloadable {

  @Input()
  set job(job: PPAJobSummary) {
    this.fetcher.input(job);
  }

  @Input()
  set phaseParams(phaseParams: PhaseParams) {
    if (!phaseParams) { return; }

    this.phaseType = phaseParams.phaseType;
    this.relativeTo = phaseParams.relativeTo;
    this.phaseUnit = phaseParams.phaseUnit;
  }

  @Input()
  set on(val: boolean) {
    this.isOn = val;
    this.fetcher.on(val);
  }

  constructor(public fetcher: PPAResultsFetcherService,
              private feedback: FeedbackService,
              private dialogs: PPADialogsService) { }


  // @Input()
  phaseType = 'ByFit';
  // @Input()
  relativeTo = 'zero';
  // @Input()
  phaseUnit = 'circ';

  isOn = false;
  disablePaginator = false;
  displayedColumns = ['id', 'label', 'state', 'period', 'phase', 'amplitude', 'gof', 'err', 'fit'];

  reload() {
    this.fetcher.refresh();
  }

  ngOnInit() {

    this.fetcher.error$.subscribe( err => this.feedback.error(err));

    const firstPage = new PageEvent();
    firstPage.pageIndex = 0;
    firstPage.pageSize = 50;
    this.fetcher.page(firstPage);
  }

  ngOnDestroy(): void {
    if (this.fetcher) {
      this.fetcher.close();
    }
  }

  loadPage(page: PageEvent) {
    // console.log('Load page', page);
    this.fetcher.page(page);
  }

  sortData(sort: Sort) {
    this.fetcher.sort(sort);
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
    /*if (this.fitDialog) {
      this.fitDialog.show(this.fetcher.currentInput.parentId, res.jobId, res.dataId, false);
    }*/
    this.dialogs.ppaFit(this.fetcher.currentInput.parentId, res.jobId, res.dataId, false);

  }

  extractState(res: PPASimpleResultEntry) {
    return PPASimpleResultEntry.extractState(res);
  }


}
