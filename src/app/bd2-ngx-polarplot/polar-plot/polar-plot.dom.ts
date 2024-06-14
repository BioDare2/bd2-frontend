import {Selection} from 'd3-selection';

export type ShowIndividualsOptions = 'none' | 'all' | 'selected';

export class GraphicContext {

  palette: string[];

  mainPane: Selection<SVGGElement, any, null, undefined>;
  axisGrid: Selection<SVGGElement, any, null, undefined>;
  petalsWrapper: Selection<SVGGElement, any, null, undefined>;
  dotsWrapper: Selection<SVGGElement, any, null, undefined>;
  individualDotsInsetWrapper: Selection<SVGGElement, any, null, undefined>;
  tooltip: Selection<SVGGElement, any, null, undefined>;
  tooltipText: Selection<SVGGElement, any, null, undefined>;
  tooltipBox: Selection<SVGGElement, any, null, undefined>;

  legendtip: Selection<SVGGElement, any, null, undefined>;
  legendtipText: Selection<SVGGElement, any, null, undefined>;
  legendtipBox: Selection<SVGGElement, any, null, undefined>;

  radius: number;
}

export class LookAndFeel {
  baseTransitionsTime = 400;

  gridColor = '#CDCDCD';
  axisColor = 'white';
  axisWidth = '2px';

  // done by css
  // axisFontSize: "10px",
  // tooltipFontSize: "11px",

  dotsCircleRadius = 4;
  dotsCircleStrokeWidth = '1px';
  dotsCircleFillOpacity = 0.5;

  petalAreaOpacity = 0.35;
  petalAreaOpacityActive = 0.7;
  petalLineWidth = '3px';
  petalCircleRadius = 4;
  petalCircleOpacity = 0.8;

}
