import {Inject, Injectable, Optional} from '@angular/core';
import {REMOVE_DEBOUNCE} from '../../../../../shared/tokens';
import {PageableSortableFetcherService} from './pageable-sortable-fetcher.service';
import {PPAJobSimpleStats, PPAJobSummary} from '../../../ppa-dom';
import {PPAService} from '../../../ppa.service';

@Injectable()
export class PPAStatsFetcherService extends PageableSortableFetcherService<PPAJobSummary, PPAJobSimpleStats, PPAJobSimpleStats> {


  constructor(private ppaService: PPAService,
              @Inject(REMOVE_DEBOUNCE) @Optional() removeDebounce = false) {
    super(removeDebounce);
  }

  protected sameInput(def1: PPAJobSummary, def2: PPAJobSummary) {
    if (!def1 || def2 ) { return false; }

    return def1.jobId === def2.jobId && def1.parentId === def2.parentId;
  }



}
