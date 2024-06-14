// import * as d3Scale from 'd3-scale';
import {ScaleBand, ScaleLinear, ScaleQuantize} from 'd3-scale';

export class LookAndFeelSizing {
  vMargin = 25;
  hMargin = 20;

  smallRowWidth = 6;
  midRowWidth = 12;
  bigRowWidth = 25;

  rowGap = 0.05;
}

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


export type Serie = {

  key?: any;
  label?: string;
  data: Point[];

  min: number;
  max: number;
  mean: number;

};


export type Point = {

  x: number;
  y: number;
  width?: number;

};

export class Tick {

  // tslint:disable-next-line:no-unnecessary-initializer
  constructor(public x = 0, public y = 0, public label: any = undefined,
              public top = false, public left = false) {
  }

}

export class BoxDef {

  width: number;

  constructor(public x: number,
              public y: number,
              public left: number,
              public right: number) {

    this.width = right - left;
  }
}

export class BoxSerie {

  key?: any;
  label?: string;
  data: BoxDef[];

  min: number;
  max: number;
  mean: number;

}
