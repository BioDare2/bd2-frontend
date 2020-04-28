
/*
 The colors where generated with d3 scales and colors using the code below

 import * as d3lib from 'd3';
 export const d3 = d3lib;

  round(val) {
    return Math.round((val) * 10000) / 10000;
  }

 colors() {
    const scale = (d3.scaleLinear()
      .domain([-1, 0, 1]) as any)
      .range([d3.rgb('#d62728'), d3.rgb('white'), d3.rgb('#1f77b4')]);

    const step = 0.1;
    const points = d3.range(-1, 1 + step, step);

    const ranges = points.map( point => {
      return {
        point: this.round(point),
        color: d3.rgb(scale(point)).hex(),
      };
    });

    return ranges;
  }

 [ { "point": -1, "color": "#d62728" }, { "point": -0.9, "color": "#da3d3e" }, { "point": -0.8, "color": "#de5253" }, { "point": -0.7, "color": "#e26869" }, { "point": -0.6, "color": "#e67d7e" }, { "point": -0.5, "color": "#eb9394" }, { "point": -0.4, "color": "#efa9a9" }, { "point": -0.3, "color": "#f3bebf" }, { "point": -0.2, "color": "#f7d4d4" }, { "point": -0.1, "color": "#fbe9ea" }, { "point": 0, "color": "#ffffff" }, { "point": 0.1, "color": "#e9f1f8" }, { "point": 0.2, "color": "#d2e4f0" }, { "point": 0.3, "color": "#bcd6e9" }, { "point": 0.4, "color": "#a5c9e1" }, { "point": 0.5, "color": "#8fbbda" }, { "point": 0.6, "color": "#79add2" }, { "point": 0.7, "color": "#62a0cb" }, { "point": 0.8, "color": "#4c92c3" }, { "point": 0.9, "color": "#3585bc" }, { "point": 1, "color": "#1f77b4" } ]

 */

// tslint:disable-next-line:max-line-length
const standardJson = '[ { "point": -1, "color": "#d62728" }, { "point": -0.9, "color": "#da3d3e" }, { "point": -0.8, "color": "#de5253" }, { "point": -0.7, "color": "#e26869" }, { "point": -0.6, "color": "#e67d7e" }, { "point": -0.5, "color": "#eb9394" }, { "point": -0.4, "color": "#efa9a9" }, { "point": -0.3, "color": "#f3bebf" }, { "point": -0.2, "color": "#f7d4d4" }, { "point": -0.1, "color": "#fbe9ea" }, { "point": 0, "color": "#ffffff" }, { "point": 0.1, "color": "#e9f1f8" }, { "point": 0.2, "color": "#d2e4f0" }, { "point": 0.3, "color": "#bcd6e9" }, { "point": 0.4, "color": "#a5c9e1" }, { "point": 0.5, "color": "#8fbbda" }, { "point": 0.6, "color": "#79add2" }, { "point": 0.7, "color": "#62a0cb" }, { "point": 0.8, "color": "#4c92c3" }, { "point": 0.9, "color": "#3585bc" }, { "point": 1, "color": "#1f77b4" } ]';

type ColorEntry = {
  point: number;
  color: string;
}

export type ScaleRange = {
  from?: number;
  to?: number;
  color?: string;
  foreColor?: string;
  name?: string;
  point: number;
}

export class HeatmapScale {

    readonly standardColors: ColorEntry[] = JSON.parse(standardJson);

    scaledColors(min: number, max: number): ColorEntry[] {
      const a = (max - min)/2;
      const b = (max+min)/2;

      return this.standardColors.map( se => {
        return {
          point: this.round(a*se.point+b),
          color: se.color
        }
      })
    }

    customScale(min: number, max: number): ScaleRange[] {

      const halfStep = (max-min)/40.0;

      return this.scaledColors(min, max).map( se => {
        return {
          from: this.round(se.point - halfStep) ,
          to: this.round(se.point + halfStep),
          color: se.color,
          name: ''+se.point,
          point: se.point,
        };
      })

    }
    round(val) {
      return Math.round((val) * 10000) / 10000;
    }

}
