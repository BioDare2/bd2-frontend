import {Component, OnDestroy, OnInit} from '@angular/core';
import {PPABaseComponent} from '../ppa-base.component';
import {FitSelection, PPAJobSummary, PPASelectGroup} from '../ppa-dom';
import {ActivatedRoute, Params} from '@angular/router';
import {PPAService} from '../ppa.service';
import {ExperimentComponentsDependencies} from '../../experiment-components.dependencies';
import {combineLatest, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {ExperimentalAssayView} from '../../../dom/repo/exp/experimental-assay-view';
import {PPADialogsService} from '../ppa-dialogs/ppadialogs.service';

@Component({
  templateUrl: './ppa-select-periods-form.component.html',
  providers:  []
})
export class PPASelectPeriodsFormComponent extends PPABaseComponent implements OnInit, OnDestroy {

  job: PPAJobSummary;
  ppaGroups: PPASelectGroup[];
  blocked = false;

  // hack to load data when experiment is known
  // private _jobId:number;

  constructor(
    private route: ActivatedRoute,
    ppaService: PPAService,
    serviceDependencies: ExperimentComponentsDependencies,
    private dialogs: PPADialogsService) {

    super(ppaService, serviceDependencies);

  }

  private expJobSubscription: Subscription;


  // overwritten as depends on simultanously exp and jobId
  ngOnInit() {

    this.subscribeToExperimentAndJob();
  }

  subscribeToExperimentAndJob() {

    const exps = this.currentExperiment.experiment().pipe(
      filter( exp => (exp ? true : false)));

    const params = this.route.params.pipe(
      map( (p: Params) => p.jobId),
      filter( id => ( id ? true : false)));

    const joined = combineLatest(exps, params, (exp, job) => ({ assay: exp, jobId: job}));

    this.expJobSubscription = joined.subscribe(
      (val: {assay: ExperimentalAssayView, jobId: number}) => {
        this.updateModel(val.assay);
        this.loadData(val.assay, val.jobId);
        // console.log(this.constructor.name+" changed exp and jobId: "+( val.assay != null ? val.assay.id : "null" )+":"+val.jobId);
      },
      err => this.feedback.error(err),
      () => console.log(this.constructor.name + ' expSubscription completed')
    );
  }

  ngOnDestroy(): void {

    if (this.expJobSubscription) {
      this.expJobSubscription.unsubscribe();
    }
  }


  loadData(exp: ExperimentalAssayView, jobId: number) {


    this.loadJob(exp.id, jobId)
      .then(job => this.loadPPAForSelect(exp.id, jobId))
      .catch( reason => this.feedback.error(reason));
  }

  loadJob(expId: number, jobId: number): Promise<PPAJobSummary> {

    return this.ppaService.getPPAJob(expId, jobId).toPromise()
      .then( job => {
        this.job = job;
        return job;
      });
  }

  loadPPAForSelect(expId: number, jobId: number): Promise<PPASelectGroup[]> {
    return this.ppaService.getPPAForSelect(expId, jobId)
      .then( groups => {
        this.ppaGroups = groups;
        return groups;
      });
  }

  markSelection(selection: FitSelection) {
    // console.log("Mark selection",selection);

    const gr = this.ppaGroups.find( g => g.dataId === selection.dataId);
    // console.log("F: ",gr);
    if (gr) {
      gr.selected = selection.selected;
    }
  }

  selectPPA(data: any) {

    // console.log("Select data:\n"+JSON.stringify(data));

    if (data) {
      this.blocked = true;
      this.ppaService.doPPASelection(this.assay.id, this.job.jobId, data)
        .then(resp => {
          if (resp.needsAttention) {
            this.feedback.success('Selected periods, but still ' + resp.needsAttention
              + ' entries needs attention'); } else {
            this.feedback.success('Selected periods, no entries needs attention');
          }
        })
        .then(() => this.goToPPAHome())
        .catch(reason => {
          this.blocked = false;
          this.feedback.error(reason);
        });
    }
  }


  showFit(group: PPASelectGroup) {
    // let dataId = group.dataId;
    // let selection = group.selected;

    // console.log("Showing fit for: "+dataId+";"+selection,selection);

    /*if (this.fitDialog) {
      this.fitDialog.show(this.assay.id, this.job.jobId, group.dataId, true, group.selected);
    }*/

    this.dialogs.ppaFit(this.assay.id, this.job.jobId, group.dataId, true, group.selected).subscribe(
      sel => {
        if (sel) {
          this.markSelection(sel);
        }
      }
    );
  }

}
