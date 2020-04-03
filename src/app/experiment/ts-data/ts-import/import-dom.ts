import {CellRangeDescription, TimeColumnType} from './sheet-dom';


export class ImportFormat {

  static NONE = new ImportFormat(0, 'NONE', 'none');
  static EXCEL_TABLE = new ImportFormat(1, 'EXCEL_TABLE', 'Excel Table');
  static TOPCOUNT = new ImportFormat(2, 'TOPCOUNT', 'TopCount');
  static TAB_SEP = new ImportFormat(3, 'TAB_SEP', 'Tab-separated');
  static COMA_SEP = new ImportFormat(4, 'COMA_SEP', 'Coma-separated');

  protected static valuesMap: Map<string, ImportFormat>;

  constructor(public id: number, public name: string, public label: string) {
  }

  static getValuesMap(): Map<string, ImportFormat> {
    if (!ImportFormat.valuesMap) {
      ImportFormat.valuesMap = ImportFormat.initValuesMap();
    }
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
    map.set(ImportFormat.TAB_SEP.name, ImportFormat.TAB_SEP);
    map.set(ImportFormat.COMA_SEP.name, ImportFormat.COMA_SEP);
    return map;
  }

  toJSON(): string {
    return this.name;
  }

}

export const ImportFormatOptions = [ImportFormat.EXCEL_TABLE, ImportFormat.TAB_SEP, ImportFormat.COMA_SEP,
  ImportFormat.TOPCOUNT];

export abstract class TSImportParameters {

}

export class ExcelTSImportParameters extends TSImportParameters {

  // tslint:disable-next-line:variable-name
  _class_name = '.ExcelTSImportParameters';
  timeColumn: CellRangeDescription;
  dataBlocks: CellRangeDescription[];

}

export class FileImportRequest {


  public fileId: string;
  public importFormat: ImportFormat;
  public importParameters: TSImportParameters;
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


export class ImportDetails {
  fileName: string;
  fileId: string;
  importFormat: ImportFormat;
  inRows = false;

  firstTimeCell: CellSelection;
  timeType: TimeColumnType;
  timeOffset = 0;
  imgInterval: number;

  dataStart: CellSelection;

  importLabels = true;
  labelsSelection: CellSelection;
  userLabels: string[] = [];

  containsBackgrounds = false;
  backgroundsLabels = [];

  get inLabel(): string {
    return this.inRows ? 'row' : 'column';
  }

  get inLabelNeg(): string {
    return !this.inRows ? 'row' : 'column';
  }

  isTimeDefined() {
    if (!this.firstTimeCell) {
      return false;
    }
    if (!this.timeType) {
      return false;
    }
    if (this.timeType == TimeColumnType.IMG_NUMBER) {
      if (!this.imgInterval || (+this.imgInterval) <= 0) {
        return false;
      }
    }
    if (isNaN(Number(this.firstTimeCell.value))) {
      return false;
    }
    return true;
  }

  areLabelsCorrectlySelected() {
    if (!this.labelsSelection) {
      return false;
    }
    return this.areLabelsAfterTime();
  }

  areLabelsAfterTime() {
    if (this.firstTimeCell && this.labelsSelection) {
      if (this.inRows) {
        return (this.labelsSelection.colNumber < this.firstTimeCell.colNumber) && (this.labelsSelection.colNumber >= 0);
      } else {
        return (this.labelsSelection.rowNumber < this.firstTimeCell.rowNumber) && (this.labelsSelection.rowNumber >= 0);
      }
    }
    return false;
  }

  areLabelsCorrectlyAssigned() {
    if (!this.userLabels) {
      return false;
    }
    return this.userLabels.filter( v => !!v).length > 0;

  }

  isDataAfterTime() {
    if (this.firstTimeCell && this.dataStart) {
      if (this.inRows) {
        return this.dataStart.rowNumber > this.firstTimeCell.rowNumber;
      } else {
        return this.dataStart.colNumber > this.firstTimeCell.colNumber;
      }
    }
    return false;
  }

  isDataStartCorrectlySelected() {
    if (!this.dataStart) {
      return false;
    }
    return this.isDataAfterTime();
  }

  isComplete() {
    if (!this.isTimeDefined()) { return false; }
    if (this.importLabels) {
      if (!this.areLabelsCorrectlySelected()) { return false; }
      if (!this.isDataStartCorrectlySelected()) { return false; }
    } else {
      if (!this.areLabelsCorrectlyAssigned()) { return false; }
    }
    return true;
  }

  summarizeLabels(size = 10) {

    if (!this.userLabels) { return 'No labels'; }

    const set = new Set<string>();
    for (const val of this.userLabels) {
      if (val) {
        set.add(val);
        if (set.size >= size) {
          set.add('...');
          break;
        }
      }
    }

    return [...set].join(', ');
  }
}

export class DataTableImportParameters extends ImportDetails {
  // tslint:disable-next-line:variable-name
  _class_name = '.DataTableImportParameters';

}

