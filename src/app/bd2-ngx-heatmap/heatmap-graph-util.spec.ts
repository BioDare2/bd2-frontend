import {HeatmapGraphUtil} from './heatmap-graph-util';
import {BoxDef, BoxSerie, GraphicContext, LookAndFeelSizing, Point, Serie} from './bd2-heatmap.dom';
import {scaleLinear} from 'd3-scale';


describe('HeatmapGraphUtil', () => {

  let util: HeatmapGraphUtil;

  beforeEach(() => {
    util = new HeatmapGraphUtil();
  });

  it('creates', () => {

    expect(util).toBeDefined();

  });

  it('labels Color gives function of index', () => {

    const traces = [];
    traces.push({});
    traces.push({});
    traces.push({});

    const scale = util.labelsColors(traces);
    expect(scale(0)).toBeDefined();
    expect(scale(0)).toEqual('rgb(158, 1, 66)');
    expect(scale(1)).toBeDefined();
    expect(scale(2)).toBeDefined();


  });

  it('format for domain gives smart formating depending on the range', () => {

    let domain: [number, number] = [0, 0.1];
    let formater = util.formatForDomain(domain);
    expect(formater(0.05)).toEqual('5e-2');
    expect(formater(0.0005)).toEqual('5e-4');
    expect(formater(0.0011235)).toEqual('1.12e-3');

    domain = [0, 10];
    formater = util.formatForDomain(domain);
    expect(formater(0.005)).toEqual('0.01');
    expect(formater(0.05)).toEqual('0.05');
    expect(formater(0.5)).toEqual('0.5');
    expect(formater(5.0011235)).toEqual('5');

    domain = [0, 10000];
    formater = util.formatForDomain(domain);
    expect(formater(0.005)).toEqual('0');
    expect(formater(5.0011235)).toEqual('5');
    expect(formater(9000)).toEqual('9000');

    expect(util).toBeDefined();

  });

  it('valuesRande uses only series min max to calculate', () => {

    const traces: Serie[] = [];

    expect(util.valuesRange(traces)).toEqual([NaN, NaN]);


    traces.push({min: 1, max: 1} as Serie);
    traces.push({min: -2, max: -1} as Serie);

    expect(util.valuesRange(traces)).toEqual([-2, 1]);

  });

  it('heatmap scale constructs a scale', () => {

    const traces: Serie[] = [ {min: 1, max: 10} as Serie];
    const scale = util.heatmapScale(traces, false);

    expect(scale(1)).not.toEqual(scale(10));
    expect(scale(11)).toEqual(scale(10));
    expect(scale(0)).toEqual(scale(1));
    expect(scale(1)).not.toEqual(scale(2));

  });

  it('heatmap scale constructs a scale symmetrica over zero', () => {

    const traces: Serie[] = [ {min: 1, max: 10} as Serie];
    let scale = util.heatmapScale(traces, false);

    expect(scale(0)).toEqual('#d62728');
    expect(scale(1)).toEqual('#d62728');
    expect(scale(10)).toEqual('#1f77b4');

    scale = util.heatmapScale(traces, true);
    expect(scale(0)).toEqual('#ffffff');
    expect(scale(-10)).toEqual('#d62728');
    expect(scale(10)).toEqual('#1f77b4');


  });



  it('timeDomain gives times range from all series', () => {

    const traces: Serie[] = [];
    expect(util.timeDomain(traces)).toEqual([0, 1]);

    traces.push({} as Serie);
    expect(util.timeDomain(traces)).toEqual([0, 1]);

    let points: Point[] = [{x: 2, y: 2}, {x: 5, y: 3}];
    let s = { data: points} as Serie;
    traces.push(s);

    points = [{x: 1, y: 2}];
    s = { data: points} as Serie;
    traces.push(s);
    expect(util.timeDomain(traces)).toEqual([1, 5]);

  });

  it('timeMargin gives default if data not boxes', () => {

    const timeDomain: [number, number] = [1, 5];
    const traces: Serie[] = [];
    expect(util.timeMargin(traces, timeDomain)).toEqual(0.5);

    traces.push({} as Serie);
    expect(util.timeMargin(traces, timeDomain)).toEqual(0.5);

    let points: Point[] = [{x: 2, y: 2}, {x: 5, y: 3}];
    let s = { data: points} as Serie;
    traces.push(s);

    points = [{x: 1, y: 2}];
    s = { data: points} as Serie;
    traces.push(s);
    expect(util.timeMargin(traces, timeDomain)).toEqual(0.5);

  });

  it('timeMargin gives left width of box data with min x from domain', () => {

    const timeDomain: [number, number] = [1, 5];
    const traces: Serie[] = [];

    traces.push({} as Serie);
    expect(util.timeMargin(traces, timeDomain)).toEqual(0.5);

    let points: BoxDef[] = [new BoxDef(2,  2, 1.5, 2.5), new BoxDef(5, 3, 4.8, 5.2)];
    let s = { data: points} as BoxSerie;
    traces.push(s);

    points = [new BoxDef(1,  2, 0, 2)];
    s = { data: points} as BoxSerie;
    traces.push(s);
    expect(util.timeMargin(traces, timeDomain)).toEqual(1);

    points = [new BoxDef(1,  2, -0.5, 2)];
    s = { data: points} as BoxSerie;
    traces.push(s);
    expect(util.timeMargin(traces, timeDomain)).toEqual(1.5);
  });

  it('creates formaters for domain and values', () => {

    const graphic = new GraphicContext();

    const traces: Serie[] = [];

    traces.push({min: NaN, max: NaN} as Serie);

    let points: Point[] = [{x: 2, y: 0.1}, {x: 5, y: 0.3}];
    let s = { data: points, min: 0.1, max: 0.3} as Serie;
    traces.push(s);

    points = [{x: 1, y: 0.2}];
    s = { data: points, min: 0.2, max: 0.2} as Serie;
    traces.push(s);

    util.addFormatters(graphic, traces);
    expect(graphic.domainFormatter).toBeDefined();
    expect(graphic.valuesFormatter).toBeDefined();

    expect(graphic.domainFormatter(0.1)).toEqual('0.1');
    expect(graphic.valuesFormatter(0.1)).toEqual('1e-1');

    expect(graphic.domainFormatter(2)).toEqual('2');
    expect(graphic.valuesFormatter(2)).toEqual('2e+0');

  });

  it('addScales creates scales', () => {

    const graphic = new GraphicContext();
    graphic.workspaceWidth = 100;
    graphic.workspaceHeight = 200;

    const look = new LookAndFeelSizing();

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

    // const boxes = util.serieToBoxes(ser, true);
    util.addScales(graphic, [ser], look, false);
    expect(graphic.xScale).toBeDefined();
    expect(graphic.yScale).toBeDefined();
    expect(graphic.colorScale).toBeDefined();

    expect(graphic.xScale).toBeInstanceOf(scaleLinear().constructor);
    expect(graphic.xScale.domain()).toEqual([0 - 0.5, 3 + 0.5]);


    expect(graphic.yScale(1)).toEqual(look.rowGap * 200 / 2);
    expect(graphic.yScale.bandwidth()).toEqual(200 - 200 * look.rowGap);
  });


  it('workspace height depends on rows number and lookandfeel', () => {

    const lookAndFeel = new LookAndFeelSizing();
    lookAndFeel.bigRowWidth = 10;
    lookAndFeel.midRowWidth = 5;
    lookAndFeel.smallRowWidth = 1;

    let data = [1, 2, 3, 4, 5];

    expect(util.calculateWorkspaceHeight(data, lookAndFeel)).toEqual(50);
    while (data.length < 30) {
      data = data.concat(data);
    }
    expect(util.calculateWorkspaceHeight(data, lookAndFeel)).toEqual(data.length * 5);

    while (data.length < 110) {
      data = data.concat(data);
    }
    expect(util.calculateWorkspaceHeight(data, lookAndFeel)).toEqual(data.length);

  });

  it('calculate dimensions sets sizes', () => {

    const lookAndFeel = new LookAndFeelSizing();
    lookAndFeel.vMargin = 2;
    lookAndFeel.hMargin = 1;

    const graphic = new GraphicContext();

    const data = [1, 2, 3, 4, 5];

    util.calculateDimensions(graphic, data, lookAndFeel);
    expect(graphic.pWidth).toEqual(500);
    expect(graphic.pHeight).toEqual(5 * 25 + 2 * 2);
    expect(graphic.workspaceWidth).toEqual(500 - 3 * 1);
    expect(graphic.workspaceHeight).toEqual(graphic.pHeight - 2 * 2);


  });

  it('addPaneAtributes sets pane', () => {

    const lookAndFeel = new LookAndFeelSizing();
    lookAndFeel.hMargin = 20;
    lookAndFeel.vMargin = 25;
    const graphic = new GraphicContext();

    const data = [1, 2, 3, 4, 5];

    util.calculateDimensions(graphic, data, lookAndFeel);

    util.addPaneAttributes(graphic, lookAndFeel);

    expect(graphic.viewBox).toEqual('0 0 500 175');
    expect(graphic.mainPaneTransform).toEqual('translate(40, 25)');


  });
});
