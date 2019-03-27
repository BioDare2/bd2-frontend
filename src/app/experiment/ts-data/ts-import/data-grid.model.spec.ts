import {DataGridModel} from './data-grid.model';

describe('DataGridModel', () => {

  let data: DataGridModel;
  let th: string[];
  let rows: string[][];
  let rowsLabels: string[];
  let specialRows: string[][];
  let specialRowsLabels: string[];

  beforeEach(() => {
    th = ['1', '2', '3', '4'];
    rows = [
      ['A1', 'A2', 'A3', 'A4'],
      ['B1', 'B2', 'B3', 'B4']
    ];
    rowsLabels = ['A', 'B'];
    specialRows = [
      ['D1', 'D2', 'D3', 'D4']
    ];
    specialRowsLabels = ['Labels'];
    data = new DataGridModel(rows, th, rowsLabels, specialRows, specialRowsLabels);
  });

  it('maxLength gives length of the longest row', () => {

    rows = [
      ['A1', 'A2'],
      ['B1', 'B2', 'B3', 'B4'],
      ['A1', 'A2', 'A3']
    ];

    expect(DataGridModel.maxLength(rows)).toBe(4);

  });

  it('maxLength gives 0 for empty tables', () => {

    rows = [
      [],
      []
    ];

    expect(DataGridModel.maxLength(rows)).toBe(0);

    rows = [];
    expect(DataGridModel.maxLength(rows)).toBe(0);
  });


  it('constructor initializes data width', () => {
    expect(data).toBeDefined();
    expect(data.width).toBe(4);
  });

  it('constructor works', () => {
    expect(data).toBeDefined();
    expect(data.th).toBe(th);
    expect(data.rows).toBe(rows);
    expect(data.rowsLabels).toBe(rowsLabels);
    expect(data.specialRows).toBe(specialRows);
    expect(data.specialRowsLabels).toBe(specialRowsLabels);
  });

  it('constructor provides defaults1', () => {

    data = new DataGridModel(rows, th, undefined, specialRows, undefined);
    expect(data).toBeDefined();
    expect(data.th).toBe(th);
    expect(data.rows).toBe(rows);
    expect(data.rowsLabels).toEqual(['1', '2']);
    expect(data.specialRows).toBe(specialRows);
    expect(data.specialRowsLabels).toEqual(['']);
  });

  it('constructor provides defaults2', () => {

    data = new DataGridModel(rows, th);
    expect(data).toBeDefined();
    expect(data.th).toBe(th);
    expect(data.rows).toBe(rows);
    expect(data.rowsLabels).toEqual(['1', '2']);
    expect(data.specialRows).toEqual([]);
    expect(data.specialRowsLabels).toEqual([]);
  });

  it('constructor provides defaults3', () => {

    data = new DataGridModel(rows);
    expect(data).toBeDefined();
    // expect(data.th).toEqual(['1. A','2. B','3. C','4. D']);
    expect(data.th).toEqual(['A', 'B', 'C', 'D']);
    expect(data.rows).toBe(rows);
    expect(data.rowsLabels).toEqual(['1', '2']);
    expect(data.specialRows).toEqual([]);
    expect(data.specialRowsLabels).toEqual([]);
  });

  it('blankRows gives correct number of empty strings', () => {

    const res = DataGridModel.blankRows(2);
    expect(res).toEqual(['', '']);
  });

  it('lableRows gives rows nr from 1', () => {

    const res = DataGridModel.labelRows(2);
    expect(res).toEqual(['1', '2']);
  });

  xit('labelCols gives nr and excell letters', () => {

    const res = DataGridModel.labelCols(2);
    expect(res).toEqual(['1. A', '2. B']);
  });

  xit('labelCols handles high cols numbers', () => {

    const res = DataGridModel.labelCols(80);
    expect(res[0]).toBe('1. A');
    expect(res[16]).toBe('17. Q');
    expect(res[25]).toBe('26. Z');
    expect(res[26]).toBe('27. AA');
    expect(res[52]).toBe('53. BA');
    expect(res[79]).toBe('80. CB');
  });

  it('labelCols gives excell letters', () => {

    const res = DataGridModel.labelCols(2);
    expect(res).toEqual(['A', 'B']);
  });

  it('labelCols handles high cols numbers', () => {

    const res = DataGridModel.labelCols(80);
    expect(res[0]).toBe('A');
    expect(res[16]).toBe('Q');
    expect(res[25]).toBe('Z');
    expect(res[26]).toBe('AA');
    expect(res[52]).toBe('BA');
    expect(res[79]).toBe('CB');
  });


});
