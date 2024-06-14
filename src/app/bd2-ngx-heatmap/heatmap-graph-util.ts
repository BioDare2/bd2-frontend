import {BoxDef, GraphicContext, LookAndFeelSizing, Serie} from './bd2-heatmap.dom';
import {scaleBand, scaleLinear, scaleQuantize} from 'd3-scale';
import {colors} from './color-util';
import {format} from 'd3-format';
import {interpolateSpectral} from 'd3-scale-chromatic';

export class HeatmapGraphUtil {

  prepareGraphicContext(data: Serie[], lookAndFeel: LookAndFeelSizing, middleZero: boolean=false): GraphicContext {

    const context = new GraphicContext();

    this.calculateDimensions(context, data, lookAndFeel);
    this.addPaneAttributes(context, lookAndFeel);

    this.addScales(context, data, lookAndFeel, middleZero);
    this.addFormatters(context, data);

    context.labelsColors = this.labelsColors(data);
    return context;
  }

  calculateDimensions(context: GraphicContext, data: any[], lookAndFeel: LookAndFeelSizing) {

    context.pWidth = 500;
    context.workspaceWidth = context.pWidth - 3 * lookAndFeel.hMargin;

    context.workspaceHeight = this.calculateWorkspaceHeight(data, lookAndFeel);
    context.pHeight = context.workspaceHeight + 2 * lookAndFeel.vMargin;
  }

  calculateWorkspaceHeight(data: any[], lookAndFeel: LookAndFeelSizing) {
    if (data.length <= 25) {
      return data.length * lookAndFeel.bigRowWidth;
    }
    if (data.length <= 100) {
      return data.length * lookAndFeel.midRowWidth;
    }
    return data.length * lookAndFeel.smallRowWidth;
  }

  addPaneAttributes(context: GraphicContext, lookAndFeel: LookAndFeelSizing) {
    context.viewBox = `0 0 500 ${context.pHeight}`;

    context.mainPaneTransform = `translate(${2 * lookAndFeel.hMargin}, ${lookAndFeel.vMargin})`;
  }

  addScales(context: GraphicContext, data: Serie[], lookAndFeel: LookAndFeelSizing, middleZero: boolean) {

    let timeDomain = this.timeDomain(data);
    context.xDomain = timeDomain;

    const margin = this.timeMargin(data, timeDomain);
    timeDomain = [timeDomain[0] - margin, timeDomain[1] + margin];

    context.xScale = scaleLinear()
      .clamp(true)
      .domain(timeDomain)
      .range([0, context.workspaceWidth]);

    const yDomain = data.map(s => s.key);
    context.yDomain = yDomain;

    context.yScale = scaleBand()
      .paddingInner(lookAndFeel.rowGap)
      .paddingOuter(0)
      .domain(yDomain)
      .range([0, context.workspaceHeight]);

    context.colorScale = this.heatmapScale(data, middleZero);


  }

  addFormatters(context: GraphicContext, data: Serie[]) {
    const timeDomain = this.timeDomain(data);
    context.domainFormatter = this.formatForDomain(timeDomain);

    const valuesRange = this.valuesRange(data);
    context.valuesFormatter = this.formatForDomain(valuesRange);
  }

  timeMargin(data: Serie[], timeDomain: [number, number]) {

    const min = timeDomain[0];
    let margin = 0.5;

    data.filter( serie => serie.data && serie.data.length > 0 && serie.data[0].x === min)
        .forEach(serie => {
          const p = serie.data[0];
          if (p instanceof BoxDef) {
            margin = Math.max(margin, p.x - p.left);
          }
        });

    return margin;
  }

  timeDomain(data: Serie[]): [number, number] {

    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;

    data.forEach(serie => {
      if (serie.data && serie.data.length > 0) {
        min = Math.min(min, serie.data[0].x);
        max = Math.max(max, serie.data[serie.data.length - 1].x);
      }
    });

    min = isFinite(min) ? min : 0;
    max = isFinite(max) ? max : 1;

    return [min, max];

  }



  heatmapScale(data: Serie[], middleZero: boolean) {

    let domain = this.valuesRange(data);
    if (middleZero) {
      const max = Math.max(Math.abs(domain[0]), Math.abs(domain[1]));
      domain = [-max, max];
    }
    const range = colors();

    return scaleQuantize<string>().domain(domain).range(range);
  }

  valuesRange(traces: Serie[]): [number, number] {

    if (traces.length === 0) {
      return [NaN, NaN];
    }
    let min = traces[0].min;
    let max = traces[0].max;

    traces.forEach(tr => {
      min = Math.min(min, tr.min);
      max = Math.max(max, tr.max);
    });

    return [min, max];
  }

  formatForDomain([min, max]: [number, number]) {
    const range = max - min;
    if (range < 1) {
      return format('.2~e');
    }
    if (range < 100) {
      return format('.2~f');
    }
    if (range < 100000) {
      return format('d');
    }
    return format('.2~e');
  }

  labelsColors(traces: Serie[]) {
    const size = traces.length;

    // tslint:disable-next-line:only-arrow-functions
    return function(i: number) {
      return interpolateSpectral(i / size);
    };
  }
}
