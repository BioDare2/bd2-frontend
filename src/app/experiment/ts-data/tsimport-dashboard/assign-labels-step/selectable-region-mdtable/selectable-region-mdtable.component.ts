import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material';
import {CellSelection, DataTableSlice} from '../../data-table-dom';
import {TableStyler} from '../../data-sheet-mdtable/table-styling';

@Component({
  selector: 'bd2-selectable-region-mdtable',
  templateUrl: './selectable-region-mdtable.component.html',
  styles: [`
    .data-sheet-container {
      max-height: 400px;
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

    label.user {
      color: black;
    }
  `]
})
export class SelectableRegionMDTableComponent implements OnInit {

  displayedColumns: string[];  // = ['rowNr', 'A', 'B', 'C', 'D', 'E', 'F', 'G ', 'H' ];
  // dataColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'G ', 'H' ];

  // selectedRow: any[];
  // selectedRowIx: number;
  // selectedRowName: string;
  // selectedColIx: number;
  // selectedColName: string;

  displayedLabelsColumns: string[];


  columnsNames: string[] = [];
  rowsNames: string[] = [];
  data: (string | number)[][] = [];

  hasMoreColumns = false;
  hasMoreRows = false;

  @ViewChild('table', { static: false })
  matTable: MatTable<(string | number)[]>;

  // tslint:disable-next-line:variable-name
  private _dataSlice: DataTableSlice;
  // tslint:disable-next-line:variable-name
  private _columnsLabels: string[] = [];
  // tslint:disable-next-line:variable-name
  private _rowsLabels: string[] = [];

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

    this.displayedColumns = (this.showRowsLabels ? ['rowNr', 'rowLabel'] : ['rowNr']).concat(this.columnsNames);

    this.displayedLabelsColumns = (this.showRowsLabels ? ['rowNr2', 'rowLabel2'] : ['rowNr2']).concat( this.columnsNames.map( (v, ix) => 'label' + ix));
    if (this.hasMoreColumns) {
      this.displayedColumns.push('more');
      this.displayedLabelsColumns.push('more');
    }

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

  @Input()
  showColumnsLabels = true;

  @Input()
  showRowsLabels = true;


  @Output()
  selected = new EventEmitter<[CellSelection, CellSelection]>();

  @Output()
  moreRows = new EventEmitter<boolean>();

  @Output()
  moreColumns = new EventEmitter<boolean>();


  selectionStart: CellSelection;

  constructor() {



  }

  ngOnInit() {
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

  event(event: any, name: string) {
    console.log(name, event);
  }

}
