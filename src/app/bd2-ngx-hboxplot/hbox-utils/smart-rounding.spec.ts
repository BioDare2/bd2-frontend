import {SmartRounder} from './smart-rounding';

describe('SmartRounding', () => {

  it('leaves small numbers untouched', () => {

    const d = [0.0010002, -0.001345445, -0.00000034343];
    const exp = d;

    d.forEach((v, i) => expect(SmartRounder.round(v)).toBe(exp[i]));
  });

  it('centy numbers to for digit', () => {

    const d = [0.1910002, -0.061375445, -0.01023034343];
    const exp = [0.1910, -0.0614, -0.0102];

    d.forEach((v, i) => expect(SmartRounder.round(v)).toBe(exp[i]));
  });


  it('leaves numbers up to 1000 with two decimals', () => {

    const d = [1.0010002, -10.201345445, -101.12800000034343, 900, 3];
    const exp = [1, -10.2, -101.13, 900, 3];

    d.forEach((v, i) => expect(SmartRounder.round(v)).toBe(exp[i]));
  });

  it('rounds numbers over 1000 to integer', () => {

    const d = [1000.10002, -1000.201345445, -101111.800000034343, 3000];
    const exp = [1000, -1000, -101112, 3000];

    d.forEach((v, i) => expect(SmartRounder.round(v)).toBe(exp[i]));
  });

});
