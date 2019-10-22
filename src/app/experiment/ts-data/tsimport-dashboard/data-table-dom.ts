import {PageEvent} from '@angular/material';


export class DataTableSlice {

  columnsNames: string[] = [];
  columnsNumbers: number[] = [];
  rowsNames: string[] = [];
  rowsNumbers: number[] = [];
  data: (string | number)[][] = [];

  totalRows = 0;
  totalColumns = 0;

  rowPage: PageEvent;
  colPage: PageEvent;

}

export class Slice {

  constructor(public rowPage = new PageEvent(),
              public colPage = new PageEvent()) {

  }

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
   public colIx = -1,
   public colNumber = -1,
   public colName = '',
   public rowIx = -1,
   public rowNumber = -1,
   public rowName = '',
   public value: string|number,
  ) {}

  toJSON() {
    return { col: this.colNumber, row: this.rowNumber };
  }

  isBeforeOrSame(other: CellSelection) {
    return (this.colIx <= other.colIx && this.rowIx <= other.rowIx);
  }

  hasSameIx(other: CellSelection) {
    return (this.colIx === other.colIx && this.rowIx === other.rowIx);
  }

}
