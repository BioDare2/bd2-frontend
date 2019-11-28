import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {RhythmicityResultsMDTableDataSource} from '../rhythmicity-results-mdtable-datasource';
import {BD2eJTKRes, TSResult} from '../../../rhythmicity-dom';

@Component({
  selector: 'bd2-rhythmicity-results-mdtable',
  templateUrl: './rhythmicity-results-mdtable.component.html',
  styles: [`
    .full-width-table {
      width: 100%;
    }

  `]
})
export class RhythmicityResultsMDTableComponent implements AfterViewInit, OnInit {
  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  // @ViewChild(MatSort, {static: false}) sort: MatSort;
  // @ViewChild(MatTable, {static: false}) table: MatTable<TSResult<BD2eJTKRes>>;

  constructor(private fetcher: RhythmicityResultsMDTableDataSource) {

  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'label', 'rhythmic', 'empp', 'emppbh', 'tau', 'pattern'];
  disablePaginator = false;

  ngOnInit() {
  }

  ngAfterViewInit() {

    // this.sort.sortChange.forEach( sort => this.fetcher.sort(sort));
    // this.paginator.page.forEach( page => this.fetcher.page(page));

    // const firstSort: Sort = { active: this.sort.active, direction: this.sort.direction};
    // this.fetcher.sort(firstSort);

    const firstPage = new PageEvent();
    firstPage.pageSize = 25;
    firstPage.pageIndex = 0;
    this.fetcher.page(firstPage);

    // this.table.fetcher = this.fetcher;
  }

  sortData(sort: Sort) {
    this.fetcher.sort(sort);
  }

  loadPage(page: PageEvent) {
    // console.log('Load page', page);
    this.fetcher.page(page);
  }
}
