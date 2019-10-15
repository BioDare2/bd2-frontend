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
}




export class CellSelection {

  constructor(
   public colIx = 0,
   public colNumber = 0,
   public colName = '',
   public rowIx = 0,
   public rowNumber = 0,
   public rowName = '',
   public value: string|number,
  ) {}
}
