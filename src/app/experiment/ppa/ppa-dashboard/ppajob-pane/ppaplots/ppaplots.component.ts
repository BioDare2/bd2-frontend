import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PPAGroupResultsFetcherService} from '../services/ppagroupresults-fetcher.service';
import {PPAJobSummary, PPAResultsGroupSummary} from '../../../ppa-dom';
import {BD2ColorPalette} from '../../../../../graphic/color/color-palette';
import {Subscription} from 'rxjs';
import {PageEvent, Sort} from '@angular/material';
import {PhaseParams} from '../phases-options-widget.component';

@Component({
  selector: 'bd2-ppaplots',
  templateUrl: './ppaplots.component.html',
  styles: [],
  providers: [PPAGroupResultsFetcherService]
})
export class PPAPlotsComponent implements OnInit, OnDestroy {

  @Input()
  set job(job: PPAJobSummary) {
    this.fetcher.input(job);
  }

  @Input()
  phaseParams: PhaseParams;

  @Input()
  set on(val: boolean) {
    this.isOn = val;
    this.fetcher.on(val);
  }

  // @Output()
  // phaseParams$ = new Subject<PhaseParams>();

  isOn = false;
  disablePaginator = false;

  legend: string[] = [];
  palette: string[] = [];
  removed: number[] = [];

  resultsSubscription: Subscription;

  constructor(private fetcher: PPAGroupResultsFetcherService) { }

  ngOnInit() {

    const firstPage = new PageEvent();
    firstPage.pageIndex = 0;
    firstPage.pageSize = 5;
    this.fetcher.page(firstPage);

    this.resultsSubscription = this.initResultsSubscription();
  }

  ngOnDestroy(): void {
    if (this.resultsSubscription) {
      this.resultsSubscription.unsubscribe();
    }

    if (this.fetcher) {
      this.fetcher.close();
    }
  }

  initResultsSubscription() {
    return this.fetcher.results$
    .subscribe(groups => {
      this.updateLabels(groups);
    });
  }

  updateLabels(groups: PPAResultsGroupSummary[]) {
    const labels  = groups.map(set => set.label);
    this.removed = [];
    this.legend = labels;
    this.palette = BD2ColorPalette.palette(labels.length);
  }

  hideGroups(marked: number[]) {
    // console.log("Hiding",marked);
    this.removed = marked;
  }

  loadPage(page: PageEvent) {
    // console.log('Load page', page);
    this.fetcher.page(page);
  }

  /*
  phaseOptions(params: PhaseParams) {
    // console.log("Ph"+this.jobId, params);
    this.phaseParams$.next(params);
    // this.phaseParams = params;
  }*/

  sort(sort: Sort) {
    this.fetcher.sort(sort);
  }

}
