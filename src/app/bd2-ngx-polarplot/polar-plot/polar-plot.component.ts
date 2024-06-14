import {
  AfterViewInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';

import {Selection} from 'd3';
import * as d3 from 'd3';
import {PolarDomainUtil} from '../polar-plot-utils/polar-domain-util';
import {SmartRounder} from '../polar-plot-utils/smart-rounding';
import {PetalNode, PolarPoint} from '../polar-plot-utils/polar-plot.dom';
import {BD2ColorPalette} from '../polar-plot-utils/color-palette';
import {GraphicContext, LookAndFeel, ShowIndividualsOptions} from './polar-plot.dom';





@Component({
  selector: 'bd2-ngx-polar-plot',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="polarplot"></div>
  `,
  styles: [
    `
      :host ::ng-deep .axis .legend {
        font-size: 15px;
      }

      :host ::ng-deep .tooltip {
        font-size: 15px;
      }

      :host ::ng-deep .legendtip {
        font-size: 18px;
      }
    `
  ]
})
export class PolarPlotComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {


  @Input()
  data: number[][];


  @Input()
  errors: number[];

  @Input()
  removed: number[] = [];

  @Input()
  scaleRadius = true;

  @Input()
  scaleWidth = false;

  @Input()
  showIndividuals: ShowIndividualsOptions = 'selected';

  @Input()
  set domain(domain: [number, number]) {
    this._domain = [domain[0], domain[1], domain[1] - domain[0]];
  }

  @Input()
  palette: string[] = [];

  @Input()
  labels: string[] = [];

  @Input()
  labelsOn = true;


  @Input()
  lookAndFeel = new LookAndFeel();

  @Output()
  colors = new EventEmitter<string[]>();

  private d3;
  private parentNativeElement: any;
  private polarUtil: PolarDomainUtil;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;


  private _domain: number[];
  private showAllIndividuals = false;
  private showSelectedIndividuals = false;

  //private individualPolarData: PolarPoint[][];

  private graphicContext = new GraphicContext();


  constructor(private ngZone: NgZone, private changeDetectorRef: ChangeDetectorRef, element: ElementRef) {
    this.d3 = d3;
    // this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
    this.polarUtil = new PolarDomainUtil();

  }


  /**
   * It is detached from angular to prevent unnecessary change detection
   */
  ngAfterViewInit() {
    this.changeDetectorRef.detach();
  }

  /**
   * Explicit triggers re-drawing as need to have all the parameters set (so will not redrawn if data came frist and domain later)
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {

    if (!this.data || !this._domain) {
      return;
    }

    // console.log("Changes", changes);

    this.showSelectedIndividuals = (this.showIndividuals === 'selected');

    this.showAllIndividuals = (this.showIndividuals === 'all');

    this.updatePlot();

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


  initializeSvg(): GraphicContext {

    const pWidth = 500;
    const pHeight = 500;

    const d3ParentElement = this.d3.select(this.parentNativeElement);
    this.d3Svg = d3ParentElement.select('.polarplot').append('svg');


    this.d3Svg.attr('width', '100%')
      .attr('viewBox', '0 0 ' + pWidth + ' ' + pHeight);

    const context = new GraphicContext();
    context.mainPane = this.d3Svg.append<SVGGElement>('g')
      .attr('transform', 'translate(' + (pWidth / 2) + ',' + (pHeight / 2) + ')'); // moves 0,0 of the pain to the middle of the graphics

    context.radius = Math.min(pWidth, pHeight) / 2 - 30;
    return context;
  }

  prepareLegendtip(context: GraphicContext): GraphicContext {

    if (!context.legendtip) {
      // Set up the small tooltip in the centre for when you hover over a circle
      context.legendtip = context.mainPane.append<SVGGElement>('g')
        .classed('legendtipWrapper', true) as any;

      context.legendtipBox = context.legendtip.append<SVGGElement>('rect')
        .style('fill', 'white')
        .style('fill-opacity', 0.9)
        .style('stroke', 'grey')
      ;


      context.legendtipText = context.legendtip.append('text')
        .attr('class', 'legendtip')
        .attr('text-anchor', 'middle')
        // .attr("dy", "0.35em")
        // .style("font-size", this.lookAndFeel.tooltipFontSize) //"11px")
        .style('opacity', 1) as any
      ;

      context.legendtip
      // .style("visibility", "hidden");
        .style('display', 'none');
    }
    return context;
  }

  showLegendtip(p: PetalNode, radius: number) {

    if (!this.labelsOn) {
      return;
    }

    this.graphicContext.legendtipText
      .attr('x', 0)
      .attr('y', 0)
      .text(p.label)
    // .transition().duration(this.lookAndFeel.baseTransitionsTime / 2)
    // .style('opacity', 1);
    ;

    // it has to be before the box cause of the bug in firefox
    this.graphicContext.legendtip
      // .style("visibility", "visible");
      .style('display', null);

    const bbox = this.graphicContext.legendtipText.node().getBBox();

    this.graphicContext.legendtipBox
      .attr('x', bbox.x - 3)
      .attr('y', bbox.y - 2)
      .attr('width', bbox.width + 6)
      .attr('height', bbox.height + 4);


  }

  hideLegendtip() {

    this.graphicContext.legendtip
    // .style("visibility", "hidden");
      .style('display', 'none');
  }


  prepareTooltip(context: GraphicContext): GraphicContext {

    if (!context.tooltip) {
      // Set up the small tooltip for when you hover over a circle
      context.tooltip = context.mainPane.append<SVGGElement>('g')
        .classed('tooltipWrapper', true) as any;

      context.tooltipBox = context.tooltip.append<SVGGElement>('rect')
        .style('fill', 'white')
        .style('fill-opacity', 0.8)
        .style('stroke', 'grey')
      // .style("visibility", "hidden");
      ;


      context.tooltipText = context.tooltip.append('text')
        .attr('class', 'tooltip')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
        // .style("font-size", this.lookAndFeel.tooltipFontSize) //"11px")
        .style('opacity', 1) as any
      ;

      context.tooltip
      // .style("visibility", "hidden");
        .style('display', 'none');
    }
    return context;
  }

  showTooltip(p: PetalNode, radius: number) {


    this.graphicContext.tooltipText
      .attr('x', (radius + 15) * p.polarCoordinates[0])
      .attr('y', (radius + 15) * p.polarCoordinates[1])
      .text(p.roundedPeak)
    // .transition().duration(this.lookAndFeel.baseTransitionsTime / 2)
    // .style('opacity', 1);
    ;

    // it has to be before the get BBox cause of the firefox errors
    this.graphicContext.tooltip
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
    // this.graphicContext.tooltip
    // .transition().duration(this.lookAndFeel.baseTransitionsTime / 2)
    // .style("opacity", 0);

    this.graphicContext.tooltip
    // .style("visibility", "hidden");
      .style('display', 'none');
  }


  updatePlot() {

    if (!this.d3Svg) {
      this.graphicContext = this.initializeSvg();

      this.graphicContext = this.plotAxisGrid(this.graphicContext);
    }


    // the grid is plotted only once, only the lables are updated
    this.updateAxisLabels(this._domain, this.graphicContext.axisGrid);

    this.graphicContext = this.updatePalette(this.data, this.palette, this.graphicContext);


    const petalNodes = this.prepareDataModel(this.data, this._domain, this.scaleRadius, this.scaleWidth, this.errors,
      this.labels, this.removed, this.graphicContext.palette);


    //this.individualPolarData = this.prepareIndividualPolarData(this.data, this._domain, this.removed, this.graphicContext.palette);
    //this.individualPolarData = this.individualPolarData.filter(d => d.length !== 0);

    this.graphicContext = this.plotDataPetals(petalNodes, this.scaleRadius, this.scaleWidth, this.graphicContext);

    this.graphicContext = this.plotAllDataDots(petalNodes, this.showAllIndividuals, this.graphicContext);

    this.graphicContext = this.prepareIndividualDataInset(this.graphicContext);

    this.graphicContext = this.prepareTooltip(this.graphicContext);
    this.graphicContext = this.prepareLegendtip(this.graphicContext);

  }

  prepareDataModel(dataGroups: number[][], domain: number[],
                   scaleRadius: boolean, scaleWidth: boolean, errors: number[],
                   labels: string[], removed: number[],
                   palette: string[]): PetalNode[] {

    let petalNodes = this.polarUtil.dataToPetals(this.data, this._domain, this.scaleRadius, this.scaleWidth, this.errors);

    this.labelPetals(petalNodes, labels);
    this.colorPetals(petalNodes, palette);
    // mark hidden
    removed.forEach( ix => {
      if (petalNodes[ix]) {
        petalNodes[ix].hidden = true;
        petalNodes[ix].individuals.forEach( p => p.hidden = true);
      }
    });
    // petalNodes = petalNodes.filter(n => !n.hidden);

    // remove empty data
    petalNodes = petalNodes.filter(n => !isNaN(n.peak));
    return petalNodes;
  }

  updatePalette(data: any[], palette: string[], context: GraphicContext): GraphicContext {
    if (!palette || palette.length === 0) {
      context.palette = BD2ColorPalette.palette(data.length);
    } else {
      context.palette = BD2ColorPalette.extendPalette(palette, data.length);

    }
    this.colors.next(context.palette.slice());
    return context;
  }

  labelPetals(petals: PetalNode[], labels: string[]) {
    if (!labels) {
      labels = [];
    }

    petals.forEach((n, ix) => n.label = labels[ix] ? labels[ix] : '' + (ix + 1));
  }

  colorPetals(petals: PetalNode[], palette: string[]) {
    petals.forEach((b, ix) => {
      b.color = palette[ix];
      b.individuals.forEach( p => p.color = b.color);
    });
  }

  plotDataPetals(petalNodes: PetalNode[],
                 scaleRadius: boolean, scaleWidth: boolean,
                 context: GraphicContext): GraphicContext {

    const transitionsTime = this.lookAndFeel.baseTransitionsTime;
    const d3 = this.d3;
    const radius = context.radius;

    if (!context.petalsWrapper) {
      context.petalsWrapper = context.mainPane.append<SVGGElement>('g').attr('class', 'petalsWrapper');
    }

    const petalsWrapper = context.petalsWrapper;

    const petalLine = (p: PetalNode) => {

      return d3.lineRadial()
        .radius(function(d) {
          return radius * d[0];
        })
        .angle(function(d) {
          return d[1];
        })
        .curve(d3.curveCardinalClosed)(p.petalPath as any);
    };

    const instance = this;

    // so that angular change detection is not triggered for mouseover/our events or transitions
    this.ngZone.runOutsideAngular(() => {

      const petals = petalsWrapper.selectAll('.petal')
        .data(petalNodes);


      const petalAreaOpacity = this.lookAndFeel.petalAreaOpacity;

      petals
        .select('.petalsArea')
        .transition().duration(transitionsTime)
        .attr('d', petalLine as any)
        .style('fill', d => d.color)
        .style('fill-opacity', this.lookAndFeel.petalAreaOpacity)
        .on('interrupt', function(d: PetalNode) {
          d3.select(this)
            .attr('d', petalLine as any)
            .style('fill', _ => d.color)
            .style('fill-opacity', petalAreaOpacity);
        })
      ;

      petals
        .select('.petalsLine')
        .transition().duration(transitionsTime)
        .attr('d', petalLine as any)
        .style('stroke', d => d.color)
        .style('stroke-opacity', 1)
        .style('stroke-width', this.lookAndFeel.petalLineWidth)
        .on('interrupt', function( d: PetalNode) {
          d3.select(this)
            .attr('d', petalLine as any)
            .style('stroke', _ => d.color)
            .style('stroke-opacity', 1);
        })
      ;

      petals
        .select('.petalsCircle')
        .transition().duration(transitionsTime)
        .attr('cx', function(d: PetalNode, i) {
          return radius * d.polarCoordinates[0]; // Math.cos(d * 2 * Math.PI / 24 - Math.PI / 2);
        })
        .attr('cy', function(d: PetalNode, i) {
          return radius * d.polarCoordinates[1]; // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
        })
        .style('fill', d => d.color)
        .on('interrupt', function(d: PetalNode) {
          d3.select(this)
            .attr('cx', function(_: PetalNode, i) {
              return radius * d.polarCoordinates[0]; // Math.cos(d * 2 * Math.PI / 24 - Math.PI / 2);
            })
            .attr('cy', function(_: PetalNode, i) {
              return radius * d.polarCoordinates[1]; // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
            })
            .style('fill', _ => d.color);
        })
      ;

      const newPetals = petals
        .enter()
        .append<SVGGElement>('g')
        .attr('class', 'petal');


      const petalsArea = newPetals.append('path');

      petalsArea
        .attr('class', 'petalsArea')
        .attr('d', petalLine as any)
        .style('fill', d => d.color)
        .style('fill-opacity', 0)
        .on('mouseover', function(evt: MouseEvent, d: PetalNode) {

          d3.select(this)
            .transition().duration(transitionsTime)
            .style('fill-opacity', instance.lookAndFeel.petalAreaOpacityActive);

          instance.showTooltip(d, radius);
          instance.showLegendtip(d, radius);

          /*const e = petalsArea.nodes();
          console.log("Nodes",e);
          console.log("T", this);
          console.log("S",d3.select(this));
          const ix = e.indexOf(this);
          */

          instance.showIndividualDataInset(d, radius);

        })
        .on('mouseout', function() {

          d3.select(this)
            .transition().duration(transitionsTime)
            .style('fill-opacity', instance.lookAndFeel.petalAreaOpacity);

          instance.hideTooltip();
          instance.hideLegendtip();
          instance.hideIndividualDataInset();

        })
        .transition().duration(transitionsTime)
        .style('fill-opacity', this.lookAndFeel.petalAreaOpacity)
      ;

      newPetals
        .append('path')
        .style('stroke-opacity', 0)
        .transition().duration(transitionsTime)
        .attr('class', 'petalsLine')
        .attr('d', petalLine as any)
        .style('stroke-width', this.lookAndFeel.petalLineWidth)
        .style('stroke', d => d.color)
        .style('fill', 'none')
        .style('stroke-opacity', 1)
      ;
      // .style("filter" , "url(#glow)");

      // Append the circles
      newPetals
        .append('circle')
        .attr('class', 'petalsCircle')
        .attr('cx', function(d: PetalNode, i) {
          return radius * d.polarCoordinates[0]; // Math.cos(d * 2 * Math.PI / 24 - Math.PI / 2);
        })
        .attr('cy', function(d: PetalNode, i) {
          return radius * d.polarCoordinates[1]; // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
        })
        .attr('r', this.lookAndFeel.petalCircleRadius)
        .style('fill', d => d.color)
        .style('fill-opacity', this.lookAndFeel.petalCircleOpacity);

      petals.exit()
        // .transition().duration(transitionsTime / 2)
        // .style('opacity', 0.0)
        .remove();

      const petalsAll: Selection<SVGGElement, PetalNode, null, undefined> = petalsWrapper.selectAll('.petal')
        // .style("visibility", (n:PetalNode) => n.hidden ? "hidden":"visible");
        .style('display', (n: PetalNode) => n.hidden ? 'none' : null) as any;

    });

    return context;
  }

  /*
  prepareIndividualPolarData(dataGroups: number[][], domain: number[],
                             removed: number[], palette: string[]): PolarPoint[][] {
    // append group index to the data so the colors can be generated for each data point (ix is for the parrent so it would
    // not be available
    const ind = dataGroups.map((g, ix) => g.map(a => {
      const v = new PolarPoint(this.polarUtil.calculatePolarCoordinate(a, domain), palette[ix]);
      return v;
    }));
    removed.forEach (ix => {
      if (ind[ix]) {
        ind[ix].forEach(p => p.hidden = true);
      }
    });
    return ind;
  }*/

  prepareIndividualDataInset(context: GraphicContext): GraphicContext {

    if (!context.individualDotsInsetWrapper) {
      context.individualDotsInsetWrapper = context.mainPane.append<SVGGElement>('g').attr('class', 'dotsInset');
    }

    // the actual plotting happens in showIndividuals as it is data depended

    // we always hide it with new data first;
    this.hideIndividualDataInset();
    return context;
  }

  hideIndividualDataInset() {
    if (!this.graphicContext.individualDotsInsetWrapper) {
      return;
    }

    this.graphicContext.individualDotsInsetWrapper
      .style('opacity', 0.0);
  }

  showIndividualDataInset(p: PetalNode, radius: number) {

    if (!this.graphicContext.individualDotsInsetWrapper || !p.individuals || !this.showSelectedIndividuals) {
      return;
    }

    // console.log("P: "+p.polarCoordinates[0], p.polarCoordinates);

    const transitionsTime = this.lookAndFeel.baseTransitionsTime / 2;

    const d3 = this.d3;

    // console.log("Ix",ix);
    // console.log("D",this.individualPolarData[ix]);
    const individuals = p.individuals; // this.individualPolarData[ix];


    const dots = this.graphicContext.individualDotsInsetWrapper.selectAll('.dotsCircle')
      .data(individuals);

    // existing dots
    dots
      .interrupt()
      .style('opacity', 0.2)
      .attr('cx', radius * p.polarCoordinates[0])
      .attr('cy', radius * p.polarCoordinates[1])
      .style('stroke', p.color)
      .style('fill', p.color)
      .transition().duration(transitionsTime)
      .style('opacity', 1)
      .attr('cx', d => radius * d.xy[0])
      .attr('cy', d => radius * d.xy[1]) // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
    ;

    // new dots
    dots.enter()
      .append('circle')
      .style('opacity', 0.2)
      .attr('class', 'dotsCircle')
      .attr('cx', radius * p.polarCoordinates[0])
      .attr('cy', radius * p.polarCoordinates[1])
      .attr('r', this.lookAndFeel.dotsCircleRadius)
      .style('stroke-width', this.lookAndFeel.dotsCircleStrokeWidth)
      .style('stroke', p.color)
      .style('fill', p.color)
      .style('fill-opacity', this.lookAndFeel.dotsCircleFillOpacity)
      .transition().duration(transitionsTime)
      .style('opacity', 1)
      .attr('cx', d => radius * d.xy[0])
      .attr('cy', d => radius * d.xy[1]) // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
    ;
    // exit
    dots.exit()
      .remove();

    this.graphicContext.individualDotsInsetWrapper
      .style('opacity', 1);
  }

  plotAllDataDots(petals: PetalNode[], showDots: boolean,
                  context: GraphicContext): GraphicContext {


    const transitionsTime = this.lookAndFeel.baseTransitionsTime;
    const d3 = this.d3;
    const radius = context.radius;

    if (!context.dotsWrapper) {
      context.dotsWrapper = context.mainPane.append<SVGGElement>('g').attr('class', 'dotsWrapper');
    }
    const dotsWrapper = context.dotsWrapper;

    if (!showDots) {
      context.dotsWrapper.style('opacity', 0.0);
      return context;
    } else {
      context.dotsWrapper.style('opacity', 1);
    }

    const dotsData = petals.map(p => p.individuals);
    const instance = this;


    // so that angular change detection is not triggered for mouseover/our events or transitions
    this.ngZone.runOutsideAngular(() => {

      const dotsGroup = dotsWrapper.selectAll('.dotsGroup')
        .data(dotsData);


      const dotsInExisting = dotsGroup.selectAll('.dotsCircle')
        .data(d => d);

      dotsInExisting
        .transition().duration(transitionsTime)
        .attr('cx', d => radius * d.xy[0])
        .attr('cy', d => radius * d.xy[1]) // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
        .style('stroke', d => d.color)
        .style('fill', d => d.color)
      ;

      dotsInExisting.enter()
        .append('circle')
        .attr('class', 'dotsCircle')
        .transition().duration(transitionsTime)
        .attr('cx', d => radius * d.xy[0])
        .attr('cy', d => radius * d.xy[1]) // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
        .attr('r', this.lookAndFeel.dotsCircleRadius)
        .style('stroke-width', this.lookAndFeel.dotsCircleStrokeWidth)
        .style('stroke', d => d.color)
        .style('fill', d => d.color)
        .style('fill-opacity', this.lookAndFeel.dotsCircleFillOpacity);


      dotsInExisting.exit()
        .transition().duration(transitionsTime / 2)
        .style('opacity', 0.0)
        .remove();

      // dotsGroup enter section
      const dotsInNewGroups = dotsGroup.enter()
        .append<SVGGElement>('g')
        .attr('class', 'dotsGroup')
        .selectAll('.dotsCircle')
        .data(d => d);


      dotsInNewGroups.enter()
        .append('circle')
        .attr('class', 'dotsCircle')
        .transition().duration(transitionsTime)
        .attr('cx', d => radius * d.xy[0])
        .attr('cy', d => radius * d.xy[1]) // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
        .attr('r', this.lookAndFeel.dotsCircleRadius)
        .style('stroke-width', this.lookAndFeel.dotsCircleStrokeWidth)
        .style('stroke', d => d.color)
        .style('fill', d => d.color)
        .style('fill-opacity', this.lookAndFeel.dotsCircleFillOpacity);

      // dotsGroup exit section
      dotsGroup.exit()
        .transition().duration(transitionsTime / 2)
        .style('opacity', 0.0)
        .remove();

    });

    const dotsGroup = dotsWrapper// .selectAll(".dotsGroup")
      .selectAll('.dotsCircle')
      // .style("visibility", (n:PolarPoint) => n.hidden ? "hidden":"visible");
      .style('display', (n: PolarPoint) => n.hidden ? 'none' : null);

    return context;
  }

  /*
  plotAllDataDots(dotsData: PolarPoint[][], showDots: boolean,
                  context: GraphicContext): GraphicContext {


    const transitionsTime = this.lookAndFeel.baseTransitionsTime;
    const d3 = this.d3;
    const radius = context.radius;

    if (!context.dotsWrapper) {
      context.dotsWrapper = context.mainPane.append<SVGGElement>('g').attr('class', 'dotsWrapper');
    }
    const dotsWrapper = context.dotsWrapper;

    if (!showDots) {
      context.dotsWrapper.style('opacity', 0.0);
      return context;
    } else {
      context.dotsWrapper.style('opacity', 1);
    }

    const instance = this;


    // so that angular change detection is not triggered for mouseover/our events or transitions
    this.ngZone.runOutsideAngular(() => {

      const dotsGroup = dotsWrapper.selectAll('.dotsGroup')
        .data(dotsData);


      const dotsInExisting = dotsGroup.selectAll('.dotsCircle')
        .data(d => d);

      dotsInExisting
        .transition().duration(transitionsTime)
        .attr('cx', d => radius * d.xy[0])
        .attr('cy', d => radius * d.xy[1]) // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
        .style('stroke', d => d.color)
        .style('fill', d => d.color)
      ;

      dotsInExisting.enter()
        .append('circle')
        .attr('class', 'dotsCircle')
        .transition().duration(transitionsTime)
        .attr('cx', d => radius * d.xy[0])
        .attr('cy', d => radius * d.xy[1]) // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
        .attr('r', this.lookAndFeel.dotsCircleRadius)
        .style('stroke-width', this.lookAndFeel.dotsCircleStrokeWidth)
        .style('stroke', d => d.color)
        .style('fill', d => d.color)
        .style('fill-opacity', this.lookAndFeel.dotsCircleFillOpacity);


      dotsInExisting.exit()
        .transition().duration(transitionsTime / 2)
        .style('opacity', 0.0)
        .remove();

      // dotsGroup enter section
      const dotsInNewGroups = dotsGroup.enter()
        .append<SVGGElement>('g')
        .attr('class', 'dotsGroup')
        .selectAll('.dotsCircle')
        .data(d => d);


      dotsInNewGroups.enter()
        .append('circle')
        .attr('class', 'dotsCircle')
        .transition().duration(transitionsTime)
        .attr('cx', d => radius * d.xy[0])
        .attr('cy', d => radius * d.xy[1]) // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
        .attr('r', this.lookAndFeel.dotsCircleRadius)
        .style('stroke-width', this.lookAndFeel.dotsCircleStrokeWidth)
        .style('stroke', d => d.color)
        .style('fill', d => d.color)
        .style('fill-opacity', this.lookAndFeel.dotsCircleFillOpacity);

      // dotsGroup exit section
      dotsGroup.exit()
        .transition().duration(transitionsTime / 2)
        .style('opacity', 0.0)
        .remove();

    });

    const dotsGroup = dotsWrapper// .selectAll(".dotsGroup")
      .selectAll('.dotsCircle')
      // .style("visibility", (n:PolarPoint) => n.hidden ? "hidden":"visible");
      .style('display', (n: PolarPoint) => n.hidden ? 'none' : null);

    return context;
  }
  */

  plotAxisGrid(context: GraphicContext): GraphicContext {


    if (context.axisGrid) {
      return context; // this.axisGrid; //we only plot grid once
    }

    const radius = context.radius;
    const axisGrid = context.axisGrid = context.mainPane.append<SVGGElement>('g').attr('class', 'axisWrapper');


    axisGrid.selectAll('.levels')
      .data([10, 2, 1])
      .enter()
      .append('circle')
      .attr('class', 'gridCircle')
      .attr('r', function(d, i) {
        return radius / d;
      })
      .style('fill', this.lookAndFeel.gridColor)
      .style('stroke', this.lookAndFeel.gridColor)
      .style('fill-opacity', 0.15);
    // .style("filter" , "url(#glow)");

    const axis = axisGrid.selectAll('.axis')
      .data(
        [0, 3, 6, 9, 12, 15, 18, 21].map(v => this.polarUtil.normalizedPeakToPolar(v, 24)
          // polar coordinates with attached original value for the label
        )
      )
      .enter()
      .append('g')
      .attr('class', 'axis');

    axis.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', function(d, i) {
        return radius * d[0]; // Math.cos(d * 2 * Math.PI / 24 - Math.PI / 2);
      })
      .attr('y2', function(d, i) {
        return radius * d[1]; // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
      })
      .attr('class', 'line')
      .style('stroke', this.lookAndFeel.axisColor)
      .style('stroke-dasharray', '5 5')
      .style('stroke-width', this.lookAndFeel.axisWidth);

    axis.append('text')
      .attr('class', 'legend')
      // .style("font-size", this.lookAndFeel.axisFontSize) //"10px")
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr('x', function(d, i) {
        return (radius + 15) * d[0]; // Math.cos(d * 2 * Math.PI / 24 - Math.PI / 2);
      })
      .attr('y', function(d, i) {
        return (radius + 15) * d[1]; // Math.sin(d * 2 * Math.PI / 24 - Math.PI / 2);
      })
      .text(function(d, i) {
        return d[2];
      });

    return context;
  }

  updateAxisLabels(domain: number[], axisGrid: Selection<SVGGElement, any, null, undefined>) {

    const range = domain[1] - domain[0];
    const axis = axisGrid.selectAll('.axis');
    axis.select('text')
      .text(function(d, i) {
        if (i === 0) {
          return SmartRounder.round(domain[1]) + ' / ' + SmartRounder.round(domain[0]);
        } else {
          return SmartRounder.round(domain[0] + d[2] / 24 * range);
        }
      });

  }

}
