import {CellRangeDescription} from './sheet-dom';
export class ImportFormat {

  static NONE = new ImportFormat(0, 'NONE', 'none');
  static EXCEL_TABLE = new ImportFormat(1, 'EXCEL_TABLE', 'Excel Table');
  static TOPCOUNT = new ImportFormat(2, 'TOPCOUNT', 'TopCount');

  protected static valuesMap: Map<string, ImportFormat>;

  static getValuesMap(): Map<string, ImportFormat> {
    if (!ImportFormat.valuesMap) { ImportFormat.valuesMap = ImportFormat.initValuesMap(); }
    return ImportFormat.valuesMap;
  }

  static get(name: string): ImportFormat {
    return ImportFormat.getValuesMap().get(name);
  }

  protected static initValuesMap(): Map<string, ImportFormat> {
    const map = new Map<string, ImportFormat>();
    map.set(ImportFormat.NONE.name, ImportFormat.NONE);
    map.set(ImportFormat.EXCEL_TABLE.name, ImportFormat.EXCEL_TABLE);
    map.set(ImportFormat.TOPCOUNT.name, ImportFormat.TOPCOUNT);
    return map;
  }


  constructor(public id: number, public name: string, public label: string) {
  }

  toJSON(): string {
    return this.name;
  }

}

export const ImportFormatOptions = [ImportFormat.EXCEL_TABLE, ImportFormat.TOPCOUNT];

export abstract class TSImportParameters {

}

export class ExcelTSImportParameters extends TSImportParameters {

  _class_name = '.ExcelTSImportParameters';
  timeColumn: CellRangeDescription;
  dataBlocks: CellRangeDescription[];

}

export class FileImportRequest {


  public fileId: string;
  public importFormat: ImportFormat;
  public importParameters: TSImportParameters;
}
