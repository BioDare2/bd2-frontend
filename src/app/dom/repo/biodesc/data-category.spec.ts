import {DataCategory} from './data-category';

describe('DataCategory', () => {


  it('Correctly deserializes null as null', () => {

    const c = DataCategory.deserialize(null);
    expect(c).toBeNull();

  });

  it('Correctly deserializes string names', () => {

    const names = ['NONE', 'PCR', 'METABOLITE', 'EXPR_REPORTER'];
    names.forEach(name => {

      const c = DataCategory.deserialize(name);
      expect(c).toBeDefined();
      expect(c.name).toBe(name);
      expect(c).toBe(DataCategory.get(name));
    });
  });


  it('Correctly deserializes numbers', () => {

    const ixs = [0, 3, 10, 16];
    const names = ['NONE', 'DELAYED_FLUORESCENCE', 'PHYSIOLOGY', 'TRANSL_FUSION'];

    for (let i = 0; i < ixs.length; i++) {

      const ix = ixs[i];
      const name = names[i];
      const c = DataCategory.deserialize(ix);
      expect(c).toBeDefined();
      expect(c.name).toBe(name);
      expect(c).toBe(DataCategory.get(name));
    }
  });

  it('Correctly serializes', () => {

    const c = DataCategory.get('SIGNALLING_REPORTER');
    expect(c).toBeDefined();
    const txt = JSON.stringify(c);
    expect(txt).toBe('"SIGNALLING_REPORTER"');
  });

  it('ValidOptionsDoesNotContainDisabled', () => {

    const dis = DataCategory.getValidOptions().filter(dc => dc.disabled);
    expect(dis).toEqual([]);
    expect(DataCategory.getValidOptions().indexOf(DataCategory.get('TRANSC_FUSION'))).toBeLessThan(0);

  });

  it('ValidOptionsDoesContainsValid', () => {

    expect(DataCategory.getValidOptions().length).toBeGreaterThan(1);
    expect(DataCategory.getValidOptions().length).toBeLessThan(DataCategory.getValues().length);

    expect(DataCategory.getValidOptions().indexOf(DataCategory.get('LEAF_MOVEMENT'))).toBeGreaterThanOrEqual(0);

  });


});
