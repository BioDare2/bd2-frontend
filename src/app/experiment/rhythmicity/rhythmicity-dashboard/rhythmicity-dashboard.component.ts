import {Component, QueryList, ViewChildren} from '@angular/core';
import {RhythmicityBaseComponent} from '../rhythmicity-base.component';
import {RhythmicityService} from '../rhythmicity.service';
import {ExperimentComponentsDependencies} from '../../experiment-components.dependencies';
import {PPAJobPaneComponent} from '../../ppa/ppa-dashboard/ppajob-pane/ppajob-pane.component';
import {ExperimentalAssayView} from '../../../dom/repo/exp/experimental-assay-view';
import {PPAJobSummary} from '../../ppa/ppa-dom';

@Component({
  templateUrl: './rhythmicity-dashboard.component.html',
  styles: []
})
export class RhythmicityDashboardComponent extends RhythmicityBaseComponent {

  jobs: PPAJobSummary[];
  jobsIds: number[];

  hasFinished = false;
  queuing: number;
  blocked = false;

  exportURL: string;

  // @ViewChildren(PPAJobPaneComponent)
  panes: QueryList<PPAJobPaneComponent>;

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

  protected loadJobs(exp: ExperimentalAssayView): Promise<PPAJobSummary[]> {
    return this.rhythmicityService.getJobs(exp)
      .then(jobs => {
        this.jobs = jobs;
        this.refreshJobsInfo(jobs);
        return jobs;
      });

  }

  protected refreshJobsInfo(jobs: PPAJobSummary[]) {
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
