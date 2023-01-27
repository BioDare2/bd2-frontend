import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {DataTableSlice} from '../../data-table-dom';
import {TableStyler} from '../../data-sheet-mdtable/table-styling';
import {CellSelection} from '../../../import-dom';

@Component({
  selector: 'bd2-selectable-region-mdtable',
  templateUrl: './selectable-region-mdtable.component.html',
  styles: [`
    .data-sheet-container {
      max-height: 800px;
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

    label.user {
      color: black;
    }
  `]
})
export class SelectableRegionMDTableComponent implements OnInit {

  @Input()
  set columnsLabels(labels: string[]) {
    this._columnsLabels = labels;
    /*if (this.matTable) {
      this.matTable.renderRows();
    }*/
  }

  get columnsLabels() {
    return this._columnsLabels;
  }

  @Input()
  set rowsLabels(labels: string[]) {
    this._rowsLabels = labels;
  }

  get rowsLabels() {
    return this._rowsLabels;
  }


  @Input()
  set dataSlice(dataSlice: DataTableSlice) {
    if (!dataSlice) {
      return;
    }
    this._dataSlice = dataSlice;
    this.columnsNames = dataSlice.columnsNames;
    this.rowsNames = dataSlice.rowsNames;
    this.data = dataSlice.data;


    this.hasMoreColumns = dataSlice.columnsNumbers[dataSlice.columnsNumbers.length - 1] < (dataSlice.totalColumns - 1);
    this.hasMoreRows = dataSlice.rowsNumbers[dataSlice.rowsNumbers.length - 1] < (dataSlice.totalRows - 1);

    this.decideColumns();

    if (this.matTable) {
      this.matTable.renderRows();
    }
  }

  get dataSlice() {
    return this._dataSlice;
  }

  @Input()
  set selectRows(val: boolean) {
    this.selectableRowHeader = val;
    this.showRowsLabels = val;
    this.decideColumns();
  }

  @Input()
  set selectCols(val: boolean) {
    this.selectableColHeader = val;
    this.showColumnsLabels = val;
    this.decideColumns();
  }

  constructor() {



  }

  displayedColumns: string[];
  displayedLabelsColumns: string[];


  columnsNames: string[] = [];
  rowsNames: string[] = [];
  data: (string | number)[][] = [];

  hasMoreColumns = false;
  hasMoreRows = false;

  @ViewChild('table')
  matTable: MatTable<(string | number)[]>;

  // tslint:disable-next-line:variable-name
  private _dataSlice: DataTableSlice;
  // tslint:disable-next-line:variable-name
  private _columnsLabels: string[] = [];
  // tslint:disable-next-line:variable-name
  private _rowsLabels: string[] = [];

  @Input()
  styler = new TableStyler();

  selectableColHeader = false;

  selectableRowHeader = false;

  showColumnsLabels = false;

  showRowsLabels = false;


  @Output()
  selected = new EventEmitter<[CellSelection, CellSelection]>();

  @Output()
  moreRows = new EventEmitter<boolean>();

  @Output()
  moreColumns = new EventEmitter<boolean>();


  selectionStart: CellSelection;

  decideColumns() {
    this.displayedColumns = (this.showRowsLabels ? ['rowNr', 'rowLabel'] : ['rowNr']).concat(this.columnsNames);
    this.displayedLabelsColumns = (this.showRowsLabels ? ['rowNr2', 'rowLabel2'] : ['rowNr2'])
                                .concat( this.columnsNames.map( (v, ix) => 'label' + ix));
    if (this.hasMoreColumns) {
      this.displayedColumns.push('more');
      this.displayedLabelsColumns.push('more');
    }
  }

  ngOnInit() {
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


  startSelectCell(colIx: number, rowIx: number) {

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
    const start = new CellSelection(
      colIx, columnNumber, columnName,
      rowIx, rowNumber, rowName,
      value
    );

    this.selectionStart = start;
  }

  endSelectCell(colIx: number, rowIx: number) {

    if (!this.selectionStart) { return; }

    if (rowIx < 0 && this.selectionStart.rowIx >= 0) {
      this.selectionStart = undefined;
      return;
    }

    if (colIx < 0 && this.selectionStart.colIx >= 0) {
      this.selectionStart = undefined;
      return;
    }

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
    const end = new CellSelection(
      colIx, columnNumber, columnName,
      rowIx, rowNumber, rowName,
      value
    );

    this.selected.next([this.selectionStart, end]);
  }

  nextColumn() {
    this.moreColumns.next(true);
  }

  nextRow() {
    this.moreRows.next(true);
  }



}
