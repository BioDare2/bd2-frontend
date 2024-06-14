import {BoxDefinition} from './box-dom';
//import {d3} from '../d3service';
import * as d3 from 'd3';

export class BoxUtil {

  dataToBoxes(data: number[][]): BoxDefinition[] {
    if (!data) {
      return [];
    }


    return data.map((v, ix) => {
      const b = this.datumToBox(v);
      b.ix = ix;
      b.key = (ix + 1) + '.';
      return b;
    });
  }

  datumToBox(data: number[]): BoxDefinition {

    const box = new BoxDefinition();
    if (!data || data.length === 0) {
      return box;
    }

    data = data.sort(d3.ascending);
    box.mean = d3.mean(data);
    box.median = d3.median(data);
    box.fstQnt = d3.quantile(data, 0.25);
    box.thrdQnt = d3.quantile(data, 0.75);

    const iqr = 1.5 * (box.thrdQnt - box.fstQnt);
    box.lowWskr = box.fstQnt - iqr;
    box.highWskr = box.thrdQnt + iqr;

    for (let i = 0; i < data.length; i++) {
      if (data[i] >= box.lowWskr) {
        box.lowWskr = data[i];
        break;
      }
    }

    for (let i = data.length - 1; i >= 0; i--) {
      if (data[i] <= box.highWskr) {
        box.highWskr = data[i];
        break;
      }
    }


    box.outliers = data.filter(v => (v < box.lowWskr || v > box.highWskr));
    return box;
  }

  mockEmptyValues(boxes: BoxDefinition[], missingVal: number) {
    boxes.forEach(box => {
      if (box.mean === undefined || box.mean === null) {
        box.mean = missingVal;
        box.median = missingVal;
        box.fstQnt = missingVal;
        box.thrdQnt = missingVal;
        box.lowWskr = missingVal;
        box.highWskr = missingVal;
      }
    });
  }
}
