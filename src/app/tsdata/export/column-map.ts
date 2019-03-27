export class ColumnMap<K, V> {

  rows = new Map<K, V[]>();
  nextColumn = 0;
  sorted = true;

  constructor(sorted?: boolean) {
    if (sorted !== null && sorted !== undefined) {
      this.sorted = sorted;
    }
  }

  get width(): number {
    return this.nextColumn;
  }

  get size(): number {
    return this.rows.size;
  }

  append(key: K, value: V) {
    this.put(key, value, this.nextColumn);
    // this.nextColumn++;
  }

  put(key: K, value: V, column: number) {
    this._put(key, value, column);
    this.nextColumn = Math.max(this.nextColumn, column + 1);
  }

  putColumn(keys: K[], values: V[], column) {
    keys.forEach((key: K, ix: number) => {
      this._put(key, values[ix], column);
    });
    this.nextColumn = Math.max(this.nextColumn, column + 1);
  }

  appendColumn(keys: K[], values: V[]) {
    this.putColumn(keys, values, this.nextColumn);
    // this.nextColumn++;
  }


  getValue(key: K, column: number): V {
    const row = this.rows.get(key);
    if (row) {
      return row[column];
    } else {
      return undefined;
    }
  }

  getRow(key: K): V[] {
    return this.rows.get(key);
  }

  forEach(f: (entry: { key: K, columns: V[] }, index: number, map: ColumnMap<K, V>) => void) {

    this.keys().forEach((key, ix) => {
      const p = {key, columns: this.rows.get(key)};
      f(p, ix, this);
    });
  }

  forEachFlat(f: (row: any[], index: number, map: ColumnMap<K, V>) => void) {
    this.keys().forEach((key, ix) => {
      const r = ([key] as any).concat(this.rows.get(key));
      f(r, ix, this);
    });

  }

  keys(): K[] {
    if (this.sorted) {
      return Array.from(this.rows.keys()).sort((v1, v2) => {
        if (v1 == v2) {
          return 0;
        } else if (v1 < v2) {
          return -1;
        } else {
          return 1;
        }
      });
    } else {
      return Array.from(this.rows.keys());
    }
  }

  protected _put(key: K, value: V, column: number) {
    let row = this.rows.get(key);
    if (!row) {
      row = [];
      this.rows.set(key, row);
    }

    row[column] = value;
  }


}
