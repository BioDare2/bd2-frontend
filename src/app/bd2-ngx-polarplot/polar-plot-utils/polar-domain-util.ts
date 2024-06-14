import {PetalNode, PolarPoint} from './polar-plot.dom';
import * as d3 from 'd3';
import {SmartRounder} from './smart-rounding';


const DEF_ERR = 0.6 / 24;
const DEF_WIDTH = 0.6 / 24;
const MIN_WIDTH = 0.1 / 24;
const NEGLIGIBLE_ERROR = 0.5 / 24;
const MAX_ERROR = 0.33; // 8/24

export class PolarDomainUtil {

  dataToPetals(dataGroups: number[][], domain: number[],
               scaleRadius?: boolean, scaleWidth?: boolean, errors?: number[]): PetalNode[] {

    if (!dataGroups) {
      return [];
    }
    domain[2] = domain[1] - domain[0];

    return dataGroups.map((g, ix) => this.dataToPetal(g, domain, scaleRadius, scaleWidth, errors ? errors[ix] : null));
  }

  dataToPetal(data: number[], domain: number[],
              scaleRadius?: boolean, scaleWidth?: boolean, error?: number): PetalNode {


    const node = this.calculatePetalProperties(data, domain, scaleRadius, scaleWidth, error);
    node.polarAngle = this.calculatePolarAngle(node.peak, domain);
    node.petalPath = this.calculatePetalPath(node.peak, node.width, node.radiusScale, domain);
    node.polarCoordinates = this.calculatePolarCoordinate(node.peak, domain);

    // shift back after normalization
    node.peak = node.peak + domain[0];

    node.individuals = this.dataToPolarPoint(data, domain);
    return node;
  }

  dataToPolarPoint(data: number[], domain: number[]): PolarPoint[] {

    const ind = data.map(a => {
      const v = new PolarPoint(this.calculatePolarCoordinate(a, domain), undefined);
      return v;
    });

    return ind;
  }

  calculateCircularMeanAndDev(data: number[], domain: number[]) {

    data = data.map(v => this.normalize(v, domain));
    const m = d3.mean(data);
    const std = d3.deviation(data) || 0;

    const rot = domain[2] / 2;
    data = data.map(v => v < rot ? v + domain[2] : v);
    const rotM = d3.mean(data) % domain[2];
    const rotStd = d3.deviation(data) || 0;

    if (rotStd < std) {
      return [rotM, rotStd];
    } else {
      return [m, std];
    }
  }

  calculatePetalProperties(data: number[], domain: number[],
                           scaleRadius?: boolean, scaleWidth?: boolean, error?: number): PetalNode {

    const node = new PetalNode();

    const meanStd = this.calculateCircularMeanAndDev(data, domain);

    node.peak = meanStd[0];
    node.roundedPeak = SmartRounder.round(node.peak);

    if ((scaleRadius || scaleWidth) && !error) {
      error = meanStd[1];
    }


    node.width = scaleWidth ? error : DEF_WIDTH * domain[2];
    if (node.width < MIN_WIDTH * domain[2]) {
      node.width = MIN_WIDTH * domain[2];
    }
    if (node.width > domain[2] / 2) {
      node.width = domain[2] / 2;
    }

    node.radiusScale = 1;
    if (scaleRadius) {
      error = error / domain[2];
      error = error <= NEGLIGIBLE_ERROR ? 0 : error;
      error = error > MAX_ERROR ? MAX_ERROR : error;

      node.radiusScale = 1 - 0.5 * error / MAX_ERROR;
    }

    return node;
  }


  calculatePetalPath(peak: number, width: number, radiusScale: number, domain: number[]): number[][] {

    const path = [
      [0, 0],
      [0.5 * radiusScale, this.calculatePolarAngle(peak - width, domain)],
      [1 * radiusScale, this.calculatePolarAngle(peak, domain)],
      [0.5 * radiusScale, this.calculatePolarAngle(peak + width, domain)],
    ];
    return path;

  }


  normalize(value: number, domain: number[]): number {
    value = value - domain[0];
    value = value % domain[2];
    if (value < 0) {
      value += domain[2];
    }

    return value;
  }

  calculatePolarCoordinate(value: number, domain: number[]): number[] {
    value = this.normalize(value, domain);

    return this.normalizedPeakToPolar(value, domain[2]);
  }

  normalizedPeakToPolar(value: number, range: number): number[] {
    return [
      Math.cos(value * 2 * Math.PI / range - Math.PI / 2),
      Math.sin(value * 2 * Math.PI / range - Math.PI / 2),
      value
    ];
  }

  calculatePolarAngle(value: number, domain: number[]): number {
    value = this.normalize(value, domain);

    return value * 2 * Math.PI / domain[2];
  }
}
