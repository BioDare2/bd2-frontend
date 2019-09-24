import {Component, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {RhythmicityBaseComponent} from '../rhythmicity-base.component';
import {RhythmicityService} from '../rhythmicity.service';
import {ExperimentComponentsDependencies} from '../../experiment-components.dependencies';

import {ExperimentalAssayView} from '../../../dom/repo/exp/experimental-assay-view';
import {RhythmicityJobSummary} from '../rhythmicity-dom';

import {RhythmicityJobPaneComponent} from './rhythmicity-job-pane/rhythmicity-job-pane.component';
import {ConfirmDialogComponent} from '../../../shared/confirm-dialog.component';

@Component({
  templateUrl: './rhythmicity-dashboard.component.html',
  styles: []
})
export class RhythmicityDashboardComponent extends RhythmicityBaseComponent {

  // the dialogs are shared with the children jobs panes
  @ViewChild('confirmDialog', { static: false })
  confirmDialog: ConfirmDialogComponent;

  jobs: RhythmicityJobSummary[];
  jobsIds: string[];

  expandAll = false;

  hasFinished = false;
  queuing: number;
  blocked = false;

  exportURL: string;

  @ViewChildren(RhythmicityJobPaneComponent)
  panes: QueryList<RhythmicityJobPaneComponent>;

  constructor(
    rhythmicityService: RhythmicityService,
    serviceDependencies: ExperimentComponentsDependencies) {
    super(rhythmicityService, serviceDependencies);

    this.titlePart = ' Rhythm';

  }

  protected updateModel(exp: ExperimentalAssayView) {
    super.updateModel(exp);
    if (exp) {
      this.loadRhythmicity(exp);
    }
  }

  protected loadRhythmicity(exp: ExperimentalAssayView): Promise<any> {
    // console.log("Dashboard loading jobs");
    return this.loadJobs(exp)
      .then(() => this.exportURL = this.rhythmicityService.exportURL(exp))
      .catch(reason => {
        this.blocked = false;
        this.feedback.error(reason);
      });
  }

  protected loadJobs(exp: ExperimentalAssayView): Promise<RhythmicityJobSummary[]> {
    return this.rhythmicityService.getJobs(exp)
      .then(jobs => {
        this.jobs = jobs;
        this.refreshJobsInfo(jobs);
        return jobs;
      });

  }

  protected refreshJobsInfo(jobs: RhythmicityJobSummary[]) {
    this.jobsIds = jobs.map(j => j.jobId);
    this.queuing = this.calculateQueuing(jobs);
    this.hasFinished = this.checkFinished(jobs);
  }


  refresh() {
    this.loadRhythmicity(this.assay)
      .then(() => {
        // this.blocked = false;
        if (this.panes) {
          this.panes.forEach(pane => pane.refresh());
        }
      });
  }

  remove(job: RhythmicityJobSummary) {
    // this.blocked = true;
    const ix = this.jobs.findIndex(j => job.jobId === j.jobId);
    if (ix >= 0) {
      this.jobs.splice(ix, 1);
      this.refreshJobsInfo(this.jobs);
    }
    // this.blocked = false;
  }

  refreshJob(job: RhythmicityJobSummary) {
    // console.log("Refresh", job);
    // this.blocked = true;
    const ix = this.jobs.findIndex(j => job.jobId === j.jobId);
    if (ix >= 0) {
      this.jobs[ix] = job;
      this.refreshJobsInfo(this.jobs);
    }
    // this.blocked = false;
  }



  protected calculateQueuing(jobs: RhythmicityJobSummary[]) {

    return jobs.filter(j => this.isQueueing(j.jobStatus.state)).length;

  }

  protected isQueueing(state: string): boolean {
    switch (state) {
      case 'WAITING':
        return true;
      case 'PROCESSING':
        return true;
      case 'SUBMITTED':
        return true;
      default:
        return false;
    }

  }

  protected checkFinished(jobs: RhythmicityJobSummary[]): boolean {

    return !!jobs.find(j => this.isFinished(j.jobStatus.state));

  }

  protected isFinished(state: string): boolean {
    switch (state) {
      case 'SUCCESS':
        return true;
      case 'FINISHED':
        return true;
      case 'COMPLETED':
        return true;
      default:
        return false;
    }

  }


}
