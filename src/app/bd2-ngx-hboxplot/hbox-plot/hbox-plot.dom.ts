// import {Transition} from 'd3-transition';
import {Axis} from 'd3-axis';
import {ScaleBand, ScaleLinear} from 'd3-scale';
import {Selection, Transition} from 'd3';


export class LookAndFeel {

  vMargin = 25;
  hMarginL = 20;
  hMarginR = 15;
  rowWidth = 30;
  rowGap = 0.2;

  transitionTime = 600;

  boxStrokeWidth = '2px';
  boxFillOpacity = 0.35;
  meanStrokeWidth = '4px';

  labelFont = '12px';
  labelFillOpacity = 0.35;
  backLabelOpacity = 0.30;

  backdropColor = 'white';
  backdropOpacity = 1;

  whiskerStrokeWidth = '1px';

  outliersStrokeWidth = '1px';
  outliersCircleRadius = 3;
  outliersFillOpacity = 0.4;
}


export let defualtLookAndFeel: () => LookAndFeel = function() {
  return new LookAndFeel();
};

export class GraphicContext {

  /*transitionTime: number;

   get transitionOn(): boolean {
   return (this.transitionTime && this.transitionTime > 0);
   };*/

  transitionOn: boolean;
  transition: Transition<any, any, any, any>;

  workspaceWidth: number;
  workspaceHeight: number;

  axisWrapper: Selection<SVGGElement, any, null, undefined>;
  xScale: ScaleLinear<number, number>;
  xTopAxis: Axis<number | { valueOf(): number }>;
  xBottomAxis: Axis<number | { valueOf(): number }>;

  yScale: ScaleBand<string>;
  yLeftAxis: Axis<string>;
  yRightAxis: Axis<string>;

  palette: string[];

  dataWrapper: Selection<SVGGElement, any, null, undefined>;

  tooltipWrapper: Selection<SVGGElement, any, null, undefined>;
  tooltipText: Selection<SVGGElement, any, null, undefined>;
  tooltipBox: Selection<SVGGElement, any, null, undefined>;

  labelsWrapper: Selection<SVGGElement, any, null, undefined>;
  backLabelsWrapper: Selection<SVGGElement, any, null, undefined>;
  labelsTimers = [];
}

export function offsetScaleValue(x: number, pixOffset: number, scale: ScaleLinear<number, number>) {
  const r = scale.range();
  const pos = scale(x) + pixOffset;
  if (pos < r[0]) {
    return r[0];
  } else if (pos > r[1]) {
    return r[1];
  }
  return pos;
}



