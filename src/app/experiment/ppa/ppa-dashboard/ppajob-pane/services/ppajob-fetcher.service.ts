import {Inject, Injectable, Optional} from '@angular/core';
import {BehaviorSubject, combineLatest, merge, Observable, Subject, Subscription, timer} from 'rxjs';
import {PPAJobSummary} from '../../../ppa-dom';
import {distinctUntilChanged, filter, flatMap, map, take, tap} from 'rxjs/operators';
import {PPAService} from '../../../ppa.service';
import {IntervalsKeeper} from '../../../../../fetching-services/intervals-keeper';
import {RunnableFetcherService} from '../../../../../fetching-services/runnable-fetcher.service';
import {REMOVE_DEBOUNCE} from '../../../../../shared/tokens';


@Injectable()
export class PPAJobFetcherService extends RunnableFetcherService<[number, number], number, PPAJobSummary> {


  readonly allJob$: Observable<PPAJobSummary>;
  readonly failedJob$: Observable<PPAJobSummary>;
  readonly finishedJob$: Observable<PPAJobSummary>;
  readonly runningJob$: Observable<PPAJobSummary>;

  constructor(private ppaService: PPAService,
              @Inject(REMOVE_DEBOUNCE) @Optional() removeDebounce = false) {

    super(removeDebounce);

    this.finishedJob$ = this.finished$;

    this.runningJob$ = this.running$;

    this.failedJob$ = this.failed$;


    this.allJob$ = this.all$;

  }

  get currentAssayJobId() {
    return this.currentInput;
  }

  get currentJob() {
    return this.currentAsset;
  }


  initIntervalsKeeper() {
    return new IntervalsKeeper<number>(500, 20 * 1000, 5 * 60 * 1000, 1.4);
  }


  assayJobId( ids: [number,  number]) {
    this.input(ids);
  }


  hasFailed(job: PPAJobSummary): boolean {
    if (!job) { return false; }
    if (this.isFinished(job)) { return false; }
    if (this.isRunning(job)) { return false; }
    return true;
  }

  isFinished(job: PPAJobSummary): boolean {

    if (job && job.state && (job.state === 'FINISHED' || job.state === 'SUCCESS')) {
      return true;
    }
    return false;
  }

  isRunning(job: PPAJobSummary): boolean {

    if (job && job.state && (job.state === 'SUBMITTED' || job.state === 'PROCESSING')) {
      return true;
    }

    return false;
  }


  protected fetchAsset([assayId, jobId]) {

    return this.ppaService.getPPAJob(assayId, jobId).pipe(
      tap(job => {
        if (job) {
          job.parentId = job.parentId || assayId;
        } else {
          console.warn('Loaded null job ', [assayId, jobId]);
        }
      })
    );
  }

  protected assetToId(asset: PPAJobSummary): number {
    return asset.jobId;
  }

  protected assetToInput(asset: PPAJobSummary): [number, number] {
    return [asset.parentId, asset.jobId];
  }

  protected sameInput(def1: [number, number], def2: [number, number]): boolean {
    if (!def1 || !def2 ) { return false; }
    return (def1[0] === def2[0]) && (def1[1] === def2[1]);
  }


}
