import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {DataTableSlice} from '../data-table-dom';
import {MatTable} from '@angular/material/table';
import {TableStyler} from './table-styling';
import {CellSelection} from '../../import-dom';

@Component({
  selector: 'bd2-data-sheet-mdtable',
  templateUrl: './data-sheet-mdtable.component.html',
  styles: [`
    .data-sheet-container {
      max-height: 300px;
      overflow: auto;
    }

    .mat-mdc-table-sticky:first-child {
      border-right: 1px solid #e0e0e0;
      padding-right: 1em;
    }


    .mat-mdc-header-cell, .mat-mdc-cell {
      padding-left: 0.5em;
      padding-right: 0.5em;
    }

    label {
      color: rgba(0,0,0,0.54);
    }
  `]
})
export class DataSheetMDTableComponent implements OnInit {


  // tslint:disable-next-line:variable-name
  private _dataSlice: DataTableSlice;

  displayedColumns: string[];  // = ['rowNr', 'A', 'B', 'C', 'D', 'E', 'F', 'G ', 'H' ];

  columnsNames: string[] = [];
  rowsNames: string[] = [];
  data: (string | number)[][] = [];




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

  get dataSlice() {
    return this._dataSlice;
  }


  @Input()
  styler = new TableStyler();

  @Input()
  selectableColHeader = false;

  @Input()
  selectableRowHeader = false;


  @Output()
  selected = new EventEmitter<CellSelection>();

  @ViewChild('table')
  matTable: MatTable<(string | number)[]>;


  constructor() {
  }



  colNumber(colIx: number) {
    return colIx < 0 ? -1 : this._dataSlice.columnsNumbers[colIx];
  }

  rowNumber(rowIx: number) {
    return rowIx < 0 ? -1 : this._dataSlice.rowsNumbers[rowIx];
  }

  colBackground(colIx) {
    return this.styler.colBackground(this.colNumber(colIx));
  }

  rowBackground(rowIx) {
    return this.styler.rowBackground(this.rowNumber(rowIx));
  }

  cellBackground(colIx: number, rowIx: number) {
    return this.styler.cellBackground(this.colNumber(colIx), this.rowNumber(rowIx));
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
