import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import {RhythmicityResultsMDTableDataSource} from '../rhythmicity-results-mdtable-datasource';
import {RhythmicityJobSummary, StatTestOptions} from '../../../rhythmicity-dom';

@Component({
  selector: 'bd2-rhythmicity-results-mdtable',
  templateUrl: './rhythmicity-results-mdtable.component.html',
  styles: [`
    .full-width-table {
      width: 100%;
    }

  `],
  providers: [RhythmicityResultsMDTableDataSource]
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
    }
  }

  constructor(private fetcher: RhythmicityResultsMDTableDataSource) {

  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'label', 'rhythmic', 'empp', 'emppbh', 'tau', 'pattern'];
  disablePaginator = false;

  ngOnInit() {

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
