import {colNrToExcelLetter} from '../ts-import/sheet-dom';

export class DataGridModel {

  width: number;

  constructor(public rows: any[][],
              public th?: any[],
              public rowsLabels?: any[],
              public specialRows?: any[][],
              public specialRowsLabels?: any[]) {

    this.width = DataGridModel.maxLength(rows);

    if (th) {
      this.th = th;
    } else {
      this.th = rows.length < 1 ? [] : DataGridModel.labelCols(this.width);
    }

    this.rowsLabels = rowsLabels || DataGridModel.labelRows(rows.length);
    this.specialRows = specialRows || [];
    this.specialRowsLabels = specialRowsLabels || DataGridModel.blankRows(this.specialRows.length);
  }

  static labelRows(length: number): string[] {
    const res: string[] = [];
    for (let i = 1; i <= length; i++) {
      res.push('' + i);
    }
    return res;
  }

  static blankRows(length: number): string[] {
    const res: string[] = [];
    for (let i = 0; i < length; i++) {
      res.push('');
    }
    return res;
  }

  static maxLength(rows: any[][]): number {
    if (!rows || rows.length < 1) {
      return 0;
    }
    return Math.max.apply(Math, rows.map((r: any[]) => r.length));
  }

  static labelCols(length: number): string[] {

    const res: string[] = [];
    // for (let i =1;i<=length;i++) res.push((i)+'. '+colNrToExcelLetter(i));
    for (let i = 1; i <= length; i++) {
      res.push(colNrToExcelLetter(i));
    }
    return res;
  }

}
