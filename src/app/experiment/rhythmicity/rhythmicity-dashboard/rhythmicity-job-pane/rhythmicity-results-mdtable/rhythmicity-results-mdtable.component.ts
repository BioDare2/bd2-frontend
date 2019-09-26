import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { RhythmicityResultsMDTableDataSource } from '../rhythmicity-results-mdtable-datasource';
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
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<TSResult<BD2eJTKRes>>;

  constructor(private dataSource: RhythmicityResultsMDTableDataSource) {

  }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'label', 'rhythmic', 'empp', 'tau', 'pattern'];

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.sort.sortChange.forEach( sort => this.dataSource.sort(sort));
    this.paginator.page.forEach( page => this.dataSource.page(page));

    const firstSort: Sort = { active: this.sort.active, direction: this.sort.direction};
    this.dataSource.sort(firstSort);

    const firstPage = new PageEvent();
    firstPage.pageSize = this.paginator.pageSize;
    firstPage.pageIndex = this.paginator.pageIndex;
    this.dataSource.page(firstPage);

    this.table.dataSource = this.dataSource;
  }


}
