// import * as d3Scale from 'd3-scale';
import {ScaleBand, ScaleLinear, ScaleQuantize} from 'd3-scale';

/**
 * Defines heatmap margins, row widths and gaps between rows
 */
export class LookAndFeelSizing {
  vMargin = 25;
  hMargin = 20;

  smallRowWidth = 6;
  midRowWidth = 12;
  bigRowWidth = 25;

  rowGap = 0.05;
}

/**
 * Graphic context class to store scales, dimensions, formatters, etc.
 */
export class GraphicContext {

  viewBox: string;
  mainPaneTransform: string;

  pWidth: number;
  pHeight: number;

  workspaceWidth: number;
  workspaceHeight: number;

  xDomain: [number, number];
  yDomain: any[];

  xScale: ScaleLinear<number, number>;
  yScale: ScaleBand<any>;

  colorScale: ScaleQuantize<string>;
  labelsColors: (n: number) => string;

  valuesFormatter: (n: number | { valueOf(): number }) => string;
  domainFormatter: (n: number | { valueOf(): number }) => string;
}

/* ***** Data model types ***** */

/* Heatmap timeseries */
export type Serie = {

  key?: any;
  label?: string;
  data: Point[];

  min: number;
  max: number;
  mean: number;

};


/* Heatmap data point */
export type Point = {

  x: number;
  y: number;
  width?: number;

};

/* Axes ticks */
export class Tick {

  // tslint:disable-next-line:no-unnecessary-initializer
  constructor(public x = 0, public y = 0, public label: any = undefined,
              public top = false, public left = false) {
  }

}

/* Box definition (= single data point) */
export class BoxDef {

  width: number;

  constructor(public x: number,
              public y: number,
              public left: number,
              public right: number) {

    this.width = right - left;
  }
}

/* Box series (= full timeseries = heatmap row) */
export class BoxSerie {

  key?: any;
  label?: string;
  data: BoxDef[];

  min: number;
  max: number;
  mean: number;

}
