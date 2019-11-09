import {Inject, Injectable, Optional} from '@angular/core';
import {PPAService} from '../../../ppa.service';
import {REMOVE_DEBOUNCE} from '../../../../../shared/tokens';
import {PageableSortableFetcherService} from './pageable-sortable-fetcher.service';
import {
  PPAJobSimpleResults,
  PPAJobSummary,
  PPASimpleResultEntry,
} from '../../../ppa-dom';
import {Observable, of} from 'rxjs';
import {PageEvent, Sort} from '@angular/material';
import {pageObjectData, sortObjectData} from '../../../../../shared/collections-util';

@Injectable()
export class PPAIndividualResultsFetcherService
  extends PageableSortableFetcherService<PPAJobSummary, PPAJobSimpleResults, PPASimpleResultEntry[]> {


  constructor(private ppaService: PPAService,
              @Inject(REMOVE_DEBOUNCE) @Optional() removeDebounce = false) {

    super(removeDebounce);
  }

  protected sameInput(def1: PPAJobSummary, def2: PPAJobSummary) {
    return PPAJobSummary.sameJob(def1, def2);
  }

  protected assetToDataLength(asset: PPAJobSimpleResults) {
    return asset.results.length;
  }

  protected fetchAsset(job: PPAJobSummary): Observable<PPAJobSimpleResults> {
    return this.ppaService.getPPAJobSimpleResults(job.parentId, job.jobId);
  }

  protected sortAsset(asset: PPAJobSimpleResults, sort: Sort) {

    if (!sort || !sort.active || sort.direction === '') {
      return asset;
    }

    const sortedEnt = sortObjectData(asset.results, sort.direction, this.sortingKey(sort));

    const sorted = new PPAJobSimpleResults();
    sorted.jobId = asset.jobId;
    sorted.results = sortedEnt;


    return sorted;
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

  protected pageAsset(asset: PPAJobSimpleResults, page: PageEvent) {
    if (!page) { return asset; }

    const pagedEnt = pageObjectData(asset.results, page);

    const paged = new PPAJobSimpleResults();
    paged.jobId = asset.jobId;
    paged.results = pagedEnt;

    return paged;
  }

  protected processAsset(asset: PPAJobSimpleResults, params: any): PPASimpleResultEntry[] {
    return asset.results;
  }

  protected errorToData(err: any): Observable<PPASimpleResultEntry[]> {
    return of([]);
  }
}
