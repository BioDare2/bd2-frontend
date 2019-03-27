export class CellRole {

  static NONE = new CellRole(0, 'NONE', 'NONE'); // so the real values starts at 1
  static IGNORED = new CellRole(1, 'IGNORED', 'Ignored'); // 0
  static TIME = new CellRole(2, 'TIME', 'Time');   // 2
  static DATA = new CellRole(3, 'DATA', 'Data');   // 3
  static BACKGROUND = new CellRole(4, 'BACKGROUND', 'Background noise'); // 4
  static LABEL = new CellRole(5, 'LABEL', 'Label');   // 5

  protected static valuesMap: Map<string, CellRole>;

  protected constructor(private _id: number, private _name: string, private _label: string) {
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get label(): string {
    return this._label;
  }

  public static get(name: string) {
    return CellRole.getValuesMap().get(name);
  }

  protected static getValuesMap(): Map<string, CellRole> {

    if (!CellRole.valuesMap) {
      CellRole.valuesMap = CellRole.initValuesMap();
    }
    return CellRole.valuesMap;
  }

  protected static initValuesMap(): Map<string, CellRole> {
    const map = new Map<string, CellRole>();

    map.set(CellRole.NONE.name, CellRole.NONE);
    map.set(CellRole.IGNORED.name, CellRole.IGNORED);
    map.set(CellRole.TIME.name, CellRole.TIME);
    map.set(CellRole.DATA.name, CellRole.DATA);
    map.set(CellRole.BACKGROUND.name, CellRole.BACKGROUND);
    map.set(CellRole.LABEL.name, CellRole.LABEL);
    return map;
  }

  toJSON(): string {
    return this.name;
  }


}

export class TimeColumnType {
  static NONE = new TimeColumnType(0, 'NONE', 'NONE'); // so the real values starts at 1
  static TIME_IN_HOURS = new TimeColumnType(1, 'TIME_IN_HOURS', 'time in hours');
  static TIME_IN_MINUTES = new TimeColumnType(2, 'TIME_IN_MINUTES', 'time in minutes');
  static TIME_IN_SECONDS = new TimeColumnType(3, 'TIME_IN_SECONDS', 'time in seconds');
  static IMG_NUMBER = new TimeColumnType(4, 'IMG_NUMBER', 'image nr. (1-based)');

  protected static valuesMap: Map<string, TimeColumnType>;

  protected constructor(private _id: number, private _name: string, private _label: string) {
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get label(): string {
    return this._label;
  }

  public static get(name: string): TimeColumnType {
    return TimeColumnType.getValuesMap().get(name);
  }

  protected static getValuesMap(): Map<string, TimeColumnType> {
    if (!TimeColumnType.valuesMap) {
      TimeColumnType.valuesMap = TimeColumnType.initValuesMap();
    }
    return TimeColumnType.valuesMap;
  }

  protected static initValuesMap(): Map<string, TimeColumnType> {
    const map = new Map<string, TimeColumnType>();
    map.set(TimeColumnType.NONE.name, TimeColumnType.NONE);
    map.set(TimeColumnType.TIME_IN_HOURS.name, TimeColumnType.TIME_IN_HOURS);
    map.set(TimeColumnType.TIME_IN_MINUTES.name, TimeColumnType.TIME_IN_MINUTES);
    map.set(TimeColumnType.TIME_IN_SECONDS.name, TimeColumnType.TIME_IN_SECONDS);
    map.set(TimeColumnType.IMG_NUMBER.name, TimeColumnType.IMG_NUMBER);
    return map;
  }

  toJSON(): string {
    return this.name;
  }
}


export class TimeColumnProperties {
  // private _class_name = '.TimeColumnProperties';
  timeType: TimeColumnType;
  timeOffset: number;
  imgInterval: number;
  firstRow: number;
}

export class DataColumnProperties {
  // private _class_name : '.DataColumnProperties';
  constructor(public dataLabel: string) {
  }
}


const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

// 1-based function
export function colNrToExcelLetter(nr: number): string {
  nr = nr - 1;
  const S = LETTERS.length;
  if (nr < S) {
    return LETTERS[nr];
  }

  if (nr < (S * S + S)) {
    const f = Math.floor(nr / S) - 1;
    const r = nr % S;
    // console.log('RR '+nr+' '+f+' '+r);
    return LETTERS[f] + LETTERS[r];
  }

  if (nr < 16384) {
    const lf = Math.floor(nr / (S * S)) - 1;
    let r = nr % (S * S);
    const f = Math.floor(r / S) - 1;
    r = nr % S;
    return LETTERS[lf] + LETTERS[f] + LETTERS[r];
  }

  throw new RangeError('Unsupported column number: ' + (nr + 1));
}

// 1-based
export function excelLettersToColNr(str: string): number {

  str = str.toUpperCase();
  let nr = 0;
  nr = LETTERS.indexOf(str.charAt(0)) + 1;
  if (str.length > 1) {
    nr = nr * LETTERS.length + LETTERS.indexOf(str.charAt(1)) + 1;

    if (str.length > 2) {
      nr = nr * LETTERS.length + LETTERS.indexOf(str.charAt(2)) + 1;
    }


    if (str.length > 3) {
      throw new RangeError('Unsupported column code: ' + str);
    }
  }
  return nr;
  // console.log('NR: '+nrs);


}

// 1-based
export function colNrToTopCountWellName(nr: number): string {
  if (nr < 1 || nr > 96) {
    throw new RangeError('Unsupported topcount column number: ' + (nr));
  }

  nr = nr - 1;
  const lix = Math.floor(nr / 12);
  return LETTERS[lix] + ((nr % 12) + 1);
}

// 1-based
export function colNrToTopCountCoordinates(nr: number): CellCoordinates {
  if (nr < 1 || nr > 96) {
    throw new RangeError('Unsupported topcount column number: ' + (nr));
  }

  nr = nr - 1;
  const row = Math.floor(nr / 12) + 1;
  const col = ((nr % 12) + 1);
  return new CellCoordinates(col, row);
}

export class CellCoordinates {

  constructor(public col: number, public row: number) {
  }

  get numericalLabel(): string {
    return '' + this.col + '-' + this.row;
  }

  get excelLabel(): string {
    return colNrToExcelLetter(this.col) + this.row;
  }

  get columnLetter(): string {
    return colNrToExcelLetter(this.col);
  }

  get topCountWell(): string {
    return LETTERS[this.row - 1] + this.col;
  }

  clone(): CellCoordinates {
    return new CellCoordinates(this.col, this.row);
  }
}


export class CellRange {
  constructor(public first: CellCoordinates, public last: CellCoordinates) {

    const normalized = this.normalize(first, last);
    this.first = normalized[0];
    this.last = normalized[1];
  }

  get firstCol(): number {
    return this.first.col;
  }

  get lastCol(): number {
    return this.last.col;
  }

  get fullRangeLabel(): string {
    if (this.isSingleCell()) {
      return this.first.excelLabel;
    }

    return this.first.excelLabel + '-' + this.last.excelLabel;
  }

  get columnRangeLabel(): string {
    if (this.isSingleCell()) {
      return this.first.columnLetter;
    }

    return this.first.columnLetter + '-' + this.last.columnLetter;
  }

  get topCountRangeLabel(): string {
    if (this.isSingleCell()) {
      return this.first.topCountWell;
    }
    return this.first.topCountWell + '-' + this.last.topCountWell;
  }

  clone(): CellRange {
    return new CellRange(this.first.clone(), this.last.clone());
  }

  normalize(first: CellCoordinates, last: CellCoordinates): CellCoordinates[] {

    if (first.row <= last.row && first.col <= last.col) {
      return [first, last];
    }

    const fRow = Math.min(first.row, last.row);
    const fCol = Math.min(first.col, last.col);

    const lRow = Math.max(first.row, last.row);
    const lCol = Math.max(first.col, last.col);

    return [new CellCoordinates(fCol, fRow), new CellCoordinates(lCol, lRow)];

  }

  isSingleCell(): boolean {
    return (this.first.row === this.last.row && this.first.col === this.last.col);
  }

  size(): number {
    const inRow = this.last.col - this.first.col + 1;
    const rows = this.last.row - this.first.row + 1;
    return inRow * rows;
  }
}


export class CellRangeDescription {

  role: CellRole;
  details: any;

  constructor(public range: CellRange, public content?: string) {

    // this.label = label || range.toExcelLabel();
  }

  get fullRangeLabel(): string {
    return this.range.fullRangeLabel;
  }

  get columnRangeLabel(): string {
    return this.range.columnRangeLabel;

  }

  get topCountRangeLabel(): string {
    return this.range.topCountRangeLabel;
  }

  get firstCol(): number {
    return this.range.firstCol;
  }

  get lastCol(): number {
    return this.range.lastCol;
  }

  clone(): CellRangeDescription {
    const c = new CellRangeDescription(this.range.clone(), this.content);
    c.role = this.role;
    c.details = this.details;
    return c;
  }

}


export class ColumnBlockEntry {

  constructor(public start: number, public end: number, public details: CellRangeDescription, public value?: any) {
  }

  get label(): string {
    if (this.start === this.end) {
      return colNrToExcelLetter(this.start);
    }

    return colNrToExcelLetter(this.start) + '-' + colNrToExcelLetter(this.end);
  }

  get topcountLabel(): string {
    if (this.start === this.end) {
      return colNrToTopCountWellName(this.start);
    }

    return colNrToTopCountWellName(this.start) + '-' + colNrToTopCountWellName(this.end);

  }

  trimEnd(position: number): ColumnBlockEntry {
    if (position <= this.start) {
      return undefined;
    }

    const newD = this.details.clone();
    newD.range.last.col = position - 1;
    return new ColumnBlockEntry(this.start, position - 1, newD, this.value);
  }

  trimBegining(position: number): ColumnBlockEntry {
    if (position >= this.end) {
      return undefined;
    }

    const newD = this.details.clone();
    newD.range.first.col = position + 1;
    return new ColumnBlockEntry(position + 1, this.end, newD, this.value);
  }

  isSimilar(other: ColumnBlockEntry) {
    if (this.details.role !== other.details.role) {
      return false;
    }
    if (this.value !== other.value) {
      return false;
    }
    // if (this.details.value != other.details.value) return false;
    return true;
  }

}

export class ColumnBlocks {

  columns: ColumnBlockEntry[];

  constructor() {
    this.columns = [];

  }

  get blocks(): ColumnBlockEntry[] {

    const blocks: ColumnBlockEntry[] = [];

    let i = 1;
    while (i < this.columns.length) {
      const block = this.columns[i];
      if (!block) {
        i++;
      } else {
        blocks.push(block);
        i = block.end + 1;
      }
    }

    return blocks;
  }

  details(col: number): CellRangeDescription {
    const block = this.columns[col];
    if (block) {
      return block.details;
    }
    return undefined;
  }

  delete(range: CellRange): boolean {
    if (range.size() === 0) {
      return false;
    }

    let replaced = false;
    // let newBlock = new ColumnBlockEntry(range.range.first.col,range.range.last.col,range,value);


    if (this.columns[range.firstCol]) {
      this.trimPreviousAt(range.firstCol);
      replaced = true;
    }

    if (this.columns[range.lastCol]) {
      this.trimBehindAt(range.lastCol);
      replaced = true;
    }

    this.clear(range);

    return replaced;

  }

  insert(range: CellRangeDescription, value?: any): boolean {

    if (range.range.size() === 0) {
      return false;
    }

    let replaced = false;
    const newBlock = new ColumnBlockEntry(range.range.first.col, range.range.last.col, range, value);


    if (this.columns[newBlock.start]) {
      this.trimPreviousAt(newBlock.start);
      replaced = true;
    }

    if (this.columns[newBlock.end]) {
      this.trimBehindAt(newBlock.end);
      replaced = true;
    }

    this.put(newBlock);

    return replaced;
  }

  merge() {

    let i = 1;
    while (i < this.columns.length) {
      const block = this.columns[i];
      if (!block) {
        i++;
      } else {
        if (!this.columns[block.end + 1]) {
          i = block.end + 1;
        } else {
          const next = this.columns[block.end + 1];
          if (block.isSimilar(next)) {
            block.end = next.end;
            block.details.range.last = next.details.range.last;
            this.put(block);
          } else {
            i = next.start;
          }
        }
      }
    }
  }

  trimPreviousAt(position: number) {

    const elm = this.columns[position];
    if (elm.start === position) {
      return;
    }

    const newPrev = elm.trimEnd(position);
    this.put(newPrev);
  }

  trimBehindAt(position: number) {

    const elm = this.columns[position];
    if (elm.end === position) {
      return;
    }

    const newPost = elm.trimBegining(position);
    this.put(newPost);
  }

  private put(block: ColumnBlockEntry) {
    for (let i = block.start; i <= block.end; i++) {
      this.columns[i] = block;
    }
  }

  private clear(range: CellRange) {
    for (let i = range.firstCol; i <= range.lastCol; i++) {
      this.columns[i] = undefined;
    }
  }


}


