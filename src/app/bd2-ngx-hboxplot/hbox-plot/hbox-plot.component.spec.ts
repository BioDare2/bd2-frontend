import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import {HBoxPlotComponent} from './hbox-plot.component';
import {defualtLookAndFeel, LookAndFeel, GraphicContext} from './hbox-plot.dom';
import * as d3 from 'd3';
import {Selection} from 'd3-selection';
import {BD2ColorPalette} from '../hbox-utils/color-palette';
import {BoxDefinition} from '../hbox-utils/box-dom';
import {BoxUtil} from '../hbox-utils/box-util';

describe('HBoxPlotComponent', () => {
  let component: HBoxPlotComponent;
  let fixture: ComponentFixture<HBoxPlotComponent>;
  let lookAndFeel: LookAndFeel;
  let graphicContext: GraphicContext;
  const boxUtil = new BoxUtil();

  const getMains = (f: ComponentFixture<HBoxPlotComponent>) => {

    const svgN = fixture.nativeElement.querySelector('.hbox-plot svg');
    expect(svgN).toBeTruthy();

    if (svgN) {
      const svg = d3.select(svgN);
      const mainPane = svg.select('g.mainPane');
      return [svg, mainPane];
    }

    return null;
  };

  beforeEach(waitForAsync(() => {
    lookAndFeel = defualtLookAndFeel();
    graphicContext = new GraphicContext();
    TestBed.configureTestingModule({
      declarations: [HBoxPlotComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HBoxPlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('coloring', () => {

    it('colorBoxes adds colors from the palette', () => {

      graphicContext.palette = BD2ColorPalette.palette(5);
      const boxes: BoxDefinition[] = [];
      boxes.push(new BoxDefinition());
      boxes.push(new BoxDefinition());
      boxes[0].ix = 0;
      boxes[1].ix = 3;

      component.colorBoxes(boxes, graphicContext.palette);
      expect(boxes[0].color).toBe(graphicContext.palette[0]);
      expect(boxes[1].color).toBe(graphicContext.palette[3]);

    });

    it('updatePalette uses provided colro palette', () => {
      const pallete = ['red', 'green', 'blue'];
      const data = [[1], [2], [3], [4]];

      const ans = component.updatePalette(data, pallete, graphicContext);
      expect(ans.palette).toEqual(['red', 'green', 'blue', 'red']);
    });

    it('updatePalette can create default palette', () => {
      let pallete = [];
      const data = [[1], [2]];

      let ans = component.updatePalette(data, pallete, graphicContext);
      expect(ans.palette.length).toEqual(2);
      expect(ans.palette[1]).toBeTruthy();
      expect(ans.palette[1]).not.toEqual(ans.palette[0]);

      pallete = null;
      ans = component.updatePalette(data, pallete, graphicContext);
      expect(ans.palette.length).toEqual(2);
      expect(ans.palette[1]).toBeTruthy();
      expect(ans.palette[1]).not.toEqual(ans.palette[0]);
    });

    it('updatePalette emits colors used', fakeAsync(() => {

      const pallete = [];
      const data = [[1], [2]];

      let colors;
      component.colors.subscribe(a => colors = a, (e) => fail(e));

      const ans = component.updatePalette(data, pallete, graphicContext);
      tick();

      expect(colors).toBeTruthy();
      expect(colors).toEqual(ans.palette);
    }));

  });

  describe('Labels', () => {

    it('labels boxes with provided labels', () => {
      const boxes = boxUtil.dataToBoxes([[1], [2]]);
      const labels = ['A', 'B'];

      component.labelBoxes(boxes, labels);
      expect(boxes[0].label).toBe('A');
      expect(boxes[1].label).toBe('B');
    });

    it('labels boxes with numbers if missing labels', () => {
      let boxes = boxUtil.dataToBoxes([[1], [2]]);
      let labels = [];

      component.labelBoxes(boxes, labels);
      expect(boxes[0].label).toBe('1');
      expect(boxes[1].label).toBe('2');

      boxes = boxUtil.dataToBoxes([[1], [2]]);
      labels = null;
      component.labelBoxes(boxes, labels);
      expect(boxes[0].label).toBe('1');
      expect(boxes[1].label).toBe('2');

      boxes = boxUtil.dataToBoxes([[1], [2]]);
      labels = ['A'];
      component.labelBoxes(boxes, labels);
      expect(boxes[0].label).toBe('A');
      expect(boxes[1].label).toBe('2');

    });

    it('prepareLabels creates labels elements', fakeAsync(() => {
      const boxes = boxUtil.dataToBoxes([[1], [2]]);
      boxes[0].label = 'A';
      boxes[1].label = 'B';
      boxes[0].color = 'black';
      boxes[1].color = 'red';

      component.initSVG();
      graphicContext = component.preparePane(boxes, lookAndFeel, graphicContext);
      graphicContext = component.prepareScales(boxes, [12, 24], lookAndFeel, graphicContext);
      const mainPane = getMains(fixture)[1];

      graphicContext = component.prepareLabels(boxes, mainPane, lookAndFeel, graphicContext, 'trigger');

      // fake async is necesary as the legend is rendered with a delay
      tick(10);

      expect(graphicContext.labelsWrapper).toBeTruthy();

      expect(graphicContext.labelsWrapper.selectAll('g.yLabel').size()).toBe(2);
      const gLabel = graphicContext.labelsWrapper.select('g.yLabel');

      expect(gLabel.selectAll('rect.yTrigger').size()).toBe(1);
      expect(gLabel.selectAll('rect.yLabel').size()).toBe(1);
      expect(gLabel.selectAll('text').size()).toBe(1);
      expect(gLabel.selectAll('text').text()).toBe('A');
    }));

  });


  describe('Initialization', () => {

    it('calculates workspace height as multiple of data size', () => {

      const data: number[] = [];
      expect(component.calculateWorkspaceHeight(data, lookAndFeel)).toBe(0);

      data.push(1);
      data.push(2);
      expect(component.calculateWorkspaceHeight(data, lookAndFeel)).toBe(2 * lookAndFeel.rowWidth);

    });

    it('appends svg and mainPane element', () => {

      const data = [1];

      const svg = fixture.nativeElement.querySelector('.hbox-plot svg');
      expect(svg).toBeFalsy();

      component.initSVG();
      component.preparePane(data, lookAndFeel, graphicContext);

      const mains = getMains(fixture);
      expect(mains[0]).toBeTruthy();

      const mainPane = mains[1];
      expect(mainPane.size()).toBe(1);
    });

    it('changes height depending on data', () => {

      let data = [1];
      component.initSVG();
      component.preparePane(data, lookAndFeel, graphicContext);

      const svg = getMains(fixture)[0];
      const viewbox = svg.attr('viewBox');
      expect(viewbox).toBeTruthy();
      data = [1, 2];
      component.preparePane(data, lookAndFeel, graphicContext);

      const viewbox2 = svg.attr('viewBox');
      expect(viewbox2).toBeTruthy();
      expect(viewbox2).not.toEqual(viewbox);

    });

    it('updates lookAndFeel with workspace dimensions', () => {

      expect(graphicContext.workspaceHeight).toBeUndefined();
      expect(graphicContext.workspaceWidth).toBeUndefined();

      const data = [1];

      component.initSVG();
      graphicContext = component.preparePane(data, lookAndFeel, graphicContext);

      expect(graphicContext.workspaceHeight).toBeGreaterThan(10);
      expect(graphicContext.workspaceWidth).toBe(500 - lookAndFeel.hMarginL - lookAndFeel.hMarginR);

    });

    it('prepare scales creates scales functions', () => {

      const boxes = boxUtil.dataToBoxes([[1], [2]]);
      graphicContext.workspaceHeight = 100;
      graphicContext.workspaceWidth = 100;

      graphicContext = component.prepareScales(boxes, [12, 24], lookAndFeel, graphicContext);
      expect(graphicContext).toBeDefined();
      expect(graphicContext.xScale).toBeDefined();
      expect(graphicContext.xScale.domain()).toEqual([12, 24]);

      expect(graphicContext.yScale).toBeDefined();
      expect(graphicContext.yScale.domain()).toEqual(['1.', '2.']);
      expect(graphicContext.yScale.bandwidth()).toBeGreaterThan(0);

    });

    it('initAxisWrapper creates only one wrapper', () => {

      const data = [1];

      component.initSVG();
      graphicContext = component.preparePane(data, lookAndFeel, graphicContext);
      const mainPane = getMains(fixture)[1];

      let wrapper = component.initAxisWrapper(mainPane);
      const node1 = wrapper.node();

      wrapper = component.initAxisWrapper(mainPane);
      const node2 = wrapper.node();

      expect(node1).toBe(node2);
    });

    it('initAxisWrapper creates xAxis groups', () => {

      const data = [1];

      component.initSVG();
      graphicContext = component.preparePane(data, lookAndFeel, graphicContext);
      const mainPane = getMains(fixture)[1];

      const wrapper = component.initAxisWrapper(mainPane);
      expect(wrapper.selectAll('g.xTopAxis').size()).toBe(1);
      expect(wrapper.selectAll('g.xBottomAxis').size()).toBe(1);
      expect(wrapper.selectAll('g.yLeftAxis').size()).toBe(1);
      expect(wrapper.selectAll('g.yRightAxis').size()).toBe(1);
    });


  });

  describe('Initialized elements', () => {

    let mainPane: Selection<SVGGElement, any, null, undefined>;
    let data: BoxDefinition[];

    beforeEach(() => {

      const d = [[1]];

      data = boxUtil.dataToBoxes(d);
      component.initSVG();
      graphicContext = component.preparePane(data, lookAndFeel, graphicContext);
      graphicContext = component.prepareScales(data, [12, 24], lookAndFeel, graphicContext);
      mainPane = getMains(fixture)[1];
    });

    describe('tooltip', () => {
      it('prepareTooltip creates elements group', () => {

        graphicContext = component.prepareTooltip(mainPane, graphicContext);
        expect(graphicContext.tooltipWrapper).toBeTruthy();
        expect(graphicContext.tooltipBox).toBeTruthy();
        expect(graphicContext.tooltipText).toBeTruthy();
        // expect(graphicContext.tooltipWrapper.style("visibility")).toBe("hidden");
        expect(graphicContext.tooltipWrapper.style('display')).toBe('none');
      });

      it('showTooltip shows tooltip element', () => {

        graphicContext = component.prepareTooltip(mainPane, graphicContext);
        component.testGraphicContext(graphicContext);

        component.showTooltip(10, 20, data[0].key);

        // expect(graphicContext.tooltipWrapper.style("visibility")).toBe("visible");
        expect(graphicContext.tooltipWrapper.style('display')).not.toBe('none');
        expect(graphicContext.tooltipWrapper.style('display')).not.toBeNull();
        expect(graphicContext.tooltipText.text()).toBe('10');

      });

      it('hideTooltip tooltip hides group', () => {

        graphicContext = component.prepareTooltip(mainPane, graphicContext);
        component.testGraphicContext(graphicContext);

        // graphicContext.tooltipWrapper.style("visibility", "visible");
        // expect(graphicContext.tooltipWrapper.style("visibility")).toBe("visible");
        graphicContext.tooltipWrapper.style('display', null);
        expect(graphicContext.tooltipWrapper.style('display')).not.toBe('none');
        expect(graphicContext.tooltipWrapper.style('display')).not.toBeNull();
        component.hideTooltip();

        // expect(graphicContext.tooltipWrapper.style("visibility")).toBe("hidden");
        expect(graphicContext.tooltipWrapper.style('display')).toBe('none');

      });
    });

  });

  describe('Boxes', () => {

    let mainPane: Selection<SVGGElement, any, null, undefined>;
    let data: BoxDefinition[];
    let sort;

    beforeEach(() => {

      const d = [[20], [22]];

      data = boxUtil.dataToBoxes(d);
      data[0].mean = 20;
      data[0].median = 20.5;
      data[0].fstQnt = 19;
      data[0].thrdQnt = 21;
      data[0].lowWskr = 18.5;
      data[0].highWskr = 22;
      data[0].outliers = [15, 15.5, 16];

      component.initSVG();
      sort = component.sortFunction;
      graphicContext = component.preparePane(data, lookAndFeel, graphicContext);
      graphicContext = component.prepareScales(data, [12, 24], lookAndFeel, graphicContext);
      mainPane = getMains(fixture)[1];
      component.testGraphicContext(graphicContext);
    });

    it('creates box widgets', () => {
      graphicContext = component.plotDataBoxes(data, lookAndFeel, mainPane, graphicContext);

      expect(graphicContext.dataWrapper).toBeTruthy();
      expect(graphicContext.dataWrapper.selectAll('g.boxWidget').size()).toBe(2);
      const widget = graphicContext.dataWrapper.select('g.boxWidget');
      expect(widget.selectAll('g.whiskers').size()).toBe(1);
      expect(widget.selectAll('g.whiskers line').size()).toBe(4);

      expect(widget.selectAll('g.box').size()).toBe(1);
      expect(widget.selectAll('g.box rect').size()).toBe(1);
      expect(widget.selectAll('g.box line').size()).toBe(2);

      expect(widget.selectAll('g.outliers').size()).toBe(1);
      expect(widget.selectAll('g.outliers circle').size()).toBe(3);

    });

    it('positiones box widgets correctly', () => {
      graphicContext.xScale.domain([12, 24]).range([12, 24]);
      expect(graphicContext.xScale(20)).toBe(20);

      graphicContext = component.plotDataBoxes(data, lookAndFeel, mainPane, graphicContext);

      expect(graphicContext.dataWrapper).toBeTruthy();
      const widget = graphicContext.dataWrapper.select('g.boxWidget');
      expect(widget.select('g.whiskers line.whiskerlineL').attr('x1')).toEqual('18.5');
      expect(widget.select('g.whiskers line.whiskerlineL').attr('x2')).toEqual('19');
      expect(widget.select('g.whiskers line.whiskerlineR').attr('x1')).toEqual('21');
      expect(widget.select('g.whiskers line.whiskerlineR').attr('x2')).toEqual('22');
      expect(widget.select('g.whiskers line.whiskertipL').attr('x1')).toEqual('18.5');
      expect(widget.select('g.whiskers line.whiskertipL').attr('x2')).toEqual('18.5');
      expect(widget.select('g.whiskers line.whiskertipR').attr('x1')).toEqual('22');
      expect(widget.select('g.whiskers line.whiskertipR').attr('x2')).toEqual('22');

      expect(widget.select('g.box rect').attr('x')).toBe('19');
      expect(widget.select('g.box rect').attr('width')).toBe('' + (21 - 19));
      expect(widget.select('g.box line.medianline').attr('x1')).toBe('20.5');
      expect(widget.select('g.box line.meanline').attr('x1')).toBe('20');

      expect(widget.select('g.outliers circle').attr('cx')).toBe('15');

    });

    it('updates box widgets correctly', () => {
      graphicContext.xScale.domain([12, 24]).range([12, 24]);
      expect(graphicContext.xScale(20)).toBe(20);

      data[0].outliers = [];
      graphicContext = component.plotDataBoxes(data, lookAndFeel, mainPane, graphicContext);

      expect(graphicContext.dataWrapper).toBeTruthy();
      const widget = graphicContext.dataWrapper.select('g.boxWidget');

      const l1 = widget.select('g.whiskers line.whiskerlineL').node();
      const l2 = widget.select('g.whiskers line.whiskertipL').node();
      const rect = widget.select('g.box rect').node();
      const mean = widget.select('g.box line.meanline').node();
      const med = widget.select('g.box line.medianline').node();

      const d = [[20], [22]];

      data = boxUtil.dataToBoxes(d);
      data[0].mean = 20 + 1;
      data[0].median = 20.5 + 1;
      data[0].fstQnt = 19 + 1;
      data[0].thrdQnt = 21 + 1;
      data[0].lowWskr = 18.5 + 1;
      data[0].highWskr = 22 + 1;
      data[0].outliers = [15 + 1];

      graphicContext = component.plotDataBoxes(data, lookAndFeel, mainPane, graphicContext);
      expect(widget.select('g.whiskers line.whiskerlineL').node()).toBe(l1);
      expect(widget.select('g.whiskers line.whiskertipL').node()).toBe(l2);
      expect(widget.select('g.box rect').node()).toBe(rect);
      expect(widget.select('g.box line.meanline').node()).toBe(mean);
      expect(widget.select('g.box line.medianline').node()).toBe(med);


      expect(widget.select('g.whiskers line.whiskerlineL').attr('x1')).toEqual('19.5');
      expect(widget.select('g.whiskers line.whiskerlineL').attr('x2')).toEqual('20');
      expect(widget.select('g.whiskers line.whiskerlineR').attr('x1')).toEqual('22');
      expect(widget.select('g.whiskers line.whiskerlineR').attr('x2')).toEqual('23');
      expect(widget.select('g.whiskers line.whiskertipL').attr('x1')).toEqual('19.5');
      expect(widget.select('g.whiskers line.whiskertipL').attr('x2')).toEqual('19.5');
      expect(widget.select('g.whiskers line.whiskertipR').attr('x1')).toEqual('23');
      expect(widget.select('g.whiskers line.whiskertipR').attr('x2')).toEqual('23');

      expect(widget.select('g.box rect').attr('x')).toBe('20');
      expect(widget.select('g.box rect').attr('width')).toBe('' + (22 - 20));
      expect(widget.select('g.box line.medianline').attr('x1')).toBe('21.5');
      expect(widget.select('g.box line.meanline').attr('x1')).toBe('21');

      expect(widget.select('g.outliers circle').attr('cx')).toBe('16');

    });


  });

  describe('axis', () => {

    let mainPane: Selection<SVGGElement, any, null, undefined>;
    let data: BoxDefinition[];

    beforeEach(() => {

      const d = [[1]];

      data = boxUtil.dataToBoxes(d);
      component.initSVG();

      graphicContext = component.preparePane(data, lookAndFeel, graphicContext);
      graphicContext = component.prepareScales(data, [12, 24], lookAndFeel, graphicContext);

      mainPane = getMains(fixture)[1];
      graphicContext.axisWrapper = component.initAxisWrapper(mainPane);

    });

    it('plotHorizontalScales places x axis in correct positions', () => {

      graphicContext = component.plotHorizontalScales([12, 24], lookAndFeel, graphicContext);

      expect(graphicContext.xScale).toBeTruthy();
      expect(graphicContext.xScale.domain()).toEqual([12, 24]);

      expect(graphicContext.xTopAxis).toBeTruthy();
      const tx = graphicContext.axisWrapper.select('g.xTopAxis');
      expect(tx.attr('transform')).toBeNull();
      expect(tx.selectAll('path').size()).toBe(1);
      expect(tx.selectAll('.tick text').size()).toBeGreaterThan(2);
      // let currentx = d3.transform(g.attr("transform")).translate[0];

      expect(graphicContext.workspaceHeight).toBeGreaterThan(0);
      expect(graphicContext.xBottomAxis).toBeTruthy();
      const bx = graphicContext.axisWrapper.select('g.xBottomAxis');
      expect(bx.selectAll('path').size()).toBe(1);
      expect(bx.selectAll('.tick text').size()).toBeGreaterThan(2);
      expect(bx.attr('transform')).toEqual('translate(0,' + graphicContext.workspaceHeight + ')');

    });

    it('plotVerticalScales places y axis in correct positions', () => {

      graphicContext = component.plotVerticalScales(data, lookAndFeel, graphicContext);

      expect(graphicContext.yScale).toBeTruthy();
      expect(graphicContext.yScale.domain()).toEqual(['1.']);

      expect(graphicContext.yLeftAxis).toBeTruthy();
      const ly = graphicContext.axisWrapper.select('g.yLeftAxis');
      expect(ly.attr('transform')).toBeNull();
      expect(ly.selectAll('path').size()).toBe(1);
      expect(ly.selectAll('.tick text').size()).toBe(1);

      expect(graphicContext.workspaceWidth).toBeGreaterThan(0);
      expect(graphicContext.yLeftAxis).toBeTruthy();
      const ry = graphicContext.axisWrapper.select('g.yRightAxis');
      expect(ry.selectAll('path').size()).toBe(1);
      expect(ry.selectAll('.tick text').size()).toBe(0);
      expect(ry.attr('transform')).toEqual('translate(' + graphicContext.workspaceWidth + ',0)');


    });


  });
});
