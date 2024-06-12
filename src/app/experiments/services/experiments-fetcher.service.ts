import {Inject, Injectable, Optional} from '@angular/core';
import {RemotelyPageableSortableFetcher} from '../../fetching-services/remotely-pageable-sortable-fetcher.service';
import {ListWrapper} from '../../shared/common-interfaces';
import {SearchOptions} from '../search-and-sort-panel/search-and-sort-panel.component';
import {ExperimentSummary} from '../../dom/repo/exp/experiment-summary';
import {Observable, of} from 'rxjs';
import {REMOVE_DEBOUNCE} from '../../shared/tokens';
import {LegacyPageEvent as PageEvent} from '@angular/material/legacy-paginator';
import {Sort} from '@angular/material/sort';
import {ExperimentService} from '../../experiment/experiment.service';


@Injectable()
export class ExperimentsFetcherService
  extends RemotelyPageableSortableFetcher<SearchOptions, string, ListWrapper<ExperimentSummary>, ExperimentSummary[]> {

  readonly experiment$: Observable<ExperimentSummary[]>;

  constructor(private experimentService: ExperimentService,
              @Inject(REMOVE_DEBOUNCE) @Optional() removeDebounce = false) {

    super(removeDebounce);

    this.experiment$ = this.data$;
  }


  protected fetchAsset(search: SearchOptions, sort: Sort, page: PageEvent): Observable<ListWrapper<ExperimentSummary>> {
    // console.log('Fetching experiments q', search);
    // console.log('Fetching experiments sort', sort);
    // console.log('Fetching experiments p', page);
    const query = (search.query || '').trim();
    if (query === '') {
      return this.experimentService.getExperiments(search.showPublic, sort, page);
    } else {
      return this.experimentService.searchExperiments(query, search.showPublic, sort, page);
    }
  }

  protected processData(asset: ListWrapper<ExperimentSummary>, params: string): ExperimentSummary[] {
    return asset.data;
  }

  protected sameInput(def1: SearchOptions, def2: SearchOptions): boolean {
    return (def1.showPublic === def2.showPublic) && (def1.query === def2.query);
  }

  protected assetToDataLength(asset: ListWrapper<ExperimentSummary>): number {
    return asset.currentPage.length;
  }

  protected assetToPage(asset: ListWrapper<ExperimentSummary>) {
    return asset.currentPage;
  }

  protected errorToData(err: any): Observable<ExperimentSummary[]> {
    return of([]);
  }
}
