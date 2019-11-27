import {Inject, Injectable, Optional} from '@angular/core';
import {PPAService} from '../../../ppa.service';
import {REMOVE_DEBOUNCE} from '../../../../../shared/tokens';
import {PPAJobResultsGroups, PPAJobSummary, PPAResultsGroupSummary,} from '../../../ppa-dom';
import {Observable} from 'rxjs';
import {Sort} from '@angular/material';
import {PageableSortableArraysFetcherService} from '../../../../../fetching-services/pageable-sortable-arrays-fetcher.service';
import {tap} from 'rxjs/operators';
import {sortingMedian} from '../../../../../shared/collections-util';

@Injectable()
export class PPAGroupResultsFetcherService
  extends PageableSortableArraysFetcherService<PPAJobSummary, string, PPAJobResultsGroups, PPAResultsGroupSummary> {

  readonly results$: Observable<PPAResultsGroupSummary[]>;

  constructor(private ppaService: PPAService,
              @Inject(REMOVE_DEBOUNCE) @Optional() removeDebounce = false) {

    super(removeDebounce);

    this.results$ = this.data$;
  }

  protected sameInput(def1: PPAJobSummary, def2: PPAJobSummary) {
    return PPAJobSummary.sameJob(def1, def2);
  }

  protected assetToData(asset: PPAJobResultsGroups) {
    return asset.groups;
  }

  protected fetchAsset(job: PPAJobSummary): Observable<PPAJobResultsGroups> {
    return this.ppaService.getPPAJobResultsGrouped(job.parentId, job.jobId)
      .pipe(tap( jobRes => {
        const min = jobRes.periodMin;
        const max = jobRes.periodMax;
        jobRes.groups.forEach( gr => {
          gr.jobPeriodMin = gr.jobPeriodMin || min;
          gr.jobPeriodMax = gr.jobPeriodMax || max;
        });
      }));
  }


  protected sortingKey(sort: Sort): (s: PPAResultsGroupSummary) => any {
    switch (sort.active) {
      case 'id': return (s) => s.memberDataId;
      case 'label': return (s) => s.label;
      case 'period': return (s) => {
        if (!s.medianPeriod) {
          s.medianPeriod = sortingMedian(s.periods);
        }
        return s.medianPeriod;
      };
      default: {
        console.error('Not implemented sorting for ' + sort.active);
        return s => 0;
      }
    }
  }



}
