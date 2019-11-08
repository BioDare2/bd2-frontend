import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PPAStatsFetcherService} from '../services/ppastats-fetcher.service';
import {phaseValuesFromOptions, PPAJobSummary, PPASimpleStats, valueFromPhaseName} from '../../../ppa-dom';
import {PageEvent, Sort} from '@angular/material';

@Component({
  selector: 'bd2-ppastats-table2',
  templateUrl: './ppastats-table2.component.html',
  styles: [],
  providers: [PPAStatsFetcherService]
})
export class PPAStatsTable2Component implements OnInit, OnDestroy {

  @Input()
  phaseType = 'ByFit';
  @Input()
  relativeTo = 'zero';
  @Input()
  phaseUnit = 'circ';

  @Input()
  set job(job: PPAJobSummary) {
    this.statsFetcher.input(job);
  }

  @Input()
  set on(val: boolean) {
    this.isOn = val;
    this.statsFetcher.on(val);
  }

  isOn = false;
  disablePaginator = false;
  displayedColumns = ['label', 'n', 'period', 'period.std', 'phase', 'phase.std', 'amplitude', 'amplitude.std'];

  constructor(private statsFetcher: PPAStatsFetcherService) { }

  ngOnInit() {
    const firstPage = new PageEvent();
    firstPage.pageIndex = 0;
    firstPage.pageSize = 5;
    this.statsFetcher.page(firstPage);


    // this.statsFetcher.on(true);
  }

  ngOnDestroy(): void {
    if (this.statsFetcher) {
      this.statsFetcher.close();
    }
  }

  loadPage(page: PageEvent) {
    console.log('Load page', page);
    this.statsFetcher.page(page);
  }

  sortData(sort: Sort) {
    this.statsFetcher.sort(sort);
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
