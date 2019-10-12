import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bd2-data-sheet-mdtable',
  templateUrl: './data-sheet-mdtable.component.html',
  styles: [`
    .data-sheet-container {
      max-height: 300px;
      overflow: auto;
    }

    .mat-table-sticky:first-child {
      border-right: 1px solid #e0e0e0;
      padding-right: 1em;
    }

    
    .mat-header-cell, .mat-cell {
      padding-left: 0.5em;
      padding-right: 0.5em;
    }
    
    tr.selected-row {
      background-color: #dda0dd;
    }
    
    label {
      color: rgba(0,0,0,0.54);
    }
  `]
})
export class DataSheetMDTableComponent implements OnInit {

  displayedColumns = ['rowNr', 'A', 'B', 'C', 'D', 'E', 'F', 'G ', 'H' ];
  dataColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'G ', 'H' ];

  selectedRow: any[];
  selectedColIx: number;
  selectedCol: string;

  dataSource = [
    [0, 'A', 'B', 'C', 'D', 'E','F', 'G ', 'H',],
    [1, 'toc 1 tr tra', 12345600, 1, 'toc 1 tr tra', 12345600,2, 'toc 3232 ', 12.00012,],
    [2, 'toc 3232 ', 12.00012,2, 'toc 3232 ', 12.00012,2, 'toc 3232 ', 12.00012,],
    [3, 'toc 2323a', 12E-07,3, 'toc 2323a', 12E-07,3, 'toc 2323a', 12E-07,],
    [4, 'wt', 12345600,4, 'wt', 12345600,4, 'wt', 12345600],
    [5, 'wt', 12345600,5, 'wt', 12345600,5, 'wt', 12345600,],
    [6, 'sf f sffsdffdf a', 12345600,6, 'sf f sffsdffdf a', 12345600,6, 'sf f sffsdffdf a', 12345600,],
    [7, 'sdfdsffd sdfdsfdfdsdfdfds', 12345600,7, 'sdfdsffd sdfdsfdfdsdfdfds', 12345600,7, 'sdfdsffd sdfdsfdfdsdfdfds', 12345600,],
    [8, 'sdf sdfdsfdfdfd', 12345600,8, 'sdf sdfdsfdfdfd', 12345600,8, 'sdf sdfdsfdfdfd', 12345600,],
  ]
  constructor() { }

  ngOnInit() {
  }

  selectRow(row: any[]) {
    this.selectedRow = row;
  }

  selectCell(row: any[], colIx: number) {
    this.selectedRow = row;
    this.selectedColIx = colIx;
    this.selectedCol = this.dataColumns[colIx];
  }
}
