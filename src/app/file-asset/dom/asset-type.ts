export class AssetType {

  static NONE = new AssetType('NONE');
  static FILE = new AssetType('FILE');
  static MEDIA = new AssetType('MEDIA');
  static DATA = new AssetType('DATA');
  static TS_DATA = new AssetType('TS_DATA');
  static values = [AssetType.NONE, AssetType.FILE, AssetType.MEDIA, AssetType.DATA, AssetType.TS_DATA];
  static valuesMap: Map<String, AssetType> = AssetType.initValuesMap();

  constructor(public name: string) {
  }

  static deserialize(val: string | number): AssetType {

    if (val === null || val === undefined) {
      return null;
    }
    const c = AssetType.valuesMap.get(val as string);
    if (c) {
      return c;
    }
    const ix = +val;

    // console.log("V: " + val + " ix: " + ix+"; "+ix.constructor.name+Number.isNaN(ix));
    if (ix < 0 || ix >= AssetType.values.length || Number.isNaN(ix)) {
      throw new RangeError('Uknown AssetType ' + val);
    }
    return AssetType.values[ix];
  }

  protected static initValuesMap(): Map<String, AssetType> {

    const map = new Map<String, AssetType>();

    AssetType.values.forEach(c => map.set(c.name, c));

    return map;
  }

  public equals(other: AssetType) {
    return (this.name === other.name);
  }

  toJSON(): string {
    return this.name;
  }
}
