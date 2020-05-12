import {Inject, Injectable, Optional} from '@angular/core';
import {REMOVE_DEBOUNCE} from '../../../../../shared/tokens';
import {PPAJobSimpleStats, PPAJobSummary, PPASimpleStats} from '../../../ppa-dom';
import {PPAService} from '../../../ppa.service';
import {Observable} from 'rxjs';
import {Sort} from '@angular/material/sort';
import {PageableSortableArraysFetcherService} from '../../../../../fetching-services/pageable-sortable-arrays-fetcher.service';

@Injectable()
export class PPAStatsFetcherService extends PageableSortableArraysFetcherService<PPAJobSummary, string, PPAJobSimpleStats, PPASimpleStats> {

  readonly stats$: Observable<PPASimpleStats[]>;

  constructor(private ppaService: PPAService,
              @Inject(REMOVE_DEBOUNCE) @Optional() removeDebounce = false) {
    super(removeDebounce);

    this.stats$ = this.data$;
  }

  protected sameInput(def1: PPAJobSummary, def2: PPAJobSummary) {
    return PPAJobSummary.sameJob(def1, def2);
  }

  protected assetToData(stats: PPAJobSimpleStats) {
    return stats.stats;
  }

  protected fetchAsset(job: PPAJobSummary): Observable<PPAJobSimpleStats> {

    return this.ppaService.getPPAJobSimpleStats(job.parentId, job.jobId);

  }

  protected sortingKey(sort: Sort): (s: PPASimpleStats) => any {
    switch (sort.active) {
      case 'label': return (s: PPASimpleStats) => s.label;
      case 'period': return (s: PPASimpleStats) => {
        return Number.isNaN(Number(s.per)) ? Number.MAX_VALUE : s.per;
      };
      default: {
        console.error('Not implemented sorting for ' + sort.active);
        return s => 0;
      }
    }
  }


}
