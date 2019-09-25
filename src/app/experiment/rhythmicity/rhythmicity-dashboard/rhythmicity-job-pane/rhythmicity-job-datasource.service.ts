import {BehaviorSubject, combineLatest, merge, Observable, Subject, timer} from 'rxjs';
import {RhythmicityService} from '../../rhythmicity.service';
import {ExperimentalAssayView} from '../../../../dom/repo/exp/experimental-assay-view';
import {distinctUntilChanged, filter, map} from 'rxjs/operators';
import {RhythmicityJobSummary} from '../../rhythmicity-dom';
import {Injectable} from '@angular/core';

@Injectable()
export class RhythmicityJobDatasourceService {


  readonly allJob$: Observable<RhythmicityJobSummary>;
  readonly finishedJob$: Observable<RhythmicityJobSummary>;
  readonly runningJob$: Observable<RhythmicityJobSummary>;
  readonly isRunning$ = new BehaviorSubject<boolean>(false);

  readonly error$ = new Subject<any>();

  private readonly assayJob$ = new BehaviorSubject<[ExperimentalAssayView, string]>(null);

  private readonly on$ = new BehaviorSubject<boolean>(false);
  private readonly refresh$ = new BehaviorSubject<boolean>(false);
  private readonly job$ = new BehaviorSubject<RhythmicityJobSummary>(null);

  private assay: ExperimentalAssayView;
  private job: RhythmicityJobSummary;

  private RELOAD_INT = 10 * 1000; // 10 s
  private MAX_RELOAD_INT = 60 * 1000; // 1 minute
  private currentReloadInterval: [string, number] = ['', this.RELOAD_INT];

  constructor(private rhythmicityService: RhythmicityService) {

    this.finishedJob$ = this.job$.asObservable().pipe(
      filter( j => j && !this.isRunning(j))
    );

    this.runningJob$ = this.job$.asObservable().pipe(
      filter( j => j && this.isRunning(j))
    );

    this.allJob$ = this.job$.asObservable().pipe(
      filter( j => j != null && j !== undefined)
    );

    this.initJobStreams();
  }

  assayJob(assayJobId: [ExperimentalAssayView, string]) {
    console.log("JS assayJob", assayJobId);
    if (assayJobId && assayJobId[0] && assayJobId[1]) {
      this.assayJob$.next(assayJobId);
    }
  }

  on(state = true) {
    this.on$.next(state);
  }

  refresh() {
    this.refresh$.next(true);
  }


  private initJobStreams() {

    const inputJobs = this.initInputJobs();

    inputJobs.forEach( def => this.loadJob(def));

    this.runningJob$.forEach( job => this.realoadJob(job));


  }

  private realoadJob(job: RhythmicityJobSummary) {

    timer(this.reloadInterval(job)).subscribe(
      v => {
        if (!this.job || (job.jobId === this.job.jobId)) {
          this.loadJob([this.assay, job.jobId]);
        } else {
          console.log('Disabled reload as job has changed');
        }
      }
    );
  }


  private reloadInterval(job: RhythmicityJobSummary): number {
    if (job.jobId !== this.currentReloadInterval[0]) {
      this.currentReloadInterval[0] = job.jobId;
      this.currentReloadInterval[1] = this.RELOAD_INT;
    } else {
      if (this.currentReloadInterval[1] < this.MAX_RELOAD_INT) {
        this.currentReloadInterval[1] *= 2;
      }
    }
    return this.currentReloadInterval[1];
  }


  private initInputJobs(): Observable<[ExperimentalAssayView, string]> {

    const onJob$ = combineLatest( [this.assayJob$, this.on$]).pipe(
      filter( ([job, isOn]) => job && isOn),
      map( ([job, isOn]) => job)
    );

    const distinctJob$ = onJob$.pipe(
      distinctUntilChanged( (
        def1: [ExperimentalAssayView, string],
        def2: [ExperimentalAssayView, string]) =>
        def1[1] === def2[1] && def1[0].id === def2[0].id
      ));


    const refreshedJob$ = combineLatest([ onJob$, this.refresh$]).pipe(
      filter( ([job, isRef]) => isRef),
      map( ([job, isRef]) => job)
    );

    const merged = merge(distinctJob$, refreshedJob$);

    return merged;
  }

  private loadJob([assay, jobId]: [ExperimentalAssayView, string]) {

    console.log("Loading job", jobId);
    if (assay && jobId) {
      this.rhythmicityService.getJob(assay.id, jobId).subscribe(
        job => {
          if (job) {
            this.job = job;
            this.assay = assay;
            this.job$.next(job);
            this.isRunning$.next(this.isRunning(job));
          } else {
            console.log('Loaded null job');
          }
        },
         err => this.error$.next(err)
      );
    }
  }

  isRunning(job: RhythmicityJobSummary): boolean {
    if (!job) {
      return false;
    }
    if (job && job.jobStatus.state && (job.jobStatus.state === 'SUBMITTED' || job.jobStatus.state === 'PROCESSING')) {
      return true;
    }
    return false;
  }
}
