import {CellSelection} from '../data-table-dom';

export class TableStyler {


  rowsBackgrounds: string[] = [];
  colsBackgrounds: string[] = [];
  cellBackgrounds: string[][] = [];

  public reset() {
    this.rowsBackgrounds = [];
    this.colsBackgrounds = [];
    this.cellBackgrounds = [];
  }

  public setRowBackground(ix: number, color: string) {

    this.rowsBackgrounds[ix] = color;
  }

  public rowBackground(rowIx: number) {

    return this.getOrEmptyString(this.rowsBackgrounds, rowIx);
  }

  public colBackground(colIx: number) {
    return this.getOrEmptyString(this.colsBackgrounds, colIx);
  }

  public setColBackground(ix: number, color: string) {

    this.colsBackgrounds[ix] = color;
  }

  public cellBackground(colIx: number, rowIx: number) {

    const cellColor = this.getOrEmptyString(this.getOrDefault(this.cellBackgrounds, rowIx, []), colIx);
    if (cellColor) {
      return cellColor;
    }
    return this.colBackground(colIx);
  }

  public setCellBackground(colIx: number, rowIx: number, color: string) {
    let row = this.cellBackgrounds[rowIx];
    if (row === undefined) {
      row = [];
      this.cellBackgrounds[rowIx] = row;
    }
    row[colIx] = color;
  }

  private getOrEmptyString(arr: string[], ix: number) {
    return this.getOrDefault(arr, ix, '');
  }

  private  getOrDefault<T>(arr: T[], ix: number, def: T) {
    if (ix >= arr.length || arr[ix] === undefined) {
      return def;
    }
    return arr[ix];
  }

}

export class SelectionColorCycler {

  public static readonly MAIN_ROW_BACKGROUND = '#dda0dd';
  public static readonly MAIN_COL_BACKGROUND = '#87cefa';
  public static readonly MAIN_CELL_BACKGROUND = '#ba55d3'; // 'mediumorchid';

  public static readonly TIME_BACKGROUND = '#dda0dd';
  public static readonly LABELS_BACKGROUND = '#87cefa';
  public static readonly FIRST_TIME_BACKGROUND = '#ba55d3'; // 'mediumorchid';

  public static readonly FIST_DATA_BACKGROUND = 'lightgreen';

  public rowBackground(groupNr: number) {
    return SelectionColorCycler.MAIN_ROW_BACKGROUND;
  }

  public cellBackground(groupNr: number) {
    return SelectionColorCycler.MAIN_CELL_BACKGROUND ;
  }

  public columnBackground(groupNr: number) {
    return SelectionColorCycler.MAIN_COL_BACKGROUND ;
  }
}

export class TableSelector {

  constructor(public tableStyler?: TableStyler, public colorCycler?: SelectionColorCycler) {
    this.tableStyler = tableStyler || new TableStyler();
    this.colorCycler = colorCycler || new SelectionColorCycler();
  }

  selectedRows: CellSelection[] = [];
  selectedCols: CellSelection[] = [];

  public toggleRow(rowCell: CellSelection, withCell = false, rowColor?: string, cellColor?: string) {

    const toggled = this.selectedRows.splice(0, this.selectedRows.length);
    this.selectedRows.push(rowCell);

    this.uncolorRows(toggled);
    this.colorRows(this.selectedRows, rowColor);

    if (withCell) {
      this.uncolorCells(toggled);
      this.colorCells(this.selectedRows, cellColor);
    }

  }

  public toggleRowSelection(selectionIx: number, rowCell: CellSelection, withCell = false, rowColor?: string, cellColor?: string) {

    const toggled = this.selectedRows[selectionIx] ? [this.selectedRows[selectionIx]] : [];
    this.selectedRows[selectionIx] = rowCell;

    this.uncolorRows(toggled);
    this.colorRows([this.selectedRows[selectionIx]], rowColor);

    if (withCell) {
      this.uncolorCells(toggled);
      this.colorCells([this.selectedRows[selectionIx]], cellColor);
    }

  }

