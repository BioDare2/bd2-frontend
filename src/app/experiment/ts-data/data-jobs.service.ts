import {Injectable, OnDestroy} from '@angular/core';
import {RhythmicityService} from '../rhythmicity/rhythmicity.service';
import {PPAService} from '../ppa/ppa.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {PPAJobSummary} from '../ppa/ppa-dom';
import {RhythmicityJobSummary} from '../rhythmicity/rhythmicity-dom';
import {ExperimentalAssayView} from '../../dom/repo/exp/experimental-assay-view';



@Injectable()
export class DataJobsService implements OnDestroy {

  readonly ppaJobs$: Observable<PPAJobSummary[]>;
  readonly rhythmJobs$: Observable<RhythmicityJobSummary[]>;
  readonly error$ = new Subject<any>();

  allowedPPAMethods: string[] = undefined;
  allowedRhythmMethods: string[] = undefined;

  protected ppaJobs: BehaviorSubject<PPAJobSummary[]>;
  protected rhythmJobs: BehaviorSubject<RhythmicityJobSummary[]>;


  constructor(protected ppa: PPAService, protected rhythmicity: RhythmicityService) {
    this.ppaJobs = new BehaviorSubject<PPAJobSummary[]>([]);
    this.rhythmJobs = new BehaviorSubject<RhythmicityJobSummary[]>([]);

    this.ppaJobs$ = this.ppaJobs.asObservable();
    this.rhythmJobs$ = this.rhythmJobs.asObservable();
  }

  ngOnDestroy(): void {
    this.ppaJobs.complete();
    this.rhythmJobs.complete();
  }

  experiment(exp: ExperimentalAssayView) {

    this.fetchPPA(exp);
    this.fetchRhythm(exp);
  }


  protected fetchPPA(exp: ExperimentalAssayView) {
      this.ppa.getPPAJobs(exp).subscribe(
        jobs => {
          jobs = jobs.filter( job => PPAJobSummary.isFinished(job));
          if (this.allowedPPAMethods) {
            jobs = jobs.filter( job => this.allowedPPAMethods.includes(job.method))
          }
          this.ppaJobs.next(jobs);
        },
        error => {
          this.error$.next(error);
          this.ppaJobs.next([]);
        }
      );
  }

  protected fetchRhythm(exp: ExperimentalAssayView) {
    this.rhythmicity.getJobs(exp).subscribe(
      jobs => {
        jobs = jobs.filter( job => RhythmicityJobSummary.isFinished(job));
        if (this.allowedRhythmMethods) {
          jobs = jobs.filter( job => this.allowedRhythmMethods.includes(job.parameters.METHOD))
        }
        this.rhythmJobs.next(jobs);
      },
      error => {
        this.error$.next(error);
        this.rhythmJobs.next([]);
      }
    );
  }
}
