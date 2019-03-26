import {AssetType} from './asset-type';

describe('AssetType', () => {

  it('Correctly deserializes null as null', () => {

    let v = AssetType.deserialize(null);
    expect(v).toBeNull();
    v = AssetType.deserialize(undefined);
    expect(v).toBeNull();
  });

  it('Correctly deserializes numbers', () => {

    const ins = [0, 1, 4];
    const exp = [AssetType.NONE, AssetType.FILE, AssetType.TS_DATA];

    ins.forEach((x, ix) => {
      const v = AssetType.deserialize(x);
      expect(v).toBe(exp[ix]);
    });
  });

  it('Correctly deserializes names', () => {

    const ins = ['NONE', 'FILE', 'TS_DATA'];
    const exp = [AssetType.NONE, AssetType.FILE, AssetType.TS_DATA];

    ins.forEach((x, ix) => {
      const v = AssetType.deserialize(x);
      expect(v).toBe(exp[ix]);
    });

  });

  it('Deserialize unknowns throws exception', () => {

    try {
      AssetType.deserialize('xxx');
      fail('Exception expected');
    } catch (err) {
      expect(err.constructor).toBe(RangeError);
    }
    // expect(v).toBe(AssetType.NONE);

  });

});
