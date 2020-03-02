import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import {RhythmicityResultsFetcherService} from '../services/rhythmicity-results-fetcher.service';
import {RhythmicityJobSummary, StatTestOptions} from '../../../rhythmicity-dom';
import {FeedbackService} from '../../../../../feedback/feedback.service';

@Component({
  selector: 'bd2-rhythmicity-results-mdtable',
  templateUrl: './rhythmicity-results-mdtable.component.html',
  styles: [`
    .full-width-table {
      width: 100%;
    }

  `],
  providers: [RhythmicityResultsFetcherService]
})
export class RhythmicityResultsMDTableComponent implements AfterViewInit, OnInit, OnDestroy {
  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  // @ViewChild(MatSort, {static: false}) sort: MatSort;
  // @ViewChild(MatTable, {static: false}) table: MatTable<TSResult<BD2eJTKRes>>;

  @Input()
  set job(job: RhythmicityJobSummary) {
    if (job) {
      this.fetcher.input(job);
    }
  }

  @Input()
  set statTestParams(options: StatTestOptions) {
    if (options) {
      this.fetcher.params(options);
      let cols = options.bhCorrection ? this.bhEmpPColumns : this.normEmpPColumns;
      if (this.fetcher.isClassicJob()) {
        cols = options.bhCorrection ? this.bhClsPColumns : this.normClsPColumns;
      }
      if (options.showPattern) {
          cols = options.circadian ? cols.concat(this.patternColumnsC) : cols.concat(this.patternColumns);
      }
      this.displayedColumns = cols;
    }
  }

  constructor(public fetcher: RhythmicityResultsFetcherService,
              private feedback: FeedbackService) {

  }


  normEmpPColumns = ['id', 'label', 'rhythmic', 'empp', 'tau'];
  normClsPColumns = ['id', 'label', 'rhythmic', 'p', 'tau'];
  bhEmpPColumns = ['id', 'label', 'rhythmic', 'emppbh', 'tau'];
  bhClsPColumns = ['id', 'label', 'rhythmic', 'pbh', 'tau'];
  patternColumns = ['shape', 'period', 'peak', 'trough'];
  patternColumnsC = ['shape', 'period', 'peakc', 'troughc'];
  displayedColumns = this.normEmpPColumns; // ['id', 'label', 'rhythmic', 'empp', 'emppbh', 'tau', 'pattern'];
  disablePaginator = false;

  ngOnInit() {

    this.fetcher.error$.subscribe( err => this.feedback.error(err));

    const firstPage = new PageEvent();
    firstPage.pageSize = 25;
    firstPage.pageIndex = 0;
    this.fetcher.page(firstPage);

    this.fetcher.on(true);
  }

  ngOnDestroy() {
    this.fetcher.close();
  }

  ngAfterViewInit() {

    // this.sort.sortChange.forEach( sort => this.fetcher.sort(sort));
    // this.paginator.page.forEach( page => this.fetcher.page(page));

    // const firstSort: Sort = { active: this.sort.active, direction: this.sort.direction};
    // this.fetcher.sort(firstSort);



    // this.table.fetcher = this.fetcher;
  }

  reload() {
    this.fetcher.refresh();
  }

  sortData(sort: Sort) {
    this.fetcher.sort(sort);
  }

  loadPage(page: PageEvent) {
    // console.log('Load page', page);
    this.fetcher.page(page);
  }
}
