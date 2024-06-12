import {PageEvent} from '@angular/material/paginator';


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
    slice.rowPage.pageSize = 50;
    slice.colPage.pageIndex = 0;
    slice.colPage.pageSize = 50;
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




