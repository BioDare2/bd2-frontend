import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CellSelection, DataTableSlice} from '../data-table-dom';
import {MatTable} from '@angular/material';
import {TableStyler} from './table-styling';

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

    label {
      color: rgba(0,0,0,0.54);
    }
  `]
})
export class DataSheetMDTableComponent implements OnInit {

  displayedColumns: string[];  // = ['rowNr', 'A', 'B', 'C', 'D', 'E', 'F', 'G ', 'H' ];
  // dataColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'G ', 'H' ];

  // selectedRow: any[];
  // selectedRowIx: number;
  // selectedRowName: string;
  // selectedColIx: number;
  // selectedColName: string;

  columnsNames: string[] = [];
  rowsNames: string[] = [];
  data: (string | number)[][] = [];

  @ViewChild('table', { static: false })
  matTable: MatTable<(string | number)[]>;

  // tslint:disable-next-line:variable-name
  private _dataSlice: DataTableSlice;

  @Input()
  set dataSlice(dataSlice: DataTableSlice) {
    if (!dataSlice) {
      return;
    }
    this._dataSlice = dataSlice;
    this.columnsNames = dataSlice.columnsNames;
    this.rowsNames = dataSlice.rowsNames;
    this.displayedColumns = ['rowNr'].concat(this.columnsNames);
    this.data = dataSlice.data;

    if (this.matTable) {
      this.matTable.renderRows();
    }
  }

  @Input()
  styler = new TableStyler();

  @Input()
  selectableColHeader = false;

  @Input()
  selectableRowHeader = false;


  @Output()
  selected = new EventEmitter<CellSelection>();


  constructor() {



  }

  ngOnInit() {
  }

  selectCell(colIx: number, rowIx: number) {

    if (colIx < 0 && !this.selectableRowHeader) {
      return; // clicked on row number
    }
    if (rowIx < 0 && !this.selectableColHeader) {
      return;
    }

    const selectedRow = rowIx >= 0 ? this.data[rowIx] : [];
    const value = selectedRow[colIx];

    const columnNumber = this._dataSlice.columnsNumbers[colIx];
    const columnName = this._dataSlice.columnsNames[colIx];
    const rowNumber = this._dataSlice.rowsNumbers[rowIx];
    const rowName = this._dataSlice.rowsNames[rowIx];
    const event = new CellSelection(
      colIx, columnNumber, columnName,
      rowIx, rowNumber, rowName,
      value
    );

    this.selected.next(event);
  }
}
