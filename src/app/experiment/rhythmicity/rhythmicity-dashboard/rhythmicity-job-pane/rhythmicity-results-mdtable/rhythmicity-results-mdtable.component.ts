import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { RhythmicityResultsMDTableDataSource } from './rhythmicity-results-mdtable-datasource';
import {BD2eJTKRes, TSResult} from '../../../rhythmicity-dom';
import {Subject} from 'rxjs';

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

  @Input()
  dataSource: RhythmicityResultsMDTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'label', 'rhythmic', 'empp', 'tau', 'pattern'];

  result$ = new Subject<TSResult<BD2eJTKRes>[]>();

  @Input()
  set results(results: TSResult<BD2eJTKRes>[]) {
    if (results) {
      this.result$.next(results.slice());
    } else {
      this.result$.next([]);
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

    this.sort.sortChange.forEach( sort => this.dataSource.sort$.next(sort));
    this.paginator.page.forEach( page => this.dataSource.page$.next(page));

    const firstSort: Sort = { active: this.sort.active, direction: this.sort.direction};
    this.dataSource.sort$.next(firstSort);

    const firstPage = new PageEvent();
    firstPage.pageSize = this.paginator.pageSize;
    firstPage.pageIndex = this.paginator.pageIndex;
    this.dataSource.page$.next(firstPage);

    this.table.dataSource = this.dataSource;
  }


}
