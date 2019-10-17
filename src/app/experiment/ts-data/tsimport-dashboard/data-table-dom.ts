import {PageEvent} from '@angular/material';


export class DataTableSlice {

  columnsNames: string[] = [];
  columnsNumbers: number[] = [];
  rowsNames: string[] = [];
  rowsNumbers: number[] = [];
  data: (string | number)[][] = [];

  totalRows = 0;
  totalColumns = 0;

}

export class Slice {
  rowPage = new PageEvent();
  colPage = new PageEvent();

  static firstPage() {
    const slice = new Slice();
    slice.rowPage.pageIndex = 0;
    slice.rowPage.pageSize = 25;
    slice.colPage.pageIndex = 0;
    slice.colPage.pageSize = 25;
    return slice;
  }

  static pageEquals(p1: PageEvent, p2: PageEvent) {
    return (p1.pageIndex === p2.pageIndex) && (p1.pageSize === p2.pageSize);
  }

  equals(s2: Slice) {
    if (!s2) {
      return false;
    }

    return Slice.pageEquals(this.rowPage, s2.rowPage) && Slice.pageEquals(this.colPage, s2.colPage);
  }


}




export class CellSelection {

  fake = false;
  constructor(
   public colIx = 0,
   public colNumber = 0,
   public colName = '',
   public rowIx = 0,
   public rowNumber = 0,
   public rowName = '',
   public value: string|number,
  ) {}

  toJSON() {
    return { col: this.colNumber, row: this.rowNumber };
  }
}
