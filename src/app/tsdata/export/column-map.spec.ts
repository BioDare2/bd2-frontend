import {ColumnMap} from './column-map';

describe('ColumnMap', () => {

  let map: ColumnMap<string, number>;

  beforeEach(() => {
    map = new ColumnMap<string, number>();
  });

  describe('size', () => {

    it('size is 0 for empty', () => {
      expect(map.size).toBe(0);
    });

    it('size gives row numbers', () => {

      map.put('A', 1, 0);
      map.put('B', 2, 0);
      map.put('A', 3, 1);

      expect(map.size).toBe(2);
    });
  });

  describe('width', () => {

    it('width is 0 for empty', () => {
      expect(map.width).toBe(0);
    });

    it('width gives number of columns', () => {
      map.put('A', 1, 0);
      map.put('B', 2, 2);
      map.put('A', 3, 1);
      expect(map.width).toBe(3);
    });

  });

  it('put puts gets get', () => {
    map.put('B', 1, 0);
    map.put('C', 1, 0);
    map.put('B', 3, 2);
    map.put('C', 2, 0);

    expect(map.getValue('B', 0)).toBe(1);
    expect(map.getValue('C', 0)).toBe(2);
    expect(map.getValue('B', 2)).toBe(3);
    expect(map.getValue('C', 2)).toBeUndefined();

  });

  it('getRow gets it', () => {
    map.put('B', 1, 0);
    map.put('C', 1, 0);
    map.put('B', 3, 2);

    expect(map.getRow('B')).toEqual([1, undefined, 3]);

  });

  it('appends append', () => {
    expect(map.size).toBe(0);
    map.append('B', 1);
    map.append('C', 2);
    map.append('B', 3);

    expect(map.getValue('B', 0)).toBe(1);
    expect(map.getValue('C', 1)).toBe(2);
    expect(map.getValue('B', 2)).toBe(3);
    expect(map.getValue('C', 0)).toBeUndefined();

    expect(map.width).toBe(3);
    expect(map.size).toBe(2);
  });

  it('putColumn inserts it', () => {

    map.put('B', 1, 0);
    map.put('C', 1, 1);
    map.put('B', 3, 2);

    map.putColumn(['B', 'C'], [4, 5], 2);
    map.putColumn(['B', 'D'], [5, 6], 3);

    expect(map.getRow('B')).toEqual([1, undefined, 4, 5]);
    expect(map.getRow('C')).toEqual([undefined, 1, 5]);
    expect(map.getRow('D')).toEqual([undefined, undefined, undefined, 6]);
  });

  it('appendColumn appends it', () => {

    map.put('B', 1, 0);
    map.put('C', 1, 1);

    map.appendColumn(['B', 'C'], [4, 5]);
    map.appendColumn(['B', 'D'], [6, 7]);

    expect(map.getRow('B')).toEqual([1, undefined, 4, 6]);
    expect(map.getRow('C')).toEqual([undefined, 1, 5]);
    expect(map.getRow('D')).toEqual([undefined, undefined, undefined, 7]);
  });

  it('foreach iterates over key values', () => {
    map.put('B', 1, 0);
    map.put('C', 1, 0);
    map.put('B', 3, 2);

    const keys = [];
    const values = [];
    const ixs = [];

    map.forEach((entry, ix, m) => {
      expect(m).toBe(map);
      keys.push(entry.key);
      values.push(entry.columns);
      ixs.push(ix);
    });

    expect(keys).toEqual(['B', 'C']);
    expect(values).toEqual([[1, undefined, 3], [1]]);
    expect(ixs).toEqual([0, 1]);

  });

  it('keys gives sorted keys on sorted map', () => {
    map.put('B', 1, 0);
    map.put('C', 1, 0);
    map.put('A', 3, 2);
    map.put('C', 1, 0);
    map.put('B', 3, 2);
    map.put('F', 3, 2);
    map.put('D', 3, 2);

    expect(map.keys()).toEqual(['A', 'B', 'C', 'D', 'F']);

  });

  it('keys gives sorted keys on sorted num map', () => {

    const map = new ColumnMap<number, number>();
    map.put(111, 1, 0);
    map.put(11, 1, 0);
    map.put(1, 3, 2);
    map.put(1, 1, 0);
    map.put(12, 3, 2);
    map.put(2, 3, 2);
    map.put(3, 3, 2);

    expect(map.keys()).toEqual([1, 2, 3, 11, 12, 111]);

  });

  it('keys gives unorderd keys on unsorted map', () => {
    map = new ColumnMap<string, number>(false);
    map.put('B', 1, 0);
    map.put('C', 1, 0);
    map.put('A', 3, 2);
    map.put('C', 1, 0);
    map.put('B', 3, 2);
    map.put('F', 3, 2);
    map.put('D', 3, 2);

    expect(map.keys()).toEqual(['B', 'C', 'A', 'F', 'D']);

  });

  it('foreachFlat iterates over key and values', () => {
    map.put('B', 1, 0);
    map.put('C', 1, 0);
    map.put('B', 3, 2);

    const rows = [];
    const ixs = [];

    map.forEachFlat((row, ix, m) => {
      expect(m).toBe(map);
      rows.push(row);
      ixs.push(ix);
    });

    expect(rows).toEqual([['B', 1, undefined, 3], ['C', 1]]);
    expect(ixs).toEqual([0, 1]);

  });

});
