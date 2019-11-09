import {Inject, Injectable, Optional} from '@angular/core';
import {REMOVE_DEBOUNCE} from '../../../../../shared/tokens';
import {PageableSortableFetcherService} from './pageable-sortable-fetcher.service';
import {PPAJobSimpleStats, PPAJobSummary, PPASimpleStats} from '../../../ppa-dom';
import {PPAService} from '../../../ppa.service';
import {Observable, of} from 'rxjs';
import {PageEvent, Sort} from '@angular/material';
import {pageObjectData, sortObjectData} from '../../../../../shared/collections-util';
import {map} from "rxjs/operators";

@Injectable()
export class PPAStatsFetcherService extends PageableSortableFetcherService<PPAJobSummary, PPAJobSimpleStats, PPAJobSimpleStats> {

  readonly stats$: Observable<PPASimpleStats[]>;

  constructor(private ppaService: PPAService,
              @Inject(REMOVE_DEBOUNCE) @Optional() removeDebounce = false) {
    super(removeDebounce);

    this.stats$ = this.data$.pipe(
      map( js => js.stats)
    );
  }

  protected sameInput(def1: PPAJobSummary, def2: PPAJobSummary) {
    return PPAJobSummary.sameJob(def1, def2);
  }


  protected assetToDataLength(stats: PPAJobSimpleStats) {
    return stats.stats.length;
  }

  protected fetchAsset(job: PPAJobSummary): Observable<PPAJobSimpleStats> {

    return this.ppaService.getPPAJobSimpleStats(job.parentId, job.jobId);

  }

  protected sortAsset(asset: PPAJobSimpleStats, sort: Sort) {

    if (!sort || !sort.active || sort.direction === '') {
      return asset;
    }

    const sortedEnt = sortObjectData(asset.stats, sort.direction, this.sortingKey(sort));

    const sorted = new PPAJobSimpleStats();
    sorted.jobId = asset.jobId;
    sorted.stats = sortedEnt;


    return sorted;
  }

  protected sortingKey(sort: Sort): (s: PPASimpleStats) => any {
    switch (sort.active) {
      case 'label': return (s: PPASimpleStats) => s.label;
      case 'period': return (s: PPASimpleStats) => {
        return Number.isNaN(Number(s.per)) ? Number.MAX_VALUE : s.per;
      }
      default: {
        console.error('Not implemented sorting for ' + sort.active);
        return s => 0;
      }
    }
  }

  protected pageAsset(asset: PPAJobSimpleStats, page: PageEvent) {
    if (!page) { return asset; }

    const pagedEnt = pageObjectData(asset.stats, page);

    const paged = new PPAJobSimpleStats();
    paged.jobId = asset.jobId;
    paged.stats = pagedEnt;

    return paged;
  }


  protected processAsset(asset: PPAJobSimpleStats, params: any): PPAJobSimpleStats {
    return asset;
  }

  protected errorToData(err: any): Observable<PPAJobSimpleStats> {
    return of(new PPAJobSimpleStats());
  }
}
