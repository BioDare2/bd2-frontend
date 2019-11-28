import {Observable} from 'rxjs';
import {RhythmicityService} from '../../../rhythmicity.service';
import {tap} from 'rxjs/operators';
import {RhythmicityJobSummary} from '../../../rhythmicity-dom';
import {Inject, Injectable, Optional} from '@angular/core';
import {RunnableFetcherService} from '../../../../../fetching-services/runnable-fetcher.service';
import {REMOVE_DEBOUNCE} from '../../../../../shared/tokens';
import {IntervalsKeeper} from '../../../../../fetching-services/intervals-keeper';


@Injectable()
// tslint:disable-next-line:max-line-length
export class RhythmicityJobFetcherService extends RunnableFetcherService<[number, string], string, RhythmicityJobSummary> {


  readonly allJob$: Observable<RhythmicityJobSummary>;
  readonly finishedJob$: Observable<RhythmicityJobSummary>;
  readonly runningJob$: Observable<RhythmicityJobSummary>;


  // currentAssay: ExperimentalAssayView;
  get currentJob() {
    return this.currentAsset;
  }



  constructor(private rhythmicityService: RhythmicityService,
              @Inject(REMOVE_DEBOUNCE) @Optional() removeDebounce = false) {

    super(removeDebounce);

    this.finishedJob$ = this.finished$;

    this.runningJob$ = this.running$;

    this.allJob$ = this.all$;
  }

  protected initIntervalsKeeper(): IntervalsKeeper<string> {
    return new IntervalsKeeper<string>(1000, 30 * 1000, 10 * 60 * 1000, 2);
  }


  assayJob(assayJobId: [number, string]) {
    this.input(assayJobId);
  }

  protected sameInput( def1: [number, string],  def2: [number, string]) {
    return def1[1] === def2[1] && def1[0] === def2[0];
  }

  protected fetchAsset([assayId, jobId]: [number, string]) {

    return this.rhythmicityService.getJob(assayId, jobId).pipe(
      tap(job => {
        if (job) {
          job.parentId = job.parentId || assayId;
        } else {
          console.warn('Loaded null job ', [assayId, jobId]);
        }
      })
    );
  }

  hasFailed(job: RhythmicityJobSummary): boolean {
    if (!job) { return false; }
    if (this.isFinished(job)) { return false; }
    if (this.isRunning(job)) { return false; }
    return true;
  }

  isFinished(job: RhythmicityJobSummary): boolean {

    if (job && job.jobStatus && (job.jobStatus.state === 'FINISHED' || job.jobStatus.state === 'SUCCESS')) {
      return true;
    }
    return false;
  }

  isRunning(job: RhythmicityJobSummary): boolean {
    if (!job) {
      return false;
    }
    if (job && job.jobStatus && (job.jobStatus.state === 'SUBMITTED' || job.jobStatus.state === 'PROCESSING')) {
      return true;
    }
    return false;
  }

  protected assetToId(asset: RhythmicityJobSummary): string {
    return asset.jobId;
  }

  protected assetToInput(asset: RhythmicityJobSummary): [number, string] {
    return [asset.parentId, asset.jobId];
  }


}
