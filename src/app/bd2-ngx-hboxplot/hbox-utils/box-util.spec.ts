import {BoxUtil} from './box-util';

describe('BoxUtil', () => {

  let util: BoxUtil;

  beforeEach(() => {
    util = new BoxUtil();
  });

  it('setups works', () => {
    expect(util).toBeTruthy();
  });

  describe('dataToBoxes', () => {

    it('handles empty data', () => {

      let data = null;
      let boxes = util.dataToBoxes(data);

      expect(boxes).toEqual([]);

      data = [];
      boxes = util.dataToBoxes(data);

      expect(boxes).toEqual([]);
    });

    it('converts data', () => {
      const data = [[5], [8.1, -0.1, 5, 3, 4]];
      const boxes = util.dataToBoxes(data);

      expect(boxes).toBeTruthy();
      expect(boxes.length).toBe(2);
      expect(boxes[0].median).toBe(5);
      expect(boxes[0].ix).toBe(0);
      expect(boxes[0].key).toBe('1.');

      expect(boxes[1].median).toBe(4);
      expect(boxes[1].ix).toBe(1);
      expect(boxes[1].key).toBe('2.');
    });
  });

  describe('datumtobox', () => {

    it('handles empty data', () => {
      let data = [];
      let box = util.datumToBox(data);

      expect(box).toBeTruthy();
      expect(box.median).toBeUndefined();

      data = null;
      box = util.datumToBox(data);

      expect(box).toBeTruthy();
      expect(box.median).toBeUndefined();

    });

    it('mocks empty values with provided', () => {
      const data = [];
      const box = util.datumToBox(data);

      expect(box).toBeTruthy();
      expect(box.mean).toBeUndefined();

      const boxes = [box];
      util.mockEmptyValues(boxes, 1);

      expect(box.mean).toBe(1);
      expect(box.median).toBe(1);
      expect(box.thrdQnt).toBe(1);
      expect(box.fstQnt).toBe(1);
      expect(box.lowWskr).toBe(1);
      expect(box.highWskr).toBe(1);
      expect(box.outliers).toEqual([]);
    });

    it('handles empty', () => {

      const data = [];
      const box = util.datumToBox(data);

      expect(box).toBeTruthy();
      expect(box.mean).toBeUndefined();
      expect(box.median).toBeUndefined();
      expect(box.thrdQnt).toBeUndefined();
      expect(box.fstQnt).toBeUndefined();
      expect(box.lowWskr).toBeUndefined();
      expect(box.highWskr).toBeUndefined();
      expect(box.outliers).toEqual([]);

    });

    it('handles singulars', () => {

      const data = [5];
      const box = util.datumToBox(data);

      expect(box).toBeTruthy();
      expect(box.mean).toBe(5);
      expect(box.median).toBe(5);
      expect(box.thrdQnt).toBe(5);
      expect(box.fstQnt).toBe(5);
      expect(box.lowWskr).toBe(5);
      expect(box.highWskr).toBe(5);
      expect(box.outliers).toEqual([]);

    });

    it('handles unsorted data', () => {

      const data = [6, 5, 2, 3, 4];
      const box = util.datumToBox(data);

      expect(box).toBeTruthy();
      expect(box.mean).toBe((5 + 6 + 2 + 3 + 4) / 5);
      expect(box.median).toBe(4);
      expect(box.fstQnt).toBe(3);
      expect(box.thrdQnt).toBe(5);
      expect(box.outliers).toEqual([]);

    });

    it('calculates whiskers details', () => {

      let data = [1, 3, 4, 5, 5, 5, 6, 7, 8];
      let box = util.datumToBox(data);

      expect(box).toBeTruthy();
      expect(box.median).toBe(5);
      expect(box.fstQnt).toBe(4);
      expect(box.thrdQnt).toBe(6);
      expect(box.lowWskr).toBe(1);
      expect(box.highWskr).toBe(8);

      data = [0, 3, 4, 5, 5, 5, 6, 7, 9.1];
      box = util.datumToBox(data);

      expect(box).toBeTruthy();
      expect(box.median).toBe(5);
      expect(box.fstQnt).toBe(4);
      expect(box.thrdQnt).toBe(6);
      expect(box.lowWskr).toBe(3);
      expect(box.highWskr).toBe(7);


    });

    it('calculates outliers', () => {
      const data = [8.1, -0.1, 5, 3, 4];
      const box = util.datumToBox(data);

      expect(box).toBeTruthy();
      expect(box.outliers).toEqual([-0.1, 8.1]);
    });

  });

});
