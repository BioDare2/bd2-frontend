import {PolarDomainUtil} from './polar-domain-util';

describe('Polar domain util', () => {

  let util: PolarDomainUtil;
  let domain: number[];

  beforeEach(() => {
    util = new PolarDomainUtil();
    domain = [0, 24, 24];
  });

  it('setups correctly', () => {
    expect(util).toBeDefined();
  });


  describe('dataToPetals', () => {

    it('handles empty data', () => {

      expect(util.dataToPetals(null, domain)).toEqual([]);

      expect(util.dataToPetals([], domain)).toEqual([]);
    });



    it('computes the petals', () => {

      const data = [
        [10],
        [23, 1]
      ];
      const ans = util.dataToPetals(data, domain);
      expect(ans.length).toBe(2);
      expect(ans[0].peak).toBe(10);
      expect(ans[1].peak).toBe(0);
    });
  });


  describe('dataToPetal', () => {

    it('builds petal using defaults', () => {

      let petal = util.dataToPetal([20], [0, 24, 24]);
      expect(petal).toBeDefined();
      expect(petal.peak).toBe(20);
      expect(petal.width).toBe(0.6);
      expect(petal.radiusScale).toBe(1);
      expect(petal.polarCoordinates).toBeDefined();
      expect(petal.polarAngle).toBe(20 / 24 * Math.PI * 2);
      expect(petal.petalPath).toBeDefined();
      expect(petal.petalPath.length).toBe(4);

      petal = util.dataToPetal([20, 10], [0, 12, 12]);
      expect(petal).toBeDefined();
      expect(petal.peak).toBe(9);
      expect(petal.width).toBe(0.3);
      expect(petal.radiusScale).toBe(1);
      expect(petal.polarCoordinates).toBeDefined();
      expect(petal.polarAngle).toBe(9 / 12 * Math.PI * 2);
      expect(petal.petalPath).toBeDefined();
      expect(petal.petalPath.length).toBe(4);

    });

    it('sets peek time relative to original domain', () => {

      let petal = util.dataToPetal([20], [12, 24, 12]);
      expect(petal).toBeDefined();
      expect(petal.peak).toBe(20);

      petal = util.dataToPetal([10], [12, 24, 12]);
      expect(petal).toBeDefined();
      expect(petal.peak).toBe(22);



    });

    it('adds individual points', () => {
      const petal = util.dataToPetal([20, 10], [0, 24, 24]);
      expect(petal.individuals).not.toEqual([]);
      expect(petal.individuals.length).toBe(2);
      expect(petal.individuals[1].xy).toEqual(util.normalizedPeakToPolar(10,24));
    });
  });

  describe('calculatePetalPath', () => {

    it('makes 4 node path', () => {

      const ans = util.calculatePetalPath(6, 0.5, 1, domain);
      expect(ans.length).toBe(4);

      expect(ans.map(v => v[0])).toEqual([0, 0.5, 1, 0.5]);

      expect(ans[2][1]).toBeCloseTo(Math.PI / 2);
    });

    it('scales the radius', () => {

      const ans = util.calculatePetalPath(6, 0.5, 0.5, domain);
      expect(ans.map(v => v[0])).toEqual([0, 0.25, 0.5, 0.25]);

    });

    it('applies the width', () => {

      const ans = util.calculatePetalPath(6, 0.5, 0.5, domain);

      expect(ans[1][1]).toBeLessThan(ans[2][1]);
      expect(ans[3][1]).toBeGreaterThan(ans[2][1]);

      let ans2 = util.calculatePetalPath(6, 0.6, 0.5, domain);
      expect(ans2[1][1]).toBeLessThan(ans[1][1]);
      expect(ans2[3][1]).toBeGreaterThan(ans[3][1]);

      ans2 = util.calculatePetalPath(6, 0.4, 0.5, domain);
      expect(ans2[1][1]).toBeGreaterThan(ans[1][1]);
      expect(ans2[3][1]).toBeLessThan(ans[3][1]);

    });
  });

  describe('calculateCircularMeanAndDev', () => {

    it('works on singular data', () => {

      expect(util.calculateCircularMeanAndDev([2], domain)).toEqual([2, 0]);
      expect(util.calculateCircularMeanAndDev([10], domain)).toEqual([10, 0]);
      expect(util.calculateCircularMeanAndDev([12], domain)).toEqual([12, 0]);
      expect(util.calculateCircularMeanAndDev([13], domain)).toEqual([13, 0]);
      expect(util.calculateCircularMeanAndDev([23], domain)).toEqual([23, 0]);
      expect(util.calculateCircularMeanAndDev([25], domain)).toEqual([1, 0]);
    });

    it('works averages normal groups', () => {

      expect(util.calculateCircularMeanAndDev([1, 2, 3], domain)).toEqual([2, 1]);
      expect(util.calculateCircularMeanAndDev([8, 9, 10], domain)).toEqual([9, 1]);
      expect(util.calculateCircularMeanAndDev([11, 12, 13], domain)).toEqual([12, 1]);
      expect(util.calculateCircularMeanAndDev([21, 22, 23], domain)).toEqual([22, 1]);
    });

    it('rotates when needed', () => {
      expect(util.calculateCircularMeanAndDev([0, 24, 0], domain)).toEqual([0, 0]);
      expect(util.calculateCircularMeanAndDev([23, 0, 1], domain)).toEqual([0, 1]);
      expect(util.calculateCircularMeanAndDev([23, 1, 3], domain)).toEqual([1, 2]);
      expect(util.calculateCircularMeanAndDev([21, 22, 23, 2], domain)[0]).toEqual((21 + 22 + 23 + 26) / 4);

    });


  });

  describe('calculatePetalProperties', () => {

    it('sets the peak correctly', () => {
      let node = util.calculatePetalProperties([3], domain);
      expect(node.peak).toBe(3);

      node = util.calculatePetalProperties([2, 4], domain);
      expect(node.peak).toBe(3);

      node = util.calculatePetalProperties([2, 4, 6], domain);
      expect(node.peak).toBe(4);

      node = util.calculatePetalProperties([14, 16, 18], [12, 24, 12]);
      expect(node.peak).toBe(4);

      node = util.calculatePetalProperties([2, 16, 18], [12, 24, 12]);
      expect(node.peak).toBe(4);
    });

    it('sets the roundedPeak correctly', () => {
      let node = util.calculatePetalProperties([3.0023], domain);
      expect(node.roundedPeak).toBe(3);

      node = util.calculatePetalProperties([100.118], [0, 1000, 1000]);
      expect(node.roundedPeak).toBe(100.12);

      node = util.calculatePetalProperties([0.000012], domain);
      expect(node.roundedPeak).toBe(0.000012);

    });

    it('rotates data before averging', () => {

      let node = util.calculatePetalProperties([1, 23], domain);
      expect(node.peak).toBe(0);

      node = util.calculatePetalProperties([22, 4, 4, 10], domain);
      expect(node.peak).toBe(4);

    });


    it('sets width to default if not scaling', () => {
      let node = util.calculatePetalProperties([3], domain, false, false);
      expect(node.width).toBe(0.6);

      node = util.calculatePetalProperties([3], [0, 12, 12], false, false);
      expect(node.width).toBe(0.3);
    });

    it('sets width to error if scaling', () => {
      const node = util.calculatePetalProperties([3], domain, false, true, 1);
      expect(node.width).toBe(1);
    });

    it('sets width to min value if scaling and error too small', () => {
      const node = util.calculatePetalProperties([3], domain, false, true, 0.01);
      expect(node.width).toBe(0.1);
    });

    it('sets width to max value if scaling and error too big', () => {
      const node = util.calculatePetalProperties([3], [0, 12, 12], false, true, 10);
      expect(node.width).toBe(6);
    });

    it('handles scaling for singletons', () => {
      const node = util.calculatePetalProperties([3], [0, 12, 12], true, true);
      expect(node.width).toBe(0.1 / 2);
      expect(node.radiusScale).toBe(1);
    });

    it('handles scaling for pairs', () => {
      let node = util.calculatePetalProperties([4, 4], [0, 12, 12], true, true);
      expect(node.width).toBe(0.1 / 2);
      expect(node.radiusScale).toBe(1);

      node = util.calculatePetalProperties([4, 5], [0, 24, 24], true, true);
      expect(node.width).toBeGreaterThan(0.5);
      expect(node.width).toBeLessThan(1);
      expect(node.radiusScale).toBeLessThan(1);
      expect(node.radiusScale).toBeGreaterThan(0.5);
    });

    it('uses stand deviation if no error provided', () => {

      let node = util.calculatePetalProperties([4, 4, 4.1, 4.05], domain, true, true);
      expect(node.width).toBe(0.1);
      expect(node.radiusScale).toBe(1);

      node = util.calculatePetalProperties([4, 4, 5, 6], domain, true, true);
      expect(node.width).toBeGreaterThan(0.1);
      expect(node.radiusScale).toBeLessThan(1);


      const node2 = util.calculatePetalProperties([4, 4, 5.5, 6], domain, true, true);
      expect(node2.width).toBeGreaterThan(node.width);
      expect(node2.radiusScale).toBeLessThan(node.radiusScale);

    });


  });


  it('calculates correct polar coordinates', () => {

    let domain = [0, 24, 24];
    let a = util.calculatePolarCoordinate(0, domain);
    expect(a[0]).toBeCloseTo(0);
    expect(a[1]).toBeCloseTo(-1);

    a = util.calculatePolarCoordinate(6, domain);
    expect(a[0]).toBeCloseTo(1);
    expect(a[1]).toBeCloseTo(0);

    a = util.calculatePolarCoordinate(12, domain);
    expect(a[0]).toBeCloseTo(0);
    expect(a[1]).toBeCloseTo(1);

    a = util.calculatePolarCoordinate(30, domain);
    expect(a[0]).toBeCloseTo(1);
    expect(a[1]).toBeCloseTo(0);

    a = util.calculatePolarCoordinate(-6, domain);
    expect(a[0]).toBeCloseTo(-1);
    expect(a[1]).toBeCloseTo(0);

    domain = [12, 24, 12];
    a = util.calculatePolarCoordinate(15, domain);
    expect(a[0]).toBeCloseTo(1);
    expect(a[1]).toBeCloseTo(0);

    a = util.calculatePolarCoordinate(6, domain);
    expect(a[0]).toBeCloseTo(0);
    expect(a[1]).toBeCloseTo(1);

  });

  it('normalizes to circular domain', () => {
    domain = [3, 9, 6];
    expect(util.normalize(3, domain)).toEqual(0);
    expect(util.normalize(4, domain)).toEqual(1);
    expect(util.normalize(9, domain)).toEqual(0);
    expect(util.normalize(10, domain)).toEqual(1);
    expect(util.normalize(2, domain)).toEqual(5);
  });

  it('calculates correct polar angle', () => {
    domain = [0, 24, 24];
    expect(util.calculatePolarAngle(6, domain)).toBeCloseTo(Math.PI / 2);
  });

});
