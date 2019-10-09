import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {ExperimentalAssayView} from '../../../../dom/repo/exp/experimental-assay-view';
import {FeedbackService} from '../../../../feedback/feedback.service';
import {RhythmicityService} from '../../rhythmicity.service';
import {BehaviorSubject} from 'rxjs';
import {RhythmicityJobSummary} from '../../rhythmicity-dom';
import {LocalDateTime} from '../../../../dom/repo/shared/dates';

import * as FileSaver from 'file-saver';
import {RhythmicityResultsMDTableDataSource} from './rhythmicity-results-mdtable-datasource';
import {ConfirmDialogComponent} from '../../../../shared/confirm-dialog.component';
import {RhythmicityJobDatasourceService} from './rhythmicity-job-datasource.service';

@Component({
  selector: 'bd2-rhythmicity-job-pane',
  templateUrl: './rhythmicity-job-pane.component.html',
  styles: [],
  providers: [RhythmicityJobDatasourceService, RhythmicityResultsMDTableDataSource]
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


  @Input()
  set expanded(val: boolean) {
    this.isExpanded = val;
    this.expandedToogleStream.next(val);
  }

  private isExpanded = false;
  expandedToogleStream = new BehaviorSubject<boolean>(false);


  constructor(private rhythmicityService: RhythmicityService,
              private rhythmicityJobDatasource: RhythmicityJobDatasourceService,
              private rhythmicityResultsDataSource: RhythmicityResultsMDTableDataSource,
              private feedback: FeedbackService) { }

  ngOnInit() {

    this.initSubscriptions();

  }

  ngOnDestroy() {

    this.rhythmicityJobDatasource.close();
    this.rhythmicityResultsDataSource.close();

    if (this.expandedToogleStream) {
      this.expandedToogleStream.complete();
    }
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.jobId || changes.assay) {
      if (this.jobId && this.assay) {
        this.rhythmicityJobDatasource.assayJob([this.assay, this.jobId]);
      }
    }
  }

  export() {

      this.rhythmicityService.downloadJob(this.assay.id, this.jobId)
        .subscribe( blob => {
            this.saveJobBlob(blob, this.assay.id, this.jobId);
          },
    err => this.feedback.error(err));
  }

  saveJobBlob(blob: Blob, expId: number, jobId: string) {
    FileSaver.saveAs(blob, expId + '_job' + this.shortUUID(jobId) + '.rhythmicity.csv');
    // let url= window.URL.createObjectURL(blob);
    // console.log("U",url);
    // window.open(url);
  }

  refresh() {
    this.rhythmicityJobDatasource.refresh();
    this.rhythmicityResultsDataSource.refresh();
  }

  delete() {
    // in case they change when dialog is on
    const exp = this.assay;
    const job = this.rhythmicityJobDatasource.currentJob;

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

  initSubscriptions() {

    // always fetch a job to have something to display
    this.rhythmicityJobDatasource.on(true);

    this.rhythmicityJobDatasource.finishedJob$.forEach(
        job => this.rhythmicityResultsDataSource.assayJob([this.rhythmicityJobDatasource.currentAssay, job])
    );

    this.expandedToogleStream.forEach( v => { this.rhythmicityResultsDataSource.on(v); } );

    this.rhythmicityJobDatasource.error$.forEach( reason => this.feedback.error(reason));
    this.rhythmicityResultsDataSource.error$.forEach( reason => this.feedback.error(reason));

  }

  doDelete(exp: ExperimentalAssayView, jobId: string) {
    // console.log("Delete");
    this.rhythmicityService.deleteJob(exp, jobId)
      .subscribe(
        job => {
        this.deleted.next(job);
        this.feedback.success('Job: ' + this.shortUUID(jobId) + ' deleted');
      }, reason => {
        this.feedback.error(reason);
      });
  }

  toggleExpanded() {
    this.expanded = !this.isExpanded;
  }


  toLocalDateTime(val: any) {
    return LocalDateTime.deserialize(val).date;
  }

  shortUUID(id: string) {
    if (id) {
      const ix = id.indexOf('-');
      if (ix > 1) {
        return id.substring(0, ix);
      }
    }
    return id;
  }

}