  public selectRow(rowNumber: number, color?: string) {

    const cell = new CellSelection(-1,-1, undefined, rowNumber, rowNumber, undefined, undefined);

    const existingIx = this.selectedRows.findIndex( c => c.rowNumber === rowNumber);
    if (existingIx < 0) {
      this.selectedRows.push(cell);
    } else {
      this.selectedRows[existingIx] = cell;
    }

    this.colorRows([cell], color);

  }

  public toggleCol(colCell: CellSelection, withCell = false, colColor?: string, cellColor?: string) {

    const toggled = this.selectedCols.splice(0, this.selectedCols.length);
    this.selectedCols.push(colCell);

    this.uncolorCols(toggled);
    this.colorCols(this.selectedCols, colColor);

    if (withCell) {
      this.uncolorCells(toggled);
      this.colorCells(this.selectedCols, cellColor);
    }

  }

  public toggleColSelection(selectionIx: number, colCell: CellSelection, withCell = false, colColor?: string, cellColor?: string) {

    const toggled = this.selectedCols[selectionIx] ? [this.selectedCols[selectionIx]] : [];
    this.selectedCols[selectionIx] = colCell;

    this.uncolorCols(toggled);
    this.colorCols([this.selectedCols[selectionIx]], colColor);

    if (withCell) {
      this.uncolorCells(toggled);
      this.colorCells([this.selectedCols[selectionIx]], cellColor);
    }

  }

  public selectCol(colNumber: number, color?: string) {

    const cell = new CellSelection(colNumber, colNumber, undefined, -1, -1, undefined, undefined);

    const existingIx = this.selectedRows.findIndex( c => c.colNumber === colNumber);
    if (existingIx < 0) {
      this.selectedCols.push(cell);
    } else {
      this.selectedCols[existingIx] = cell;
    }

    this.colorCols([cell], color);

  }


  public reset() {
    this.selectedRows = [];
    this.selectedCols = [];
    this.tableStyler.reset();
  }


  colorRows(cells: CellSelection[], color?: string) {
    cells.forEach( (cell, ix) => {
      this.tableStyler.setRowBackground(cell.rowNumber, color ? color : this.colorCycler.rowBackground(ix));
    });
  }

  colorCols(cells: CellSelection[], color?: string) {
    cells.forEach( (cell, ix) => {
      this.tableStyler.setColBackground(cell.colNumber, color ? color : this.colorCycler.columnBackground(ix));
    });
  }

  colorCells(cells: CellSelection[], color?: string) {
    cells.forEach( (cell, ix) => {
      this.tableStyler.setCellBackground(cell.colNumber, cell.rowNumber, color ? color : this.colorCycler.cellBackground(ix));
    });
  }

  uncolorRows(cells: CellSelection[]) {
    cells.forEach( cell => {
      this.tableStyler.setRowBackground(cell.rowNumber, undefined);
    });
  }

  uncolorCols(cells: CellSelection[]) {
    cells.forEach( cell => {
      this.tableStyler.setColBackground(cell.colNumber, undefined);
    });
  }

  uncolorCells(cells: CellSelection[]) {
    cells.forEach( cell => {
      this.tableStyler.setCellBackground(cell.colNumber, cell.rowNumber, undefined);
    });
  }


}

export class LabelsToColors {

  static colors = [
    'lightgreen',
    'lightblue',
    'lightcoral',
    'lightcyan',
    'lightgreen',
    'lightpink',
    'lightsalmon',
    'lightseagreen',
    'lightskyblue',
    'palegoldenrod',
    'paleturquoise',
    'palevioletred'
  ];

  private index = 0;
  private labelsIndexes = new Map<string, number>();

  public toColor(label: string) {
    if (!label) {
      return undefined;
    }

    if (!this.labelsIndexes.has(label)) {
      this.labelsIndexes.set(label, this.index++);
    }

    const ix = this.labelsIndexes.get(label) % LabelsToColors.colors.length;
    return LabelsToColors.colors[ix];
  }

  public setColor(label: string) {

  }
}
