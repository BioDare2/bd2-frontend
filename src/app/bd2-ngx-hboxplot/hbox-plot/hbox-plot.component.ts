import {
  Component, OnInit, Input, AfterViewInit, OnChanges, OnDestroy, NgZone, ChangeDetectorRef,
  ElementRef, SimpleChanges, ChangeDetectionStrategy, EventEmitter, Output
} from '@angular/core';
import * as d3 from 'd3';

import {Selection} from 'd3';
import {defualtLookAndFeel, GraphicContext, LookAndFeel, offsetScaleValue} from './hbox-plot.dom';
import {BoxDefinition} from '../hbox-utils/box-dom';
import {BoxUtil} from '../hbox-utils/box-util';
import {BD2ColorPalette} from '../hbox-utils/color-palette';
import {SmartRounder} from '../hbox-utils/smart-rounding';





@Component({
  selector: 'bd2-ngx-hbox-plot',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="hbox-plot" [hidden]="hidden"></div>
  `,
  styles: [
      `
      :host ::ng-deep .axisWrapper path {
        stroke: gray;
      }

      :host ::ng-deep .axisWrapper line {
        stroke: gray;
      }

      :host ::ng-deep .axisWrapper text {
        fill: gray;
      }
    `
  ]
})
export class HBoxPlotComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  /**
   * Necessary to control hiding of the element, otherwise the BBoxes are not defined and labels
   * were not rendered in correct places.
   *
   */
  @Input()
  hidden = false;


  @Input()
  data: number[][] = [];

  @Input()
  removed: number[] = [];

  @Input()
  domain: number[] = [17, 36];

  @Input()
  palette: string[] = [];

  @Input()
  labels: string[] = [];

  @Input()
  labelsOn = 'always'; // trigger //null

  @Input()
  lookAndFeel = defualtLookAndFeel();

  @Input() // median, label, null
  set sorted(sorting: string) {

    if (sorting === 'median') {
      this.sortFunction = (b1: BoxDefinition, b2: BoxDefinition) => b1.median - b2.median;
    } else if (sorting === 'label') {
      // console.log("N",navigator.language);
      /*if (navigator.language) {
       this.sortFunction = (b1: BoxDefinition, b2: BoxDefinition) =>
       b1.label.localeCompare(b2.label, navigator.language, {sensitivity: 'case'});
       } else {
       this.sortFunction = (b1: BoxDefinition, b2: BoxDefinition) => b1.label.localeCompare(b2.label);
       };*/
      this.sortFunction = (b1: BoxDefinition, b2: BoxDefinition) => {
        if (b1.label === b2.label) {
          return 0;
        }
        if (b1.label < b2.label) {
          return -1;
        }
        return 1;
      };
    } else {
      this.sortFunction = (b1: BoxDefinition, b2: BoxDefinition) => b1.ix - b2.ix;
    }
  }


  sortChanged = false;

  @Output()
  colors = new EventEmitter<string[]>();

  private d3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  // private removedSVG: Selection<SVGSVGElement, any, null, undefined>;

  private mainPane: Selection<SVGGElement, any, null, undefined>;

  private graphicContext = new GraphicContext();
  private boxUtil = new BoxUtil();

  sortFunction = function(b1: BoxDefinition, b2: BoxDefinition) {
    return b1.ix - b2.ix;
  };


  constructor(private ngZone: NgZone, private changeDetectorRef: ChangeDetectorRef, element: ElementRef) {
    this.d3 = d3;
    this.parentNativeElement = element.nativeElement;

  }

  /**
   * It is detached from angular to prevent unnecessary change detection
   */
  ngAfterViewInit() {
    this.changeDetectorRef.detach();
    // console.log("AFI");
  }

  /**
   * Explicit triggers re-drawing as need to have all the parameters set (so will not redrawn if data came frist and domain later)
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {

    // console.log("Changes", changes);

    // otherwise the hidden on inner div was not updated
    this.changeDetectorRef.detectChanges();


    this.initSVG();

    // this.handleHiding();

    if (!this.data) {
      return;
    }

    this.sortChanged = changes['sorted'] !== undefined;

    if (!this.hidden) {
      this.updatePlot();
    }
  }

  isDataUpdate(changes: any): boolean {

    return (changes.data || changes.removed || changes.domain || changes.palette || changes.labels );
  }

  initSVG() {
    if (!this.d3Svg) {
      const d3ParentElement = this.d3.select(this.parentNativeElement);
      this.d3Svg = d3ParentElement.select('.hbox-plot').append('svg');
      this.d3Svg.attr('width', '0');
    }
  }

  ngOnInit() {

    if (this.parentNativeElement !== null) {


    } else {
      console.error('Missing parrent element for the component');
    }
  }

  ngOnDestroy() {
    if (this.d3Svg && this.d3Svg.empty && !this.d3Svg.empty()) {
      this.d3Svg.selectAll('*').remove();
    }
  }

  /**
   * Only for testing
   * @param context
   */
  testGraphicContext(context: GraphicContext) {
    this.graphicContext = context;
  }

  /* Not needed any more, the hidding is achieved by simple div hidden attribute
   // and the problem with labels background rendering is solved using delayed rendering with a timer.
   handleHiding() {
   if (this.hidden) {
   this.removed = this.d3Svg.remove();
   } else {
   if (this.removed) {
   this.d3.select(this.parentNativeElement)
   .select('.hbox-plot')
   .append(() => this.d3Svg.node());
   this.removed = undefined;
   }
   }

   }*/

  updatePlot() {

    // this.graphicContext.transitionTime = this.lookAndFeel.transitionTime;

    if (this.lookAndFeel.transitionTime > 0) {
      this.graphicContext.transitionOn = true;
      this.ngZone.runOutsideAngular(() => {
        this.graphicContext.transition = (this.d3 as any).transition().duration(this.lookAndFeel.transitionTime);
      });
    } else {
      this.graphicContext.transitionOn = false;
      this.graphicContext.transition = undefined;
    }

    this.graphicContext = this.updatePalette(this.data, this.palette, this.graphicContext);

    let boxes = this.prepareDataModel(this.data, this.removed, this.labels, this.graphicContext.palette,
      this.domain, this.sortFunction);

    boxes = boxes.filter(b => !b.hidden);

    this.graphicContext = this.preparePane(boxes, this.lookAndFeel, this.graphicContext);

    this.graphicContext = this.prepareScales(boxes, this.domain, this.lookAndFeel, this.graphicContext);

    this.graphicContext = this.plotAxisBox(boxes, this.domain, this.lookAndFeel, this.mainPane, this.graphicContext);


    this.graphicContext = this.plotDataBoxes(boxes, this.lookAndFeel, this.mainPane, this.graphicContext);

    this.graphicContext = this.prepareTooltip(this.mainPane, this.graphicContext);

    this.graphicContext = this.prepareLabels(boxes, this.mainPane, this.lookAndFeel, this.graphicContext, this.labelsOn);

  }

  prepareDataModel(data: number[][], removed: number[], labels: string[], palette: string[], domain: number[],
                   sortFunction: (b1: BoxDefinition, b2: BoxDefinition) => number): BoxDefinition[] {

    let boxes = this.boxUtil.dataToBoxes(data);

    this.boxUtil.mockEmptyValues(boxes, domain[1]);
    this.labelBoxes(boxes, labels);

    this.colorBoxes(boxes, palette);

    removed.forEach(ix => {
      if (boxes[ix]) {
        boxes[ix].hidden = true;
      }
    });

    boxes = boxes.sort(sortFunction);
    return boxes;

  }


  updatePalette(data: any[], palette: string[], graphicContext: GraphicContext): GraphicContext {

    if (!palette || palette.length === 0) {
      graphicContext.palette = BD2ColorPalette.palette(data.length);
    } else {
      graphicContext.palette = BD2ColorPalette.extendPalette(palette, data.length);

    }
    this.colors.next(graphicContext.palette.slice());

    return graphicContext;
  }

  colorBoxes(boxes: BoxDefinition[], palette: string[]) {
    boxes.forEach(b => b.color = palette[b.ix]);
  }


  preparePane(data: any[], lookAndFeel: LookAndFeel, graphicContext: GraphicContext): GraphicContext {

    // console.log("PP",data);

    if (!this.mainPane) {
      // let d3ParentElement = this.d3.select(this.parentNativeElement);
      // this.d3Svg = d3ParentElement.select('.hbox-plot').append<SVGSVGElement>('svg');
      this.d3Svg.attr('width', '100%');

      this.mainPane = this.d3Svg.append<SVGGElement>('g');
      this.mainPane.classed('mainPane', true);

    }

    const pWidth = 500;
    const pHeight = this.calculateWorkspaceHeight(data, lookAndFeel) + 2 * lookAndFeel.vMargin;

    const elm = (graphicContext.transitionOn ? this.d3Svg.transition(graphicContext.transition) : this.d3Svg);
    elm.attr('viewBox', '0 0 ' + pWidth + ' ' + pHeight);
    this.mainPane.attr('transform', 'translate(' + lookAndFeel.hMarginL + ',' + lookAndFeel.vMargin + ')');
    // .attr('transform', 'translate(' + (pWidth / 2) + ',' + (pHeight / 2) + ')'); //moves 0,0 of the pain to the middle of the graphics

    graphicContext.workspaceWidth = pWidth - lookAndFeel.hMarginL - lookAndFeel.hMarginR;
    graphicContext.workspaceHeight = pHeight - 2 * lookAndFeel.vMargin;

    return graphicContext;

  }

  calculateWorkspaceHeight(data: any[], lookAndFeel: LookAndFeel) {
    return lookAndFeel.rowWidth * data.length;

  }


  labelBoxes(boxes: BoxDefinition[], labels: string[]) {
    if (!labels) {
      labels = [];
    }


    boxes.forEach((b, ix) => {
      b.label = labels[ix] ? labels[ix] : '' + (ix + 1);
    });
  }

  prepareLabels(boxes: BoxDefinition[], mainPane: Selection<SVGGElement, any, null, undefined>, lookAndFeel: LookAndFeel,
                graphicContext: GraphicContext, labelsOn: string): GraphicContext {

    if (!graphicContext.labelsWrapper) {
      graphicContext.labelsWrapper = mainPane.append<SVGGElement>('g')
        .classed('labelsWrapper', true);
    }

    if (!graphicContext.backLabelsWrapper) {
      graphicContext.backLabelsWrapper = mainPane.insert<SVGGElement>('g', 'g.dataWrapper')
        .classed('backLabelsWrapper', true);
    }

    const backLabelsOn = labelsOn === 'always';
    const mainLabelsOn = labelsOn === 'always' || labelsOn === 'trigger';


    const labels = graphicContext.labelsWrapper.selectAll('g.yLabel')
      .data(mainLabelsOn ? boxes : [], (d: BoxDefinition) => d.key);

    labels.exit().remove();

    const newLabels = labels.enter()
      .append<SVGGElement>('g')
      .classed('yLabel', true);

    this.ngZone.runOutsideAngular(() => {
      newLabels.on('mouseover', function(evnt: MouseEvent, d: BoxDefinition) {
        d3.select(this)
          .selectAll('.yLabel')
          // .style("visibility", "visible");
          .style('display', null);
      }).on('mouseout', function() {
        d3.select(this)
          .selectAll('.yLabel')
          // .style("visibility", "hidden");
          .style('display', 'none');
      });
    });

    newLabels.append<SVGGElement>('rect')
      .attr('class', 'yTrigger')
      .style('fill-opacity', 1)
    ;

    newLabels.append<SVGGElement>('rect')
      .attr('class', 'yLabel')
      .style('fill-opacity', 0.35)
      // .style("visibility", "hidden");
      .style('display', 'none');


    newLabels.append<SVGGElement>('text')
      .attr('class', 'yLabel')
      .attr('text-anchor', 'left')
      .attr('dominant-baseline', 'central')
      .style('font-size', lookAndFeel.labelFont)
      .style('opacity', 1)
      .attr('x', 5)
    // .style("visibility", "hidden");
    // .style("display", "none");
    ;

    const backLabels = graphicContext.backLabelsWrapper.selectAll('g.yLabel')
      .data(backLabelsOn ? boxes : [], (d: BoxDefinition) => d.key);

    backLabels.exit().remove();

    const newBackLabels = backLabels.enter()
      .append<SVGGElement>('g')
      .classed('yLabel', true);

    /*
     newBackLabels.append<SVGGElement>("rect")
     .attr("class", "yLabel")
     .style("fill-opacity", 0.05);
     */

    newBackLabels.append<SVGGElement>('text')
      .attr('class', 'yLabel')
      .attr('text-anchor', 'left')
      .attr('dominant-baseline', 'central')
      .style('font-size', lookAndFeel.labelFont)
      .style('opacity', lookAndFeel.backLabelOpacity)
      .attr('x', 5);
    // .style("visibility", "hidden");


    const enterUpdate: Selection<SVGSVGElement, BoxDefinition, null, undefined> =
      newLabels.merge(labels as any) as Selection<SVGSVGElement, BoxDefinition, null, undefined>;

    const backEnterUpdate: Selection<SVGSVGElement, BoxDefinition, null, undefined> =
      newBackLabels.merge(backLabels as any) as Selection<SVGSVGElement, BoxDefinition, null, undefined>;

    // called with delay to allow, parent divs to component sets their visibility, otherwise the bboxes cannot be calculated
    // and the labels backgrounds and trigers are not rendered correctly
    // it is a hack, but don't know how to do it correctly
    // timers have to be cleared as otherwise saw errors in logs for fast changing input data (like cause by sorting and pagination)
    graphicContext.labelsTimers.forEach( timer => clearTimeout(timer));
    graphicContext.labelsTimers = [];
    const timer = setTimeout(() => {


      const bboxes: SVGRect[] = [];

      enterUpdate.select<SVGSVGElement>('text')
        .style('display', null)
        .attr('y', d => graphicContext.yScale(d.key) + graphicContext.yScale.bandwidth() / 2)
        .text(d => d.label)
        .each(function(d) {
          bboxes.push(this.getBBox());
          // console.log("D: " + d.label, this.getBBox());
        })
        .style('display', 'none');


      let elm = backEnterUpdate.select<SVGSVGElement>('text');
      elm = (graphicContext.transitionOn ? elm.transition(graphicContext.transition) : elm) as any;
      elm
        .attr('y', d => graphicContext.yScale(d.key) + graphicContext.yScale.bandwidth() / 2)
        .text(d => d.label)
      // .style("fill", d => d.color)
      /*.each(function (d) {
       bboxes.push(this.getBBox());
       //console.log("D: " + d.label, this.getBBox());
       });*/
      ;

      const trigers = enterUpdate.select<SVGSVGElement>('.yTrigger')
        .style('fill', d => d.color)
        .style('stroke', d => d.color);


      let telm = trigers.data(bboxes);
      telm = (graphicContext.transitionOn ? telm.transition(graphicContext.transition) : telm) as any;
      telm
        .attr('x', -7)
        .attr('y', b => b.y - 3)
        .attr('width', b => 7)
        .attr('height', b => b.height + 6);

      const frames = enterUpdate.select<SVGSVGElement>('rect.yLabel')
        .style('fill', d => d.color)
        .style('fill-opacity', lookAndFeel.labelFillOpacity);

      frames.data(bboxes)
        .attr('x', 0)
        .attr('y', b => b.y - 3)
        .attr('width', b => b.width + 10)
        .attr('height', b => b.height + 7);


      /*
       let backFrames = backEnterUpdate.select<SVGSVGElement>("rect.yLabel")
       .style("fill", d => d.color);

       backFrames.data(bboxes)
       .attr("x", 0)
       .attr("y", b => b.y - 3)
       .attr("width", b => b.width + 10)
       .attr("height", b => b.height + 7);
       */

    }, 10);

    graphicContext.labelsTimers.push(timer);
    return graphicContext;
  }


  prepareTooltip(mainPane: Selection<SVGGElement, any, null, undefined>, graphicContext: GraphicContext): GraphicContext {

    if (graphicContext.tooltipWrapper) {
      return graphicContext;
    }

    graphicContext.tooltipWrapper = mainPane.append<SVGGElement>('g')
      .classed('tooltipWrapper', true);

    graphicContext.tooltipBox = graphicContext.tooltipWrapper.append<SVGGElement>('rect')
      .style('fill', 'white')
      .style('fill-opacity', 0.8)
      .style('stroke', 'grey')
    // .style("visibility", "hidden");
    ;

    graphicContext.tooltipText = graphicContext.tooltipWrapper.append<SVGGElement>('text')
      .attr('class', 'tooltip')
      // .attr("text-anchor", "left")
      .attr('text-anchor', 'middle')
      // .attr("alignment-baseline", "middle")
      // .attr("alignment-baseline", "baseline")
      // .attr("dy", "-10px")
      .style('opacity', 1)
    // .attr("dx", "0.35em")
    // .style("font-size", this.lookAndFeel.tooltipFontSize) //"11px")
    // .style("opacity", 0)
    ;

    graphicContext.tooltipWrapper
    // .style("visibility", "hidden");
      .style('display', 'none');

    return graphicContext;
  }

  showTooltip(v: number, x: any, y: any) {
    // console.log("Show: " + v + ";" + this.constructor.name);
    // console.log('Show: ' + v + '; ' + x + ': ' + y);
    // console.log('v', SmartRounder.round(v));
    // console.log('x', this.graphicContext.xScale(x));
    // console.log('y', this.graphicContext.yScale(y));

    if (!this.graphicContext.tooltipText) {
      return;
    }

    this.graphicContext.tooltipText
      .attr('x', this.graphicContext.xScale(x))
      .attr('y', this.graphicContext.yScale(y))
      .text(SmartRounder.round(v))
    // .transition().duration(this.lookAndFeel.baseTransitionsTime / 2)
    // .style('opacity', 1);
    ;

    // I have to change the display here even before the box is ready as
    // in firefox the getBBox was not working if called with display none
    // giving NS_ERROR_FAILURE 2147500037
    this.graphicContext.tooltipWrapper
      // .style("visibility", "visible");
      .style('display', null);

    const bbox = this.graphicContext.tooltipText.node().getBBox();

    this.graphicContext.tooltipBox
      .attr('x', bbox.x - 3)
      .attr('y', bbox.y - 2)
      .attr('width', bbox.width + 6)
      .attr('height', bbox.height + 4);




  }

  hideTooltip() {
    // console.log("Hide: ");
    if (!this.graphicContext.tooltipText) {
      return;
    }


    this.graphicContext.tooltipWrapper
    // .style("visibility", "hidden");
      .style('display', 'none');


    // this.graphicContext.tooltipText
    // .transition().duration(this.lookAndFeel.baseTransitionsTime / 2)
    // .style("opacity", 0);
  }

  prepareScales(data: BoxDefinition[], domain: number[], lookAndFeel: LookAndFeel,
                graphicContext: GraphicContext): GraphicContext {

    if (!graphicContext.xScale) {
      graphicContext.xScale = d3.scaleLinear()
        .clamp(true);
    }

    graphicContext.xScale
      .domain(domain)
      .range([0, graphicContext.workspaceWidth]);

    if (!graphicContext.yScale) {
      graphicContext.yScale = d3.scaleBand()
        .padding(lookAndFeel.rowGap)
      ;
    }

    const domainY = data.map((d) => d.key);

    graphicContext.yScale
      .domain(domainY)
      .range([0, graphicContext.workspaceHeight]);


    return graphicContext;
  }

  plotAxisBox(data: BoxDefinition[], domain: number[], lookAndFeel: LookAndFeel, mainPane: Selection<SVGGElement, any, null, undefined>,
              graphicContext: GraphicContext): GraphicContext {

    if (!graphicContext.axisWrapper) {
      graphicContext.axisWrapper = this.initAxisWrapper(mainPane);
    }

    graphicContext = this.plotHorizontalScales(domain, lookAndFeel, graphicContext);
    graphicContext = this.plotVerticalScales(data, lookAndFeel, graphicContext);

    return graphicContext;

  }

  initAxisWrapper(mainPane: Selection<SVGGElement, any, null, undefined>): Selection<SVGGElement, any, null, undefined> {

    let wrapper = mainPane.select<SVGGElement>('.axisWrapper');
    if (wrapper.size() === 0) {
      wrapper = mainPane.append<SVGGElement>('g').attr('class', 'axisWrapper');

      wrapper.append('g').attr('class', 'xTopAxis');
      wrapper.append('g').attr('class', 'xBottomAxis');
      wrapper.append('g').attr('class', 'yLeftAxis');
      wrapper.append('g').attr('class', 'yRightAxis');

    }
    return wrapper;
  }

  plotHorizontalScales(domain: number[], lookAndFeel: LookAndFeel, graphicContext: GraphicContext): GraphicContext {


    if (!graphicContext.xTopAxis) {
      graphicContext.xTopAxis = d3.axisTop(graphicContext.xScale);
    }

    if (!graphicContext.xBottomAxis) {
      graphicContext.xBottomAxis = d3.axisBottom(graphicContext.xScale);
    }


    let elmT = graphicContext.axisWrapper.select('g.xTopAxis')  as any;
    elmT.call(graphicContext.xTopAxis);

    let elmB = graphicContext.axisWrapper.select('g.xBottomAxis') as any;
    elmB = (graphicContext.transitionOn ? elmB.transition(graphicContext.transition) : elmB);
    elmB
      .attr('transform', 'translate(0,' + graphicContext.workspaceHeight + ')')
      .call(graphicContext.xBottomAxis);

    return graphicContext;

  }

  plotVerticalScales(data: BoxDefinition[], lookAndFeel: LookAndFeel, graphicContext: GraphicContext): GraphicContext {


    if (!graphicContext.yLeftAxis) {
      graphicContext.yLeftAxis = d3.axisLeft(graphicContext.yScale)
        .tickFormat(() => '')
      ;
    }

    if (!graphicContext.yRightAxis) {
      graphicContext.yRightAxis = d3.axisRight(graphicContext.yScale)
        .tickValues([])
      ;
    }

    let elm = graphicContext.axisWrapper.select('g.yLeftAxis') as any;
    elm = (graphicContext.transitionOn ? elm.transition(graphicContext.transition) : elm);
    elm
      .call(graphicContext.yLeftAxis);


    elm = graphicContext.axisWrapper.select('g.yRightAxis')
      .attr('transform', 'translate(' + graphicContext.workspaceWidth + ',0)') as any;
    elm = (graphicContext.transitionOn ? elm.transition(graphicContext.transition) : elm);
    elm
      .call(graphicContext.yRightAxis);

    return graphicContext;

  }


  plotDataBoxes(boxes: BoxDefinition[], lookAndFeel: LookAndFeel, mainPane: Selection<SVGGElement, any, null, undefined>,
                graphicContext: GraphicContext): GraphicContext {

    if (!graphicContext.dataWrapper) {
      graphicContext.dataWrapper = mainPane.append<SVGGElement>('g').attr('class', 'dataWrapper');
    }



    let boxWidgets = graphicContext.dataWrapper.selectAll('.boxWidget') as Selection<SVGGElement, BoxDefinition, null, undefined>;

    boxWidgets = boxWidgets.data(boxes, d => d.key);


    this.updateBoxWidgets(boxWidgets, lookAndFeel, graphicContext);

    const newBoxWidgets = boxWidgets.enter()
      .append<SVGGElement>('g').attr('class', 'boxWidget');


    this.createBoxWidgets(newBoxWidgets, lookAndFeel, graphicContext);

    boxWidgets.exit().remove();


    return graphicContext;
  }

  updateBoxWidgets(boxWidgets: Selection<SVGGElement, BoxDefinition, null, undefined>,
                   lookAndFeel: LookAndFeel, graphicContext: GraphicContext) {

    // this.ngZone.runOutsideAngular(() => {

    boxWidgets.select('rect.backdrop')
      .call(this.positionBackdrop, graphicContext);

    this.updateWhiskers(boxWidgets.select('g.whiskers') as any, graphicContext);

    boxWidgets.select('g.box rect')
      .call(this.positionBoxRectangle, graphicContext);

    boxWidgets.select('g.box line.medianline')
      .call(this.positionMedianLine, graphicContext);

    boxWidgets.select('g.box line.meanline')
      .call(this.positionMeanLine, graphicContext);

    const out = boxWidgets.select('g.outliers').selectAll('.outlier')
      .data(d => d.outliers.map(x => [x, d.key, d.color]));

    out.enter()
      .call(this.createOutlier, lookAndFeel, graphicContext, this.positionOutlier);

    out.call(this.positionOutlier, graphicContext);

    out.exit().remove();

    // });

  }


  positionBackdrop(elm: Selection<SVGGElement, BoxDefinition, null, undefined>, graphicContext: GraphicContext) {

    elm = (graphicContext.transitionOn ? elm.transition(graphicContext.transition) : elm) as any;
    elm
      .attr('x', (d) => offsetScaleValue(d.lowWskr, -5, graphicContext.xScale))
      .attr('y', (d) => {
        return graphicContext.yScale(d.key);
      })
      .attr('width', (d) => {
        const x1 = offsetScaleValue(d.lowWskr, -5, graphicContext.xScale);
        const x2 = offsetScaleValue(d.highWskr, +5, graphicContext.xScale);
        return x2 - x1;
      })
      .attr('height', (d) => {
        return graphicContext.yScale.bandwidth();
      })
    // .style("stroke", d => d.color)
    // .style("fill", d => d.color)
    ;

  }

  positionBoxRectangle(elm: Selection<SVGGElement, BoxDefinition, null, undefined>, graphicContext: GraphicContext) {

    elm = (graphicContext.transitionOn ? elm.transition(graphicContext.transition) : elm) as any;
    elm
      .attr('x', (d) => graphicContext.xScale(d.fstQnt))
      .attr('y', (d) => {
        return graphicContext.yScale(d.key);
      })
      .attr('width', (d) => (graphicContext.xScale(d.thrdQnt) - graphicContext.xScale(d.fstQnt)))
      .attr('height', (d) => {
        return graphicContext.yScale.bandwidth();
      })
      .style('stroke', d => d.color)
      .style('fill', d => d.color);

  }

  positionMedianLine(elm: Selection<SVGGElement, BoxDefinition, null, undefined>, graphicContext: GraphicContext) {

    elm = (graphicContext.transitionOn ? elm.transition(graphicContext.transition) : elm) as any;
    elm
      .attr('x1', (d, i) => graphicContext.xScale(d.median))
      .attr('y1', (d, i) => graphicContext.yScale(d.key))
      .attr('x2', (d, i) => graphicContext.xScale(d.median))
      .attr('y2', (d, i) => graphicContext.yScale(d.key) + graphicContext.yScale.bandwidth())
      .style('stroke', d => d.color)
      // .style("visibility", d => d.mean === d.median ? "hidden" : "visible");
      .style('display', d => d.mean === d.median ? 'none' : null);



  }

  positionMeanLine(elm: Selection<SVGGElement, BoxDefinition, null, undefined>, graphicContext: GraphicContext) {

    elm = (graphicContext.transitionOn ? elm.transition(graphicContext.transition) : elm) as any;
    elm
      .attr('x1', (d, i) => graphicContext.xScale(d.mean))
      .attr('y1', (d, i) => graphicContext.yScale(d.key))
      .attr('x2', (d, i) => graphicContext.xScale(d.mean))
      .attr('y2', (d, i) => graphicContext.yScale(d.key) + graphicContext.yScale.bandwidth())
      .style('stroke', d => d.color);
  }

  positionOutlier(elm: Selection<SVGGElement, any, null, undefined>, graphicContext: GraphicContext) {

    elm = (graphicContext.transitionOn ? elm.transition(graphicContext.transition) : elm) as any;
    elm.attr('cx', d => graphicContext.xScale(d[0]))
      .attr('cy', d => graphicContext.yScale(d[1]) + graphicContext.yScale.bandwidth() / 2)
      .style('stroke', d => d[2])
      .style('fill', d => d[2]);

  }


  createOutlier(elm: Selection<SVGGElement, any, null, undefined>, lookAndFeel: LookAndFeel, graphicContext: GraphicContext,
                positionOutlierFunction: (elm: Selection<SVGGElement, any, null, undefined>, graphicContext: GraphicContext) => {}) {


    elm
      .append<SVGGElement>('circle')
      .attr('class', 'outlier')
      .attr('r', lookAndFeel.outliersCircleRadius)
      .style('stroke-width', lookAndFeel.outliersStrokeWidth)
      .style('fill-opacity', lookAndFeel.outliersFillOpacity)
      .call(positionOutlierFunction, graphicContext)
    ;

  }

  positionWhiskerLine(elm: Selection<SVGGElement, BoxDefinition, null, undefined>, left: boolean, graphicContext: GraphicContext) {

    elm = (graphicContext.transitionOn ? elm.transition(graphicContext.transition) : elm) as any;
    elm
      .attr('x1', (d, i) => left ? graphicContext.xScale(d.lowWskr) : graphicContext.xScale(d.thrdQnt))
      .attr('y1', (d, i) => graphicContext.yScale(d.key) + graphicContext.yScale.bandwidth() / 2)
      .attr('x2', (d, i) => left ? graphicContext.xScale(d.fstQnt) : graphicContext.xScale(d.highWskr))
      .attr('y2', (d, i) => graphicContext.yScale(d.key) + graphicContext.yScale.bandwidth() / 2)
      .style('stroke', d => d.color)
      // .style("visibility", d => (left && (d.lowWskr === d.fstQnt)) || (!left && (d.highWskr === d.thrdQnt)) ? "hidden" : "visible");
      .style('display', d => (left && (d.lowWskr === d.fstQnt)) || (!left && (d.highWskr === d.thrdQnt)) ? 'none' : null);


  }

  positionWhiskerTip(elm: Selection<SVGGElement, BoxDefinition, null, undefined>, left: boolean, graphicContext: GraphicContext) {

    elm = (graphicContext.transitionOn ? elm.transition(graphicContext.transition) : elm) as any;
    elm
      .attr('x1', (d, i) => left ? graphicContext.xScale(d.lowWskr) : graphicContext.xScale(d.highWskr))
      .attr('y1', (d, i) => graphicContext.yScale(d.key))
      .attr('x2', (d, i) => left ? graphicContext.xScale(d.lowWskr) : graphicContext.xScale(d.highWskr))
      .attr('y2', (d, i) => graphicContext.yScale(d.key) + graphicContext.yScale.bandwidth())
      .style('stroke', d => d.color)
      // .style("visibility", d => (left && (d.lowWskr === d.fstQnt)) || (!left && (d.highWskr === d.thrdQnt)) ? "hidden" : "visible");
      .style('display', d => (left && (d.lowWskr === d.fstQnt)) || (!left && (d.highWskr === d.thrdQnt)) ? 'none' : null);



  }

  updateWhiskers(whiskers: Selection<SVGGElement, BoxDefinition, null, undefined>,
                 graphicContext: GraphicContext) {

    whiskers.select('line.whiskerlineL')
      .call(this.positionWhiskerLine, true, graphicContext);

    whiskers.select('line.whiskerlineR')
      .call(this.positionWhiskerLine, false, graphicContext);

    whiskers.select('line.whiskertipL')
      .call(this.positionWhiskerTip, true, graphicContext);

    whiskers.select('line.whiskertipR')
      .call(this.positionWhiskerTip, false, graphicContext);

  }

  createWhiskers(whiskers: Selection<SVGGElement, BoxDefinition, null, undefined>,
                 lookAndFeel: LookAndFeel, graphicContext: GraphicContext) {


    const lwhiskr = whiskers.append('line')
      .attr('class', 'whiskerlineL')
      .style('stroke-width', lookAndFeel.whiskerStrokeWidth)
      .style('stroke-dasharray', '4 3')
      .call(this.positionWhiskerLine, true, graphicContext)
    ;
    const rwhiskr = whiskers.append('line')
      .attr('class', 'whiskerlineR')
      .style('stroke-width', lookAndFeel.whiskerStrokeWidth)
      .style('stroke-dasharray', '4 3')
      .call(this.positionWhiskerLine, false, graphicContext)
    ;

    const lTip = whiskers.append('line')
      .attr('class', 'whiskertipL')
      .style('stroke-width', lookAndFeel.whiskerStrokeWidth)
      .call(this.positionWhiskerTip, true, graphicContext)
    ;

    const rTip = whiskers.append('line')
      .attr('class', 'whiskertipR')
      .style('stroke-width', lookAndFeel.whiskerStrokeWidth)
      .call(this.positionWhiskerTip, false, graphicContext)
    ;


  }

  createBoxes(widgets: Selection<SVGGElement, BoxDefinition, null, undefined>,
              lookAndFeel: LookAndFeel, graphicContext: GraphicContext) {


    const rect = widgets.append('rect')
      .attr('class', 'box')
      .style('stroke-width', lookAndFeel.boxStrokeWidth)
      .style('fill-opacity', lookAndFeel.boxFillOpacity)
      .call(this.positionBoxRectangle, graphicContext);


    const median = widgets.append('line')
      .attr('class', 'medianline')
      .style('stroke-width', lookAndFeel.boxStrokeWidth)
      .call(this.positionMedianLine, graphicContext);

    const instance = this;

    this.ngZone.runOutsideAngular(() => {
      rect.on('mouseover', function(evnt: MouseEvent, d: BoxDefinition) {
        instance.showTooltip(d.median, d.median, d.key);
      })
        .on('mouseout', function() {
          instance.hideTooltip();
        });

      median.on('mouseover', function(evnt: MouseEvent, d: BoxDefinition) {
        instance.showTooltip(d.median, d.median, d.key);
      })
        .on('mouseout', function() {
          instance.hideTooltip();
        });

    });

    const mean = widgets
      .append('line')
      .attr('class', 'meanline')
      .style('stroke-width', lookAndFeel.meanStrokeWidth)
      .style('stroke-dasharray', '4 2')
      .call(this.positionMeanLine, graphicContext)
    ;

    // has to be outside angular, to prevent detection
    this.ngZone.runOutsideAngular(() => {
      mean
        .on('mouseover', function(evnt: MouseEvent, d: BoxDefinition) {
          instance.showTooltip(d.mean, d.mean, d.key);
        })
        .on('mouseout', function() {
          instance.hideTooltip();
        });

    });

  }

  createBoxWidgets(newBoxWidgets: Selection<SVGGElement, BoxDefinition, null, undefined>,
                   lookAndFeel: LookAndFeel, graphicContext: GraphicContext) {

    // this.ngZone.runOutsideAngular(() => {

    const instance = this;

    const backdrops = newBoxWidgets.append<SVGGElement>('rect').attr('class', 'backdrop')
    // .style("stroke-width", lookAndFeel.boxStrokeWidth)
      .style('fill-opacity', lookAndFeel.backdropOpacity)
      .style('fill', lookAndFeel.backdropColor)
      .call(this.positionBackdrop, graphicContext);


    const whiskers = newBoxWidgets.append<SVGGElement>('g').attr('class', 'whiskers');

    this.createWhiskers(whiskers, lookAndFeel, graphicContext);

    const boxes = newBoxWidgets.append<SVGGElement>('g').attr('class', 'box');
    this.createBoxes(boxes, lookAndFeel, graphicContext);


    const outliers = newBoxWidgets.append<SVGGElement>('g').attr('class', 'outliers');


    outliers.selectAll('.outlier')
      .data(d => d.outliers.map(x => [x, d.key, d.color]))
      .enter()
      .call(this.createOutlier, lookAndFeel, graphicContext, this.positionOutlier)
    ;

    // });
  }

}
