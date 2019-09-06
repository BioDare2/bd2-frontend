import {Component, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {PPABaseComponent} from '../ppa-base.component';
import {ConfirmDialogComponent} from '../../../shared/confirm-dialog.component';
import {SelectableFitDialogComponent} from '../ppa-fit/selectable-fit-dialog.component';
import {PPAJobExportDialogComponent} from './ppajob-pane/ppajob-export-dialog/ppajob-export-dialog.component';
import {PPAJobPaneComponent} from './ppajob-pane/ppajob-pane.component';
import {PPAJobSummary} from '../ppa-dom';
import {PPAService} from '../ppa.service';
import {ExperimentComponentsDependencies} from '../../experiment-components.dependencies';
import {ExperimentalAssayView} from '../../../dom/repo/exp/experimental-assay-view';

@Component({
  templateUrl: './ppa-dashboard.component.html',
  providers: []
})
export class PPADashboardComponent extends PPABaseComponent {


  // the dialogs are shared with the children jobs panes
  @ViewChild('confirmDialog', { static: false })
  confirmDialog: ConfirmDialogComponent;

  @ViewChild(SelectableFitDialogComponent, { static: false })
  fitDialog: SelectableFitDialogComponent;

  @ViewChild(PPAJobExportDialogComponent, { static: false })
  exportDialog: PPAJobExportDialogComponent;


  @ViewChildren(PPAJobPaneComponent)
  panes: QueryList<PPAJobPaneComponent>;

  jobs: PPAJobSummary[];
  jobsIds: number[];

  // jobsStats: PPAJobStats[];
  // ppaResults: PPAResultsGroup[];
  hasFinished = false;

  blocked = false;

  exportURL: string;

  queuing: number;
  phaseType: string;
  relativeTo: string;
  phaseUnit: string;
  showResults: boolean;

  periodsOn = true;
  phasesOn = true;
  statsOn = false;
  expandAll = false;


  constructor(ppaService: PPAService,
              serviceDependencies: ExperimentComponentsDependencies) {
    super(ppaService, serviceDependencies);

    this.phaseType = 'ByFit';
    this.relativeTo = 'zero';
    this.phaseUnit = 'circ';
    this.showResults = false;
    // this.ppaResults = undefined;

  }

  remove(job: PPAJobSummary) {
    // this.blocked = true;
    const ix = this.jobs.findIndex(j => job.jobId === j.jobId);
    if (ix >= 0) {
      this.jobs.splice(ix, 1);
      this.refreshJobs(this.jobs);
    }
    // this.blocked = false;
  }

  refreshJob(job: PPAJobSummary) {
    // console.log("Refresh", job);
    // this.blocked = true;
    const ix = this.jobs.findIndex(j => job.jobId === j.jobId);
    if (ix >= 0) {
      this.jobs[ix] = job;
      this.refreshJobs(this.jobs);
    }
    // this.blocked = false;
  }

  refresh() {
    // this.blocked = true;
    this.loadPPA(this.assay)
      .then(() => {
        // this.blocked = false;
        if (this.panes) {
          this.panes.forEach(pane => pane.refresh());
        }
      });
  }

  simplifyJobState(job: PPAJobSummary) {
    if (job.state === 'SUCCESS') {
      return 'FINISHED';
    }

    return job.state;
  }

  protected updateModel(exp: ExperimentalAssayView) {
    super.updateModel(exp);
    if (exp) {
      this.loadPPA(exp);
    }
  }

  protected loadPPA(exp: ExperimentalAssayView): Promise<any> {
    // console.log("Dashboard loading jobs");
    return this.loadJobs(exp)
      .then(() => this.exportURL = this.ppaService.exportURL(exp))
      .catch(reason => {
        this.blocked = false;
        this.feedback.error(reason);
      });
  }

  protected loadJobs(exp: ExperimentalAssayView): Promise<PPAJobSummary[]> {
    return this.ppaService.getPPAJobs(exp)
      .then(jobs => {
        this.jobs = jobs;
        this.refreshJobs(jobs);
        return jobs;
      });

  }

  protected refreshJobs(jobs: PPAJobSummary[]) {
    this.jobsIds = jobs.map(j => j.jobId);
    this.queuing = this.calculateQueuing(jobs);
    this.hasFinished = this.checkFinished(jobs);
  }


  protected calculateQueuing(jobs: PPAJobSummary[]) {

    return jobs.filter(j => this.isQueueing(j.state)).length;

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


  protected checkFinished(jobs: PPAJobSummary[]): boolean {

    return !!jobs.find(j => this.isFinished(j.state));

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
