import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CellSelection, DataTableSlice} from '../data-table-dom';
import {MatTable} from '@angular/material';

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

  displayedColumns: string[];  // = ['rowNr', 'A', 'B', 'C', 'D', 'E', 'F', 'G ', 'H' ];
  // dataColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'G ', 'H' ];

  selectedRow: any[];
  selectedRowIx: number;
  selectedRowName: string;
  selectedColIx: number;
  selectedColName: string;

  columnsNames: string[] = [];
  rowsNames: string[] = [];
  data: (string | number)[][] = [];

  @ViewChild('table', { static: false })
  matTable: MatTable<(string | number)[]>;

  // tslint:disable-next-line:variable-name
  private _dataSlice: DataTableSlice;

  @Input()
  set dataSlice(dataSlice: DataTableSlice) {
    this._dataSlice = dataSlice;
    this.columnsNames = dataSlice.columnsNames;
    this.rowsNames = dataSlice.rowsNames;
    this.displayedColumns = ['rowNr'].concat(this.columnsNames);
    this.data = dataSlice.data;

    if (this.matTable) {
      this.matTable.renderRows();
    }
  }

  @Output()
  selected = new EventEmitter<CellSelection>();


  constructor() {

    const data = new DataTableSlice();
    data.columnsNames = ['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G ', 'H' ];
    data.columnsNumbers = [0, 1, 2,    3,   4,   5,   6,   7,    8];
    data.rowsNames = [0, 1, 2, 3, 4, 5, 6, 7, 8].map( v => '' + v);
    data.rowsNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    data.data = [
    [0, 'A', 'B', 'C', 'D', 'E', 'F', 'G ', 'H', ],
    [1, 'toc 1 tr tra', 12345600, 1, 'toc 1 tr tra', 12345600, 2, 'toc 3232 ', 12.00012, ],
    [2, 'toc 3232 ', 12.00012, 2, 'toc 3232 ', 12.00012, 2, 'toc 3232 ', 12.00012, ],
    [3, 'toc 2323a', '12E-07', 3, 'toc 2323a', 12E-07, 3, 'toc 2323a', 12E-07, ],
    [4, 'wt', 12345600, 4, 'wt', 12345600, 4, 'wt', 12345600],
    [5, 'wt', 12345600, 5, 'wt', 12345600, 5, 'wt', 12345600, ],
    [6, 'sf f sffsdffdf a', 12345600, 6, 'sf f sffsdffdf a', 12345600, 6, 'sf f sffsdffdf a', 12345600, ],
    [7, 'sdfdsffd sdfdsfdfdsdfdfds', 12345600, 7, 'sdfdsffd sdfdsfdfdsdfdfds', 12345600, 7, 'sdfdsffd sdfdsfdfdsdfdfds', 12345600, ],
    [8, 'sdf sdfdsfdfdfd', 12345600, 8, 'sdf sdfdsfdfdfd', 12345600, 8, 'sdf sdfdsfdfdfd', 12345600, ],
    ];

    this.dataSlice = data;

  }

  ngOnInit() {
  }

  selectCell(colIx: number, rowIx: number) {

    this.selectedRow = this.data[rowIx];
    this.selectedRowIx = rowIx;
    this.selectedRowName = this.rowsNames[rowIx];
    this.selectedColIx = colIx;
    this.selectedColName = this.columnsNames[colIx];

    const value = this.selectedRow[colIx];
    const columnNumber = this._dataSlice.columnsNumbers[colIx];
    const rowNumber = this._dataSlice.rowsNumbers[rowIx];
    const event = new CellSelection(
      this.selectedColIx, columnNumber, this.selectedColName,
      this.selectedRowIx, rowNumber, this.selectedRowName,
      value
    );

    this.selected.next(event);
  }
}
