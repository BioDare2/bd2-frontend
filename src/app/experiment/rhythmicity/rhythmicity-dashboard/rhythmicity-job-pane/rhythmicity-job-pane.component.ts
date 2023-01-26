import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ExperimentalAssayView} from '../../../../dom/repo/exp/experimental-assay-view';
import {FeedbackService} from '../../../../feedback/feedback.service';
import {RhythmicityService} from '../../rhythmicity.service';
import {BehaviorSubject, timer} from 'rxjs';
import {RhythmicityJobSummary, StatTestOptions} from '../../rhythmicity-dom';
import {LocalDateTime} from '../../../../dom/repo/shared/dates';

// a explanation how to save files https://nils-mehlhorn.de/posts/angular-file-download-progress
// in case I want to remove filesaver
//import * as FileSaver from 'file-saver';

import {  fileSave } from 'browser-fs-access';
import {RhythmicityJobFetcherService} from './services/rhythmicity-job-fetcher.service';
import {RhythmicityResultsMDTableComponent} from './rhythmicity-results-mdtable/rhythmicity-results-mdtable.component';
import {SharedDialogsService} from '../../../../shared/shared-dialogs/shared-dialogs.service';
import {shortUUID} from '../../../../shared/collections-util';

@Component({
  selector: 'bd2-rhythmicity-job-pane',
  templateUrl: './rhythmicity-job-pane.component.html',
  styles: [],
  providers: [RhythmicityJobFetcherService]
})
export class RhythmicityJobPaneComponent implements OnInit, OnChanges, OnDestroy {

  @ViewChild(RhythmicityResultsMDTableComponent)
  resultsTable: RhythmicityResultsMDTableComponent;

  @Input()
  jobId: string;

  @Input()
  assay: ExperimentalAssayView;

  @Output()
  deleted = new EventEmitter<RhythmicityJobSummary>();


  @Input()
  set expanded(val: boolean) {
    this.isExpanded = val;
    this.expandedToogleStream.next(val);
  }

  isExpanded = false;
  expandedToogleStream = new BehaviorSubject<boolean>(false);

  statTestParams: StatTestOptions;


  constructor(private rhythmicityService: RhythmicityService,
              public rhythmicityJobDatasource: RhythmicityJobFetcherService,
              // private rhythmicityResultsDataSource: RhythmicityResultsMDTableDataSource,
              private feedback: FeedbackService,
              private dialogs: SharedDialogsService) { }

  ngOnInit() {

    this.initSubscriptions();

  }

  ngOnDestroy() {

    this.rhythmicityJobDatasource.close();
    // this.rhythmicityResultsDataSource.close();

    if (this.expandedToogleStream) {
      this.expandedToogleStream.complete();
    }
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes['jobId'] || changes['assay']) {
      if (this.jobId && this.assay) {
        this.rhythmicityJobDatasource.assayJob([this.assay.id, this.jobId]);
      }
    }
  }

  statTestOptions(params: StatTestOptions) {

    // delayed passing as was getting error from angular
    // value change (it starts as undefined then the widget emits the setting)
    const s = timer(1).subscribe( () => {
        this.statTestParams = params;
        if (s) { s.unsubscribe(); }
    });
  }

  export() {

      this.rhythmicityService.downloadJob(this.assay.id, this.jobId)
        .subscribe( blob => {
            this.saveJobBlob(blob, this.assay.id, this.jobId);
          },
    err => this.feedback.error(err));
  }

  saveJobBlob(blob: Blob, expId: number, jobId: string) {


    //FileSaver.saveAs(blob, expId + '_job' + this.shortUUID(jobId) + '.rhythmicity.csv');
    // let url= window.URL.createObjectURL(blob);
    // console.log("U",url);
    // window.open(url);


    const opt = {
      fileName: expId + '_job' + this.shortUUID(jobId) + '.rhythmicity.csv',
      extensions: ['.csv']
    }

    fileSave(blob, opt)
      .then( v => {
        //console.log('Saved export');
      })
      .catch( v => console.log('could not save export', v));
  }

  refresh() {
    this.rhythmicityJobDatasource.refresh();
    if (this.resultsTable) {
      this.resultsTable.reload();
    }

    // this.rhythmicityResultsDataSource.refresh();
  }

  delete() {
    // in case they change when dialog is on
    const exp = this.assay;
    const job = this.rhythmicityJobDatasource.currentJob;

    this.dialogs.confirm('Do you want to delete analysis: ' + job.jobId,
        job.parameters.PARAMS_SUMMARY
      ).subscribe(ans => {
        if (ans) {
          this.doDelete(exp, job.jobId);
        }
      });
    /*
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
    }*/
  }

  initSubscriptions() {

    // always fetch a job to have something to display
    this.rhythmicityJobDatasource.on(true);

    /*this.rhythmicityJobDatasource.finishedJob$.forEach(
        job => this.rhythmicityResultsDataSource.input(job)
    );*/

    // this.expandedToogleStream.forEach( v => { this.rhythmicityResultsDataSource.on(v); } );

    this.rhythmicityJobDatasource.error$.forEach( reason => this.feedback.error(reason));
    // this.rhythmicityResultsDataSource.error$.forEach( reason => this.feedback.error(reason));

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
    return shortUUID(id);
  }

  friendlyMethod(method: string) {
    if (method === 'BD2JTK') { return 'Classic JTK'; }
    if (method === 'BD2EJTK') { return 'BD2 eJTK'; }
    return method;
  }

}
