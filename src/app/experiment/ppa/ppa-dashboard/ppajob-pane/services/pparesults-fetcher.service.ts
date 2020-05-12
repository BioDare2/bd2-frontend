import {Inject, Injectable, Optional} from '@angular/core';
import {PPAService} from '../../../ppa.service';
import {REMOVE_DEBOUNCE} from '../../../../../shared/tokens';
import {PPAJobSimpleResults, PPAJobSummary, PPASimpleResultEntry,} from '../../../ppa-dom';
import {Observable} from 'rxjs';
import {Sort} from '@angular/material/sort';
import {PageableSortableArraysFetcherService} from '../../../../../fetching-services/pageable-sortable-arrays-fetcher.service';

@Injectable()
export class PPAResultsFetcherService
  extends PageableSortableArraysFetcherService<PPAJobSummary, string, PPAJobSimpleResults, PPASimpleResultEntry> {

  readonly results$: Observable<PPASimpleResultEntry[]>;

  constructor(private ppaService: PPAService,
              @Inject(REMOVE_DEBOUNCE) @Optional() removeDebounce = false) {

    super(removeDebounce);

    this.results$ = this.data$;
  }

  protected sameInput(def1: PPAJobSummary, def2: PPAJobSummary) {
    return PPAJobSummary.sameJob(def1, def2);
  }

  protected assetToData(asset: PPAJobSimpleResults) {
    return asset.results;
  }

  protected fetchAsset(job: PPAJobSummary): Observable<PPAJobSimpleResults> {
    return this.ppaService.getPPAJobSimpleResults(job.parentId, job.jobId);
  }


  protected sortingKey(sort: Sort): (s: PPASimpleResultEntry) => any {
    switch (sort.active) {
      case 'id': return (s: PPASimpleResultEntry) => s.dataId;
      case 'state': return PPASimpleResultEntry.extractState;
      case 'label': return (s: PPASimpleResultEntry) => s.label;
      case 'period': return (s: PPASimpleResultEntry) => {
        return Number.isNaN(Number(s.per)) ? Number.MAX_VALUE : s.per;
      };
      default: {
        console.error('Not implemented sorting for ' + sort.active);
        return s => 0;
      }
    }
  }

}
