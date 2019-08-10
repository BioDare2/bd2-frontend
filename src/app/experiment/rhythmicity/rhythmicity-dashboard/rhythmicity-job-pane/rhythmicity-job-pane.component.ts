import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ExperimentalAssayView} from '../../../../dom/repo/exp/experimental-assay-view';
import {FeedbackService} from '../../../../feedback/feedback.service';
import {RhythmicityService} from '../../rhythmicity.service';
import {BehaviorSubject, Observable, timer} from 'rxjs';
import {BD2eJTKRes, JobResults, RhythmicityJobSummary, TSResult} from '../../rhythmicity-dom';
import {LocalDateTime} from '../../../../dom/repo/shared/dates';
import {distinct, filter, map, switchMap} from 'rxjs/operators';
import {PPAJobSummary} from '../../../ppa/ppa-dom';
import {combineLatest} from 'rxjs/internal/observable/combineLatest';

@Component({
  selector: 'bd2-rhythmicity-job-pane',
  templateUrl: './rhythmicity-job-pane.component.html',
  styles: []
})
export class RhythmicityJobPaneComponent implements OnInit, OnChanges, OnDestroy {


  @Input()
  jobId: string;

  @Input()
  assay: ExperimentalAssayView;

  private _expanded = false;

  get expanded(): boolean {
    return this._expanded;
  }

  @Input()
  set expanded(val: boolean) {
    this._expanded = val;
    this.expandedToogleStream.next(val);
  }

  job: RhythmicityJobSummary;

  jobStream = new BehaviorSubject<RhythmicityJobSummary>(null);
  expandedToogleStream = new BehaviorSubject<boolean>(false);
  pvalue$ = new BehaviorSubject<number>(0.001);

  dots = '';

  retries = 0;
  RETRY_INT = 1000;
  MAX_TRIES = (10 * 60 * 1000) / this.RETRY_INT;

  indResults: TSResult<BD2eJTKRes>[];

  constructor(private rhythmicityService: RhythmicityService,
              private feedback: FeedbackService) { }

  ngOnInit() {
    this.initSubscriptions();

  }

  ngOnDestroy() {
    if (this.jobStream) {
      this.jobStream.complete();
    }
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.jobId || changes.assay) {
      if (this.jobId && this.assay) {
        this.retries = 0;
        this.loadJob(this.jobId, this.assay.id);
      }
    }

  }

  initSubscriptions() {
    this.jobStream.subscribe(j => this.job = j);

    this.initCheckingRunning();

    this.initResults();
  }

  initCheckingRunning() {
    const runningJobs = this.jobStream.pipe(
      filter(job => this.isRunning(job)));

    runningJobs.subscribe(
      job => {
        timer(this.RETRY_INT)
          .subscribe(() => {
            // console.log("Retrying "+job.jobId+":"+this.retries);
            if (job.jobId !== this.jobId) {
              return;
            }
            this.dots += '*';
            this.retries++;
            if (this.dots.length > 10) {
              this.dots = '*';
            }

            if (this.retries % 4 === 1) {
              this.reload();
            } else {
              this.jobStream.next(job);
            }
          });
      }
    );
  }

  initResults() {
    const finishedJobs = this.jobStream.pipe(
      filter(job => this.isFinished(job)));

    const expandedJobs = combineLatest( finishedJobs, this.expandedToogleStream.pipe(filter( v => v)))
      .pipe(map(([j, e]) => j),
        distinct()
        );

    // expandedJobs.subscribe( job => console.log("Job"+job.jobId));

    const results = expandedJobs.pipe(switchMap(job => this.loadResults(job)));

    const rankedResults = combineLatest( results, this.pvalue$).pipe(
      map(([jobRes, pvalue]) => {
        jobRes.results.forEach( res => {
          const ejtkR = res.result;
          ejtkR.rhythmic = ejtkR.empP < pvalue;
        });
        return jobRes;
      } )
    );

    rankedResults.subscribe( r => this.indResults = r.results);
  }

  loadJob(jobId: string, assayId: number, reloaded?: boolean) {
    this.rhythmicityService.getJob(assayId, jobId)
      .then(job => {
        job.reloaded = reloaded;
        this.jobStream.next(job);
      })
      .catch(reason => {
        this.feedback.error(reason);
      });
  }

  loadResults(job: RhythmicityJobSummary): Observable<JobResults<BD2eJTKRes>> {
    return this.rhythmicityService.getResults(this.assay.id, job.jobId);
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
    this.expandedToogleStream.next(this.expanded);
  }

  reload() {
    // console.log("reload");
    this.expanded = true;
    this.refresh();
  }

  refresh() {
    this.loadJob(this.jobId, this.assay.id, true);
    // this.removed = [];
  }

  toLocalDateTime(val: any) {
    return LocalDateTime.deserialize(val).date;
  }

  isFinished(job: RhythmicityJobSummary) {
    if (!job) { return false; }
    return job.jobStatus.state === 'SUCCESS';
  }

  isRunning(job: RhythmicityJobSummary): boolean {
    if (!job) {
      return false;
    }
    if (!this._expanded) {
      return false;
    }
    if (this.retries > this.MAX_TRIES) {
      return false;
    }
    if (job && job.jobStatus.state && (job.jobStatus.state === 'SUBMITTED' || job.jobStatus.state === 'PROCESSING')) {
      return true;
    }
    return false;
  }

  setPValueThreshold(pvalue: number) {
    console.log('pvalue', pvalue);
    this.pvalue$.next(pvalue);

  }
}
