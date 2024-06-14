import {HeatmapDataUtil} from './heatmap-data-util';
import {BoxDef, Serie} from '../bd2-heatmap.dom';


describe('HeatmapDataUtil', () => {

  let util: HeatmapDataUtil;

  beforeEach(() => {
    util = new HeatmapDataUtil();
  });

  it('creates', () => {

    expect(util).toBeDefined();

  });

  it('asymboxFromPoints makes box with borders between', () => {

    const prev = {x: 0, y: 1};
    const point = {x: 1, y: 2};
    const next = {x: 3, y: 3};

    expect(util.asymBoxFromPoints(point, prev, next)).toEqual(new BoxDef(1, 2, 0.5, 2));

  });

  it('symboxFromPoints makes box with symetrical borders', () => {

    const prev = {x: 0, y: 1};
    const point = {x: 1, y: 2};
    const next = {x: 3, y: 3};

    expect(util.symBoxFromPoints(point, prev, next)).toEqual(new BoxDef(1, 2, 0.5, 1.5));

  });


  it('pointsToAsymBoxes handles corner cases', () => {

    const points = [];
    expect(util.pointsToAsymBoxes(null)).toEqual([]);
    expect(util.pointsToAsymBoxes(points)).toEqual([]);

    const point = {x: 1, y: 2};
    points.push(point);
    expect(util.pointsToAsymBoxes(points)).toEqual([new BoxDef(1, 2, 0.5, 1.5)]);
  });


  it('pointsToAsymBoxes converts', () => {

    const points = [];
    const prev = {x: 0, y: 1};
    const point = {x: 1, y: 2};
    const next = {x: 3, y: 3};

    points.push(prev);
    points.push(point);

    let exp = [];
    exp.push(new BoxDef(0, 1, -0.5, 0.5));
    exp.push(new BoxDef(1, 2, 0.5, 1.5));

    expect(util.pointsToAsymBoxes(points)).toEqual(exp);

    points.push(next);
    exp = [];
    exp.push(new BoxDef(0, 1, -0.5, 0.5));
    exp.push(new BoxDef(1, 2, 0.5, 2));
    exp.push(new BoxDef(3, 3, 2, 4));

    expect(util.pointsToAsymBoxes(points)).toEqual(exp);

  });

  it('serieToAsymBoxes', () => {

    const points = [];
    const prev = {x: 0, y: 1};
    const point = {x: 1, y: 2};
    const next = {x: 3, y: 3};

    points.push(prev);
    points.push(point);
    points.push(next);

    const ser: Serie = {
      key: 1,
      label: 'F',
      min: 1, max: 3, mean: (4 / 3),
      data: points
    };

    const boxes = util.serieToBoxes(ser, true);
    expect(boxes.key).toBe(1);
    expect(boxes.label).toBe('F');
    expect(boxes.min).toBe(1);
    expect(boxes.max).toBe(3);
    expect(boxes.data.length).toBe(ser.data.length);
    expect(boxes.data[0]).toEqual(new BoxDef(0, 1, -0.5, 0.5));

  });

  it('pointsToSymBoxes handles corner cases', () => {

    const points = [];
    expect(util.pointsToSymBoxes(null)).toEqual([]);
    expect(util.pointsToSymBoxes(points)).toEqual([]);

    const point = {x: 1, y: 2};
    points.push(point);
    expect(util.pointsToSymBoxes(points)).toEqual([new BoxDef(1, 2, 0.5, 1.5)]);
  });


  it('pointsToSymBoxes converts', () => {

    const points = [];
    const prev = {x: 0, y: 1};
    const point = {x: 1, y: 2};
    const next = {x: 3, y: 3};

    points.push(prev);
    points.push(point);

    let exp = [];
    exp.push(new BoxDef(0, 1, -0.5, 0.5));
    exp.push(new BoxDef(1, 2, 0.5, 1.5));

    expect(util.pointsToSymBoxes(points)).toEqual(exp);

    points.push(next);
    exp = [];
    exp.push(new BoxDef(0, 1, -0.5, 0.5));
    exp.push(new BoxDef(1, 2, 0.5, 1.5));
    exp.push(new BoxDef(3, 3, 2, 4));

    expect(util.pointsToSymBoxes(points)).toEqual(exp);

  });

  it('serieToSymBoxes', () => {

    const points = [];
    const prev = {x: 0, y: 1};
    const point = {x: 1, y: 2};
    const next = {x: 3, y: 3};

    points.push(prev);
    points.push(point);
    points.push(next);

    const ser: Serie = {
      key: 1,
      label: 'F',
      min: 1, max: 3, mean: (4 / 3),
      data: points
    };

    const boxes = util.serieToBoxes(ser);
    expect(boxes.key).toBe(1);
    expect(boxes.label).toBe('F');
    expect(boxes.min).toBe(1);
    expect(boxes.max).toBe(3);
    expect(boxes.data.length).toBe(ser.data.length);
    expect(boxes.data[0]).toEqual(new BoxDef(0, 1, -0.5, 0.5));

  });







});
