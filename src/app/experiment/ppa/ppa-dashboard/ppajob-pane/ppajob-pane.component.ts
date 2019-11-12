import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {ExperimentalAssayView} from '../../../../dom/repo/exp/experimental-assay-view';
import {ConfirmDialogComponent} from '../../../../shared/confirm-dialog.component';
import {SelectableFitDialogComponent} from '../../ppa-fit/selectable-fit-dialog.component';
import {PPAJobExportDialogComponent} from './ppajob-export-dialog/ppajob-export-dialog.component';
import {
  PPAJobResultsGroups,
  PPAJobSimpleResults,
  PPAJobSimpleStats,
  PPAJobSummary,
  valueFromPhaseName
} from '../../ppa-dom';
import {PhaseParams} from './phases-options-widget.component';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {PPAService} from '../../ppa.service';
import {FeedbackService} from '../../../../feedback/feedback.service';
import * as FileSaver from 'file-saver';
import {combineLatest, filter, map, switchMap, tap} from 'rxjs/operators';
import {BD2ColorPalette} from '../../../../graphic/color/color-palette';
import {PPAJobFetcherService} from './services/ppajob-fetcher.service';

@Component({
  selector: 'bd2-ppajob-pane',
  templateUrl: './ppajob-pane.component.html',
  styles: [`
    div label {
      margin-bottom: 1em;
    }

    div.btn-wrap {
      display: inline-block;
      margin-bottom: 1em;
    }

    div.btn-wrap label {
      margin-bottom: 4px;
    }

    label.wide {
      min-width: 52px;
    }

  `],
  providers: [PPAJobFetcherService]
})
export class PPAJobPaneComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  jobId: number;

  @Input()
  assay: ExperimentalAssayView;

  @Input()
  phaseType = 'ByFit';
  @Input()
  relativeTo = 'zero';
  @Input()
  phaseUnit = 'circ';
  @Input()
  confirmDialog: ConfirmDialogComponent;
  @Input()
  fitDialog: SelectableFitDialogComponent;
  @Input()
  exportDialog: PPAJobExportDialogComponent;
  @Output()
  deleted = new EventEmitter<PPAJobSummary>();
  @Output()
  finished = this.ppaJobFetcher.finishedJob$; // new EventEmitter<PPAJobSummary>();

  job: PPAJobSummary;
  phaseShowIndividuals = 'selected';
  sorted = 'none';
  legendOn = 'always';
  dots = '';
  // jobStats: PPAJobSimpleStats;
  indResults: PPAJobSimpleResults;
  periods: number[][];
  phases: number[][];
  amplitudes: number[][];
  legend: string[] = [];
  palette: string[] = [];
  removed: number[] = [];
  phaseParams = new PhaseParams(undefined, undefined, undefined);
  periodDomain: number[] = [17, 35];
  phaseDomain: number[] = [0, 24];
  periodsLoading = false;
  phasesLoading = false;
  statsLoading = false;
  indLoading = false;
  retries = 0;
  RETRY_INT = 800;
  MAX_TRIES = (2 * 60 * 1000) / this.RETRY_INT;

  // jobStream = new BehaviorSubject<PPAJobSummary>(null);

  phaseParamsStream = new Subject<PhaseParams>();
  indToogleStream = new BehaviorSubject<boolean>(false);
  statsToogleStream = new BehaviorSubject<boolean>(false);
  periodsToogleStream = new BehaviorSubject<boolean>(false);
  phasesToogleStream = new BehaviorSubject<boolean>(false);
  expandedToogleStream = new BehaviorSubject<boolean>(false);
  resultsStream: Observable<PPAJobResultsGroups>;
  indResultsStream: Observable<PPAJobSimpleResults>;
  statsStream: Observable<PPAJobSimpleStats>;

  constructor(private ppaService: PPAService,
              private ppaJobFetcher: PPAJobFetcherService,
              private feedback: FeedbackService) {

    // console.log("JobPane created");

    this.ppaJobFetcher.on(true);
  }

  // tslint:disable-next-line:variable-name
  private _periodsOn = false;

  get periodsOn(): boolean {
    return this._periodsOn;
  }

  @Input()
  set periodsOn(val: boolean) {
    this._periodsOn = val;
    this.periodsToogleStream.next(val);
  }

  // tslint:disable-next-line:variable-name
  private _phasesOn = false;

  get phasesOn(): boolean {
    return this._phasesOn;
  }

  @Input()
  set phasesOn(val: boolean) {
    this._phasesOn = val;
    this.phasesToogleStream.next(val);
  }

  // tslint:disable-next-line:variable-name
  private _expanded = false;

  get expanded(): boolean {
    return this._expanded;
  }

  @Input()
  set expanded(val: boolean) {
    this._expanded = val;
    this.expandedToogleStream.next(val);
  }

  // tslint:disable-next-line:variable-name
  private _statsOn = false;

  get statsOn(): boolean {
    return this._statsOn;
  }

  // resultsToogleStream: Observable<boolean>;// = new BehaviorSubject<boolean>(false);

  @Input()
  set statsOn(val: boolean) {
    this._statsOn = val;
    this.statsToogleStream.next(val);
  }

  // tslint:disable-next-line:variable-name
  private _indOn = false;

  get indOn(): boolean {
    return this._indOn;
  }

  @Input()
  set indOn(val: boolean) {
    this._indOn = val;
    this.indToogleStream.next(val);
  }

  ngOnInit() {
    this.initSubscriptions();

  }

  ngOnDestroy() {
    /*
    if (this.jobStream) {
      this.jobStream.complete();
    }*/
    this.ppaJobFetcher.close();
  }

  ngOnChanges(changes: SimpleChanges) {

    // console.log("Changes", changes);

    if (changes.jobId || changes.assay) {
      if (this.jobId && this.assay) {
        // this.loadJob(this.jobId, this.assay.id);
        this.ppaJobFetcher.assayJobId([this.assay.id, this.jobId]);
      }
    }

  }

  phaseOptions(params: PhaseParams) {
    // console.log("Ph"+this.jobId, params);
    this.phaseParamsStream.next(params);
    this.phaseParams = params;
  }

  export() {
    if (!this.exportDialog) {
      console.log('Missing export dialog');
      return;
    }

    this.exportDialog.show(this.phaseType)
      .then(resp => {
        if (resp) {
          // console.log("Exporting...");
          this.ppaService.downloadPPAJob(this.assay.id, this.jobId, resp)
            .then(blob => {
              // console.log("ER", ans);
              // let blob = new Blob([ans], {type: 'text/csv'});
              // let blob = ans.blob();
              // console.log("B", blob);
              this.saveJobBlob(blob, this.assay.id, this.jobId);
            });
        } else {
          // console.log("Cancelled");
        }
      });
  }

  saveJobBlob(blob: Blob, expId: number, jobId: number) {
    FileSaver.saveAs(blob, expId + '_job' + jobId + '.ppa.csv');
    // let url= window.URL.createObjectURL(blob);
    // console.log("U",url);
    // window.open(url);
  }

  delete() {
    // in case they change when dialog is on
    const exp = this.assay;
    const job = this.job;

    if (this.confirmDialog) {
      this.confirmDialog.ask('Do you want to delete analysis: ' + job.jobId,
        job.summary
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

  doDelete(exp: ExperimentalAssayView, jobId: number) {
    // console.log("Delete");
    this.ppaService.deletePPAJob(exp, jobId)
      .then(job => {
        this.deleted.next(job);
        this.feedback.success('Job: ' + job.jobId + ' deleted');
      })
      .catch(reason => {
        this.feedback.error(reason);
      });
  }

  refresh() {
    // this.loadJob(this.jobId, this.assay.id, true);
    this.ppaJobFetcher.refresh();
    this.removed = [];
  }

  reload() {
    // console.log("reload");
    this.expanded = true;
    this.refresh();
  }

  toggleExpanded() {
    this.expanded = !this.expanded;
    // this.expandedToogleStream.next(this.expanded);
  }

  toggleStats() {
    this.statsOn = !this.statsOn;
    // this.statsToogleStream.next(this.statsOn);
  }

  toggleInd() {
    this.indOn = !this.indOn;
  }

  togglePeriods() {
    this.periodsOn = !this.periodsOn;

    // if (this.periodsOn) this.resultsToogleStream.next(true);
  }

  togglePhases() {
    this.phasesOn = !this.phasesOn;
    // this.phasesToogleStream.next(this.phasesOn);
    // if (this.phasesOn) this.resultsToogleStream.next(true);
  }

  hideGroups(marked: number[]) {
    // console.log("Hiding",marked);
    this.removed = marked;
  }

  /*sameOrReloaded(prev: PPAJobSummary, next: PPAJobSummary) {
    // console.log("P: "+prev.reloaded+":"+next.reloaded+":"+(!next.reloaded && (prev.jobId === next.jobId)));
    return ((prev === next) || (!next.reloaded && prev.jobId === next.jobId));
  }*/

  initSubscriptions() {

    this.ppaJobFetcher.error$.subscribe(
      err => this.feedback.error(err)
    );


    this.expandedToogleStream.subscribe(
      exp => {
        // job fetcher should always be on
        // this.ppaJobFetcher.on(exp);
      }
    );

    // this.jobStream.subscribe(j => this.job = j);
    this.ppaJobFetcher.allJob$.subscribe(j => this.job = j);


    /*
    const finishedJobs = this.jobStream.pipe(
      filter(job => this.isFinished(job)));
    */
    const finishedJobs = this.ppaJobFetcher.finishedJob$;

    /*
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

    this.jobStream.pipe(
      filter(job => job && !this.isRunning(job)))
      .subscribe((job) => {
        // console.log("Resets retries: "+job.jobId+":"+this.retries);
        this.retries = 0;
        this.dots = '';
      })
    ;*/

    this.statsStream = this.statsToogleStream.pipe(
      combineLatest(
        this.expandedToogleStream,
        (on1, on2) => on1 && on2
      ),
      combineLatest(
        finishedJobs,
        (on, job) => on ? job : null
      ),
      filter(job => !!job),
      // distinctUntilChanged(this.sameOrReloaded),
      tap(job => {
        // console.log("Getting stats:" + job.jobId);
        this.statsLoading = true;
      }),
      switchMap(job => this.ppaService.getPPAJobSimpleStats(this.assay.id, job.jobId)),
      filter(v => !!v));

    /*
    this.statsStream
    // .delay(3000 + Math.random() * 3000)
      .subscribe(stat => {
          this.statsLoading = false;
          this.jobStats = stat;
        }
      );*/

    this.indResultsStream = this.indToogleStream.pipe(
      combineLatest(
        this.expandedToogleStream,
        (on1, on2) => on1 && on2
      ),
      combineLatest(
        finishedJobs,
        (on, job) => on ? job : null
      ),
      filter(job => !!job),
      // distinctUntilChanged(this.sameOrReloaded),
      tap(job => {
        // console.log("Getting stats:" + job.jobId);
        this.indLoading = true;
      }),
      switchMap(job => this.ppaService.getPPAJobSimpleResults(this.assay.id, job.jobId)),
      filter(v => !!v));

    this.indResultsStream
    // .delay(3000 + Math.random() * 3000)
      .subscribe(res => {
          this.indLoading = false;
          this.indResults = res;
        }
      );

    const results = this.resultsStream = new Subject<PPAJobResultsGroups>();


    this.resultsStream.pipe(
      map(sets => sets.groups.map(set => set.label))
    )
      .subscribe(lab => {
        this.legend = lab;
        this.palette = BD2ColorPalette.palette(lab.length);
      });

    this.periodsToogleStream.pipe(
      combineLatest(
        this.resultsStream,
        (on, res) => on ? res : null
      ),
      filter(res => !!res),
      map(sets => {
        return {
          periods: sets.groups.map(set => set.periods),
          range: [sets.periodMin, sets.periodMax]
        };
      }))
    // .delay(4000 + Math.random() * 3000)
      .subscribe(per => {
        this.periodsLoading = false;
        this.periods = per.periods;
        this.periodDomain = per.range;
      });

    const phaseResultsAndParams = this.phasesToogleStream.pipe(
      combineLatest(
        this.resultsStream,
        (on, res) => on ? res : null
      ),
      filter(res => !!res),
      combineLatest(
        this.phaseParamsStream,
        (res, params) => {
          return {sets: res, params};
        }));

    phaseResultsAndParams.pipe(
      map(res => {
        let phases: number[][];
        let domain: number[];

        if (res.params.phaseUnit === 'circ') {
          phases = res.sets.groups.map(set =>
            res.params.relativeTo === 'zero' ? valueFromPhaseName(set.phases2ZCir, res.params.phaseType)
              : valueFromPhaseName(set.phases2WCir, res.params.phaseType)) as number[][];
          domain = [0, 24];
        } else {
          phases = res.sets.groups.map(set =>
            res.params.relativeTo === 'zero' ? valueFromPhaseName(set.phases2Z, res.params.phaseType)
              : valueFromPhaseName(set.phases2W, res.params.phaseType)) as number[][];
          domain = [0, res.sets.periodMax];
        }
        return {phases, domain};
      }))
    // .delay(Math.random() * 3000)
      .subscribe((pack: { phases: number[][], domain: number[] }) => {
        this.phasesLoading = false;
        this.phases = pack.phases;
        this.phaseDomain = pack.domain;
      });


    // only emits true if one emits true
    const resultsToogleStream = this.periodsToogleStream.pipe(
      combineLatest(
        this.phasesToogleStream,
        (on1, on2) => on1 || on2
      ),
      combineLatest(
        this.expandedToogleStream,
        (on1, on2) => on1 && on2
      ));

    // to prevent from multiple calls to backend
    finishedJobs.pipe(
      combineLatest(
        resultsToogleStream, (job, on) => {
          return on ? job : null;
        }),
      filter(job => !!job),
      // distinctUntilChanged(this.sameOrReloaded),
      tap(() => {
        this.periodsLoading = true;
        this.phasesLoading = true;
      }),
      switchMap(job => this.ppaService.getPPAJobResultsGrouped(this.assay.id, job.jobId))
    )
      .subscribe(res => results.next(res), err => results.error(err), () => results.complete());


    /*
    finishedJobs.pipe(
      distinctUntilChanged(this.sameOrReloaded)
    ).subscribe(job => this.finished.next(job));
     */
  }

  /*
  loadJob(jobId: number, assayId: number, reloaded?: boolean) {
    this.ppaService.getPPAJob(assayId, jobId).toPromise()
      .then(job => {
        job.reloaded = reloaded;
        this.jobStream.next(job);
      })
      .catch(reason => {
        this.feedback.error(reason);
      });
  }*/

  simplifyJobState(job: PPAJobSummary) {
    /*if (job.status.state === 'SUCCESS') {
     return 'FINISHED';
     }*/
    return job.state;
  }


  isFinished(job: PPAJobSummary): boolean {

    return this.ppaJobFetcher.isFinished(job);

    /*if (job && job.state && (job.state === 'FINISHED' || job.state === 'SUCCESS')) {
      return true;
    }
    return false;*/
  }

  /*
  isRunning(job: PPAJobSummary): boolean {
    if (!job) {
      return false;
    }
    if (!this._expanded) {
      return false;
    }
    if (this.retries > this.MAX_TRIES) {
      return false;
    }
    if (job && job.state && (job.state === 'SUBMITTED' || job.state === 'PROCESSING')) {
      return true;
    }
    return false;
  }*/

}
