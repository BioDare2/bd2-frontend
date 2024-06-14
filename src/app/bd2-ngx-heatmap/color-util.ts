import {scaleLinear} from 'd3-scale';
import {rgb} from 'd3-color';
import {range} from 'd3-array';

export function colors(minColor = '#d62728', zeroColor = 'white', maxColor = '#1f77b4', step = 0.1) {

  const scale = (scaleLinear()
    .domain([-1, 0, 1]) as any)
    .range([rgb(minColor), rgb(zeroColor), rgb(maxColor)]);

  const points = range(-1, 1 + step, step);

  const ranges = points.map(point => rgb(scale(point)).hex());

  return ranges;
}
