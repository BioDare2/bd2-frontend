import {DataSource} from '@angular/cdk/collections';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import {catchError, distinctUntilChanged, filter, flatMap, map, switchMap, take, tap} from 'rxjs/operators';
import {BehaviorSubject, combineLatest, merge, Observable, of, Subject} from 'rxjs';
import {BD2eJTKRes, JobResults, RhythmicityJobSummary, TSResult} from '../../rhythmicity-dom';
import {RhythmicityService} from '../../rhythmicity.service';
import {Injectable} from '@angular/core';


/**
 * Data source for the RhythmicityResultsMDTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
@Injectable()
export class RhythmicityResultsMDTableDataSource extends DataSource<TSResult<BD2eJTKRes>> {

  get allData$(): Observable<TSResult<BD2eJTKRes>[]> {
    return this.results$.asObservable();
  }

  dataLength = 0;
  data: TSResult<BD2eJTKRes>[] = [];

  readonly error$ = new Subject<any>();

  private readonly job$ = new BehaviorSubject<RhythmicityJobSummary>(undefined);
  private readonly pvalue$ = new BehaviorSubject<number>(0);
  private readonly bhCorrection$ = new BehaviorSubject<boolean>(false);
  private readonly page$ = new BehaviorSubject<PageEvent>(null);
  private readonly sort$ = new BehaviorSubject<Sort>(null);
  private readonly on$ = new BehaviorSubject<boolean>(false);
  private readonly refresh$ = new Subject<boolean>();
  private readonly results$ = new BehaviorSubject<TSResult<BD2eJTKRes>[]>([]);


  constructor(private rhythmicityService: RhythmicityService) {
    super();

    this.initResults();
  }

  close() {
    this.results$.complete();
    this.job$.complete();
    this.pvalue$.complete();
    this.bhCorrection$.complete();
    this.page$.complete();
    this.sort$.complete();
    this.on$.complete();
    this.refresh$.complete();
    this.error$.complete();
    this.data = [];
    this.dataLength = 0;
  }

  assayJob(def: RhythmicityJobSummary) {
    if (def) {
      this.job$.next(def);
    }
  }

  pvalue(val: number) {
    if (val != null && val !== undefined) {
      this.pvalue$.next(val);
    }
  }

  bhCorrection(val: boolean) {
    if (val != null && val !== undefined) {
      this.bhCorrection$.next(val);
    }
  }

  page(page: PageEvent) {
    this.page$.next(page);
  }

  sort(sort: Sort) {
    this.sort$.next(sort);
  }

  on(state = true) {
    this.on$.next(state);
  }

  refresh() {
    this.refresh$.next(true);
  }


  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TSResult<BD2eJTKRes>[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      this.allData$,
      this.sort$,
      this.page$,
    ];

    return combineLatest(dataMutations).pipe(
      // tap( p => console.log('Changes', p)),
      map( ([results, sort, page]) => {
        const res = this.getSortedData(results as TSResult<BD2eJTKRes>[], sort as Sort);
        return [res, page];
      }),
      map( ([results, page]) => this.getPagedData(results as TSResult<BD2eJTKRes>[], page as PageEvent))
    );

  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  initResults() {

    const newJob$ = this.initJobs();

    const results = newJob$.pipe(
      // tap( p => console.log('Job Pair', p)),
      switchMap((job) => this.isFinished(job) ? this.loadResults(job) : of(new JobResults<BD2eJTKRes>())),

    );

    const rankedResults = combineLatest( [results, this.pvalue$, this.bhCorrection$]).pipe(
      // tap( p => console.log('Results pvalue', p)),
      map(([jobRes, pvalue, bhCorrected]) => {
        this.rankResults(jobRes, pvalue, bhCorrected);
        return jobRes.results;
      } ),
      tap(d => {
        this.dataLength = d.length;
        this.data = d;
      })
    );

    // we do it this way so the HTTP observable won't be subscribed and called twice
    rankedResults.subscribe( res => this.results$.next(res), err => this.error$.next(err));
  }

  isFinished(job: RhythmicityJobSummary) {
    if (!job) { return false; }
    return job.jobStatus.state === 'SUCCESS';
  }

  private initJobs(): Observable<RhythmicityJobSummary> {
    const onJob$ = combineLatest( [this.job$, this.on$]).pipe(
      filter( ([job, isOn]) => job && isOn),
      map( ([job, isOn]) => job)
    );

    const distinctJob$ = onJob$.pipe(
      // tap( p => console.log('Before distinct', p)),
      distinctUntilChanged( (
                            def1: RhythmicityJobSummary,
                            def2: RhythmicityJobSummary) =>
                  def1.jobId === def2.jobId && def1.parentId === def2.parentId
      ),
      // tap( p => console.log('After distinct', p)),

    );

    /*
    const refreshedJob$ = combineLatest([ onJob$, this.refresh$]).pipe(
      tap( p => console.log('Before refresh', p)),
      filter( ([job, isRef]) => isRef),
      map( ([job, isRef]) => job),
      tap( p => console.log('After refresh', p)),
    ); */

    const refreshedJob2$ = this.refresh$.pipe(
      flatMap( v => distinctJob$.pipe(take(1))),
    );

    const merged = merge(distinctJob$, refreshedJob2$);

    return merged;

  }


  private labelPatterns(jobRes: JobResults<BD2eJTKRes>) {

    jobRes.results.forEach( res => res.result.patternLabel = this.describePattern(res.result) );
  }

  private describePattern(res: BD2eJTKRes) {
    const pattern = res.pattern;
    const peak = Math.round(pattern.peak * 10) / 10;
    return `${pattern.waveform} ${pattern.period}:${peak}`;
  }

  private rankResults(jobRes: JobResults<BD2eJTKRes>, pvalue: number, bhCorrected: boolean) {
    jobRes.results.forEach( res => {
      const ejtkR = res.result;
      const p = bhCorrected ? ejtkR.empPBH : ejtkR.empP;
      ejtkR.rhythmic = p < pvalue;
    });
  }


  private loadResults(job: RhythmicityJobSummary): Observable<JobResults<BD2eJTKRes>> {
    // console.log('Fetching results', job.jobId);
    return this.rhythmicityService.getResults(job.parentId, job.jobId).pipe(
      // tap( r => console.log('Fetched results', r)),
      tap( res => this.labelPatterns(res)),
      catchError( err => {
        console.error('Could not load results', err);
        this.error$.next(err);
        return of(new JobResults<BD2eJTKRes>());
      })
    );
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TSResult<BD2eJTKRes>[], page: PageEvent): TSResult<BD2eJTKRes>[] {
    if (!page) {
      return [];
    }

    const startIndex = page.pageIndex * page.pageSize;

    return data.slice().splice(startIndex, page.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TSResult<BD2eJTKRes>[], sort: Sort) {
    if (!sort || !sort.active || sort.direction === '') {
      return data;
    }

    return data.slice().sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'label': return compare(a.label, b.label, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'empp': return compare(+a.result.empP, +b.result.empP, isAsc);
        case 'emppbh': return compare(+a.result.empPBH, +b.result.empPBH, isAsc);
        case 'tau': return compare(+a.result.tau, +b.result.tau, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
