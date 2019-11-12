import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, merge, Observable, Subject, Subscription, timer} from 'rxjs';
import {PPAJobSummary} from '../../../ppa-dom';
import {distinctUntilChanged, filter, flatMap, map, take} from 'rxjs/operators';
import {PPAService} from '../../../ppa.service';


export class IntervalsKeeper<T> {

  id: T;
  interval: number;
  deadline: number;

  constructor(
    private readonly RELOAD_INT = 1000, // 1 s
    private readonly MAX_RELOAD_INT = 30 * 1000, // 30 s
    private readonly MAX_RELOAD_TIME = 5 * 60 * 1000 // 5 min
  ) {
  }

  nextInterval(id: T): number {
    if (this.id !== id ) {
      this.reset(id);
    } else {
      if (this.interval < this.MAX_RELOAD_INT) {
        this.interval *= 2;
      }
    }

    if (this.deadline > Date.now()) {
      return this.interval;
    } else {
      return undefined;
    }
  }

  reset(id: T) {
    this.id = id;
    this.interval = this.RELOAD_INT;
    this.deadline = Date.now() + this.MAX_RELOAD_TIME;
  }

}

@Injectable()
export class PPAJobFetcherService {


  readonly allJob$: Observable<PPAJobSummary>;
  readonly failedJob$: Observable<PPAJobSummary>;
  readonly finishedJob$: Observable<PPAJobSummary>;
  readonly runningJob$: Observable<PPAJobSummary>;

  readonly isReloading$ = new BehaviorSubject<boolean>(false);
  readonly error$ = new Subject<any>();

  private readonly assayJobId$ = new BehaviorSubject<[number, number]>(undefined);
  private readonly on$ = new BehaviorSubject<boolean>(false);
  private readonly refresh$ = new Subject<boolean>();
  private readonly job$ = new BehaviorSubject<PPAJobSummary>(undefined);

  currentAssayJobId: [number, number];
  currentJob: PPAJobSummary;

  private currentReloadStatus = new IntervalsKeeper<number>(1000, 30 * 1000, 5 * 60 * 1000);

  private reloadSubscription: Subscription;

  constructor(private ppaService: PPAService) {

    this.finishedJob$ = this.job$.asObservable().pipe(
      filter( j => j && this.isFinished(j))
    );

    this.runningJob$ = this.job$.asObservable().pipe(
      filter( j => j && this.isRunning(j))
    );

    this.failedJob$ = this.job$.asObservable().pipe(
      filter( j => j && this.hasFailed(j))
    );


    this.allJob$ = this.job$.asObservable().pipe(
      filter( j => j != null && j !== undefined)
    );

    this.initJobStreams();
  }

  close() {
    this.job$.complete();
    this.error$.complete();
    this.isReloading$.complete();
    this.assayJobId$.complete();
    this.on$.complete();
    this.refresh$.complete();
    if (this.reloadSubscription) { this.reloadSubscription.unsubscribe(); }
  }

  assayJobId( ids: [number,  number]) {
    if (ids && ids[0] && ids[1]) {
      this.assayJobId$.next(ids);
    }
  }

  on(state = true) {
    this.on$.next(state);
  }

  refresh() {
    // reset the reload
    this.currentReloadStatus.reset(undefined);
    if (this.reloadSubscription) { this.reloadSubscription.unsubscribe(); }
    this.refresh$.next(true);
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

  private initJobStreams() {

    const inputJobs = this.initAssayJobInput();

    inputJobs.subscribe( ids => this.loadJob(ids));

    this.runningJob$.subscribe( job => this.reloadJob(job));

  }

  private loadJob([assayId, jobId]) {

    this.ppaService.getPPAJob(assayId, jobId).subscribe(
      job => {
        if (job) {
          job.parentId = job.parentId || assayId;
          this.currentJob = job;
          this.currentAssayJobId = [assayId, jobId];
          this.job$.next(job);
          this.isReloading$.next(this.isRunning(job));
        } else {
          console.warn('Loaded null job ', [assayId, jobId]);
        }
      },
      error => this.error$.next(error)
    );
  }

  private reloadJob(job: PPAJobSummary) {


    if (this.reloadSubscription) { this.reloadSubscription.unsubscribe(); }

    const interval = this.currentReloadStatus.nextInterval(job.jobId);


    if (!interval) {
      // cancel reloading
      this.isReloading$.next(false);
      return;
    }

    const assayId = this.currentAssayJobId[0];

    this.reloadSubscription = timer( interval).subscribe(
      v => {
        if (this.currentAssayJobId && (job.jobId === this.currentAssayJobId[1])) {
          this.reloadSubscription = undefined;
          this.loadJob([assayId, job.jobId]);
        } else {
          console.log('Disabled reload as job has changed');
        }
      });

  }


  private initAssayJobInput(): Observable<[number, number]> {

    const onJob$ = combineLatest( [this.assayJobId$, this.on$]).pipe(
      filter( ([job, isOn]) => job && isOn),
      map( ([job, isOn]) => job)
    );

    const distinctJob$ = onJob$.pipe(
      distinctUntilChanged( (
        def1: [number, number],
        def2: [number, number]) =>
        def1[1] === def2[1] && def1[0] === def2[0]
      ));

    const refreshedJob2$ = this.refresh$.pipe(
      flatMap( v => distinctJob$.pipe(take(1))),
    );

    const merged = merge(distinctJob$, refreshedJob2$);

    return merged;
  }
}
