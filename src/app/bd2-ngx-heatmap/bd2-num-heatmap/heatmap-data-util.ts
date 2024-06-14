import {BoxDef, BoxSerie, Point, Serie} from '../bd2-heatmap.dom';

export class HeatmapDataUtil {



  seriesToBoxes(series: Serie[], asymmetric = false): BoxSerie[] {
    return series.map(s => this.serieToBoxes(s, asymmetric));
  }

  serieToBoxes(org: Serie, asymmetric = false): BoxSerie {

    const cpy = Object.assign(new BoxSerie(), org);
    cpy.data = asymmetric ? this.pointsToAsymBoxes(org.data) : this.pointsToSymBoxes(org.data);
    return cpy;
  }

  pointsToAsymBoxes(points: Point[], defMargin = 0.5): BoxDef[] {
    if (!points || points.length === 0) { return []; }

    if (points.length === 1) {
      const point = points[0];
      return [new BoxDef(point.x, point.y, point.x - defMargin, point.x + defMargin)];
    }

    const boxes = [];
    const first = points[0];
    boxes.push(new BoxDef(first.x, first.y, (3 * first.x - points[1].x) / 2, (first.x + points[1].x) / 2));

    for (let i = 1; i < (points.length - 1); i++) {
      boxes.push(this.asymBoxFromPoints(points[i], points[i - 1], points[i + 1]));
    }

    const last = points[points.length - 1];
    boxes.push(new BoxDef(last.x, last.y, (points[points.length - 2].x + last.x) / 2, (3 * last.x - points[points.length - 2].x) / 2));

    return boxes;
  }

  asymBoxFromPoints(point: Point, prev: Point, next: Point) {
    return new BoxDef(point.x, point.y, (prev.x + point.x) / 2, (point.x + next.x) / 2);
  }

  pointsToSymBoxes(points: Point[], defMargin = 0.5): BoxDef[] {
    if (!points || points.length === 0) { return []; }

    if (points.length === 1) {
      const point = points[0];
      return [new BoxDef(point.x, point.y, point.x - defMargin, point.x + defMargin)];
    }

    const boxes = [];
    const first = points[0];
    boxes.push(new BoxDef(first.x, first.y, (3 * first.x - points[1].x) / 2, (first.x + points[1].x) / 2));

    for (let i = 1; i < (points.length - 1); i++) {
      boxes.push(this.symBoxFromPoints(points[i], points[i - 1], points[i + 1]));
    }

    const last = points[points.length - 1];
    boxes.push(new BoxDef(last.x, last.y, (points[points.length - 2].x + last.x) / 2, (3 * last.x - points[points.length - 2].x) / 2));

    return boxes;
  }

  symBoxFromPoints(point: Point, prev: Point, next: Point) {
    const defL = point.x - prev.x;
    const defR = next.x - point.x;
    const def = Math.min(defL, defR) / 2;
    return new BoxDef(point.x, point.y, point.x - def, point.x + def);
  }
}
