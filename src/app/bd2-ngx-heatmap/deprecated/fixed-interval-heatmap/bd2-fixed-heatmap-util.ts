import {scaleBand} from 'd3-scale';
import {FixedGraphicContext} from './bd2-fixed-heatmap.dom';
import {HeatmapGraphUtil} from '../../heatmap-graph-util';
import {LookAndFeelSizing, Serie} from '../../bd2-heatmap.dom';

export class Bd2FixedHeatmapUtil extends HeatmapGraphUtil {

  override prepareGraphicContext(data: Serie[], lookAndFeel: LookAndFeelSizing, middleZero = false): FixedGraphicContext {

    const context = new FixedGraphicContext();

    this.calculateDimensions(context, data, lookAndFeel);
    this.addPaneAttributes(context, lookAndFeel);

    this.addScales(context, data, lookAndFeel, middleZero);
    this.addFormatters(context, data);

    context.labelsColors = this.labelsColors(data);
    return context;
  }

  override addScales(context: FixedGraphicContext, data: Serie[], lookAndFeel: LookAndFeelSizing, middleZero: boolean) {

    const timeDomain = this.timeDomainBand(data);

    context.xBandScale = scaleBand()
      // .clamp(true)
      .paddingInner(0)
      .paddingOuter(0)
      .domain(timeDomain)
      .range([0, context.workspaceWidth]);

    const yDomain = data.map(s => s.key);

    context.yScale = scaleBand()
      .paddingInner(lookAndFeel.rowGap)
      .paddingOuter(0)
      .domain(yDomain)
      .range([0, context.workspaceHeight]);

    context.colorScale = this.heatmapScale(data, middleZero);


  }


  timeDomainBand(data: Serie[]): any[] {

    const [min, max] = this.timeDomain(data);

    const res = [];

    for (let i = min; i <= max; i++) {
      res.push(i);
    }
    return res;

  }

}
