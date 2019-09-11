import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { RhythmicityResultsMDTableDataSource } from './rhythmicity-results-mdtable-datasource';
import {BD2eJTKRes, TSResult} from "../../../rhythmicity-dom";
import {Subject} from "rxjs";

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
    // this.dataSource = new RhythmicityResultsMDTableDataSource(this.result$.asObservable());
  }

  ngAfterViewInit() {
    console.log("ngAfer", this.dataSource);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  describePattern(res: BD2eJTKRes) {
    const pattern = res.pattern;
    const peak = Math.round(pattern.peak * 10) / 10;
    return `${pattern.waveform} ${pattern.period}:${peak}`;
  }
}
