

export class DataTableSlice {

  columnsNames: string[] = [];
  columnsNumbers: number[] = [];
  rowsNames: string[] = [];
  rowsNumbers: number[] = [];
  data: (string | number)[][] = [];

  totalRows = 0;
  totalColumns = 0;


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
