import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {catchError, map, switchMap, tap} from 'rxjs/operators';
import {Observable, merge, combineLatest} from 'rxjs';
import {BD2eJTKRes, JobResults, RhythmicityJobSummary, TSResult} from '../../../rhythmicity-dom';
import {RhythmicityService} from '../../../rhythmicity.service';
import {ExperimentalAssayView} from '../../../../../dom/repo/exp/experimental-assay-view';


/**
 * Data source for the RhythmicityResultsMDTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class RhythmicityResultsMDTableDataSource extends DataSource<TSResult<BD2eJTKRes>> {
  data$: Observable<TSResult<BD2eJTKRes>[]>;
  paginator: MatPaginator;
  sort: MatSort;
  data: TSResult<BD2eJTKRes>[] = [];

  dataLength = 0;

  constructor(private job$: Observable<[ExperimentalAssayView, RhythmicityJobSummary]>,
              private pvalue$: Observable<number>,
              private rhythmicityService: RhythmicityService) {
    super();

    this.data$ = this.initData(job$, pvalue$);
  }


  initData(job$: Observable<[ExperimentalAssayView, RhythmicityJobSummary]>, pvalue$: Observable<number>):
    Observable<TSResult<BD2eJTKRes>[]> {

    const results = job$.pipe(
      switchMap(([assay, job]) => this.isFinished(job) ? this.loadResults(assay, job) : [])
    );

    const rankedResults = combineLatest( [results, this.pvalue$]).pipe(
      map(([jobRes, pvalue]) => {
        jobRes.results.forEach( res => {
          const ejtkR = res.result;
          ejtkR.rhythmic = ejtkR.empP < pvalue;
        });
        return jobRes;
      } )
    );

    return rankedResults;
  }

  isFinished(job: RhythmicityJobSummary) {
    if (!job) { return false; }
    return job.jobStatus.state === 'SUCCESS';
  }

  loadResults(assay: ExperimentalAssayView, job: RhythmicityJobSummary): Observable<JobResults<BD2eJTKRes>> {
    return this.rhythmicityService.getResults(assay.id, job.jobId).pipe(
      catchError( err => {
        console.error('Could not load results', err);
        return [];
      })
    );
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
      this.data$.pipe(
        tap(d => {
          this.dataLength = d.length;
          this.data = d;
        })
      ),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(
      map((change) => {
        return this.getPagedData(this.getSortedData(this.data));
      }),
    );

  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TSResult<BD2eJTKRes>[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;

    return data.slice().splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TSResult<BD2eJTKRes>[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'label': return compare(a.label, b.label, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'empp': return compare(+a.result.empP, +b.result.empP, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
