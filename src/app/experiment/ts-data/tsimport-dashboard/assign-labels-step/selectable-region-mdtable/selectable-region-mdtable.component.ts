import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material';
import {CellSelection, DataTableSlice} from '../../data-table-dom';
import {TableStyler} from '../../data-sheet-mdtable/table-styling';

@Component({
  selector: 'bd2-selectable-region-mdtable',
  templateUrl: './selectable-region-mdtable.component.html',
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
export class SelectableRegionMDTableComponent implements OnInit {

  displayedColumns: string[];  // = ['rowNr', 'A', 'B', 'C', 'D', 'E', 'F', 'G ', 'H' ];
  // dataColumns = ['A', 'B', 'C', 'D', 'E', 'F', 'G ', 'H' ];

  // selectedRow: any[];
  // selectedRowIx: number;
  // selectedRowName: string;
  // selectedColIx: number;
  // selectedColName: string;

  displayedLabelsColumns: string[];
  columnsLabels: string[];
  rowsLabels: string[];

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
    this.displayedColumns = (this.showRowsLabels ? ['rowNr', 'rowLabel'] : ['rowNr']).concat(this.columnsNames);
    this.data = dataSlice.data;

    this.columnsLabels = this.columnsNames.map( v => 'L' + v);
    this.displayedLabelsColumns = ['rowNr2'].concat( this.columnsNames.map( (v, ix) => 'label' + ix));

    this.rowsLabels = this.rowsNames.map( v => 'R' + v);

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
  showColumnsLabels = false;

  @Input()
  showRowsLabels = true;


  @Output()
  selected = new EventEmitter<[CellSelection, CellSelection]>();


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

  event(event: any, name: string) {
    console.log(name, event);
  }

}
