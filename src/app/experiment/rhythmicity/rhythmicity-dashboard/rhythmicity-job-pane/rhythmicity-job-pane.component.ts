import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {ExperimentalAssayView} from '../../../../dom/repo/exp/experimental-assay-view';
import {FeedbackService} from '../../../../feedback/feedback.service';
import {RhythmicityService} from '../../rhythmicity.service';
import {BehaviorSubject, Observable, timer} from 'rxjs';
import {BD2eJTKRes, RhythmicityJobSummary, TSResult} from '../../rhythmicity-dom';
import {LocalDateTime} from '../../../../dom/repo/shared/dates';
import {distinct, filter, map, switchMap, combineLatest} from 'rxjs/operators';

import {RhythmicityResultsMDTableDataSource} from './rhythmicity-results-mdtable-datasource';
import {ConfirmDialogComponent} from '../../../../shared/confirm-dialog.component';
import {RhythmicityJobDatasourceService} from './rhythmicity-job-datasource.service';

@Component({
  selector: 'bd2-rhythmicity-job-pane',
  templateUrl: './rhythmicity-job-pane.component.html',
  styles: [],
  providers: [RhythmicityJobDatasourceService]
})
export class RhythmicityJobPaneComponent implements OnInit, OnChanges, OnDestroy {


  @Input()
  jobId: string;

  @Input()
  assay: ExperimentalAssayView;

  @Input()
  confirmDialog: ConfirmDialogComponent;

  @Output()
  deleted = new EventEmitter<RhythmicityJobSummary>();

  private _expanded = false;

  get expanded(): boolean {
    return this._expanded;
  }

  @Input()
  set expanded(val: boolean) {
    this._expanded = val;
    this.expandedToogleStream.next(val);
  }

  dataSource: RhythmicityResultsMDTableDataSource;

  job: RhythmicityJobSummary;

  // jobStream = new BehaviorSubject<RhythmicityJobSummary>(null);
  expandedToogleStream = new BehaviorSubject<boolean>(false);


  assayJob$ = new BehaviorSubject<[ExperimentalAssayView, RhythmicityJobSummary]>([null, null]);

  dots = '';

  retries = 0;
  RETRY_INT = 1000;
  MAX_TRIES = (10 * 60 * 1000) / this.RETRY_INT;

  indResults: TSResult<BD2eJTKRes>[];

  constructor(private rhythmicityService: RhythmicityService,
              private rhythmicityJobDatasource: RhythmicityJobDatasourceService,
              private feedback: FeedbackService) { }

  ngOnInit() {
    this.initSubscriptions();

    this.dataSource = this.initResultsSource();

  }

  ngOnDestroy() {
    // if (this.jobStream) {
    //  this.jobStream.complete();
    // }
    if (this.expandedToogleStream) {
      this.expandedToogleStream.complete();
    }
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.jobId || changes.assay) {
      if (this.jobId && this.assay) {
        // this.retries = 0;
        // this.loadJob(this.jobId, this.assay.id);
        this.rhythmicityJobDatasource.assayJob([this.assay, this.jobId]);
      }
    }

  }

  export() {

  }

  delete() {
    // in case they change when dialog is on
    const exp = this.assay;
    const job = this.job;

    if (this.confirmDialog) {
      this.confirmDialog.ask('Do you want to delete analysis: ' + job.jobId,
        job.parameters.PARAMS_SUMMARY
      ).then(ans => {
        if (ans) {
          this.doDelete(exp, job.jobId);
        }
      });
    } else {
      console.log('Confirmation dialog missing on job pane');
      this.doDelete(exp, job.jobId);
    }
  }

  doDelete(exp: ExperimentalAssayView, jobId: string) {
    // console.log("Delete");
    this.rhythmicityService.deleteJob(exp, jobId)
      .subscribe(
        job => {
        this.deleted.next(job);
        this.feedback.success('Job: ' + job.jobId + ' deleted');
      }, reason => {
        this.feedback.error(reason);
      });
  }


  initResultsSource() {
    const dataSource = new RhythmicityResultsMDTableDataSource(this.rhythmicityService);
    this.assayJob$.forEach( v => dataSource.assayJob(v));
    this.expandedToogleStream.forEach( v => {
      this.rhythmicityJobDatasource.on(v);
      dataSource.on(v);
    });
    return dataSource;
  }

  initSubscriptions() {

    this.rhythmicityJobDatasource.allJob$.subscribe(j => {
      console.log("allJobs ", j);
      this.job = j;
      this.assayJob$.next([this.assay, this.job]);
    }, err => console.log("Err",err));

    /*
    this.jobStream.subscribe(j => {
      this.job = j;
      this.assayJob$.next([this.assay, this.job]);
    });

    this.initCheckingRunning();
  */
    // this.initResults();
  }

  /*
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
  }*/



  loadJob(jobId: string, assayId: number, reloaded?: boolean) {
    /*this.rhythmicityService.getJob(assayId, jobId)
      .then(job => {
        job.reloaded = reloaded;
        this.jobStream.next(job);
      })
      .catch(reason => {
        this.feedback.error(reason);
      });*/
  }

  /*
  loadResults(job: RhythmicityJobSummary): Observable<JobResults<BD2eJTKRes>> {
    return this.rhythmicityService.getResults(this.assay.id, job.jobId);
  } */

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
    console.log('pvalue from widget', pvalue);
    this.dataSource.pvalue(pvalue);

  }
}
