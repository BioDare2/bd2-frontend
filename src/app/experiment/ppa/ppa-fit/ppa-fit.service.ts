import {Injectable} from '@angular/core';
import {PPAFitPack} from './ppa-fit.dom';
import {BioDareRestService} from '../../../backend/biodare-rest.service';
import {Timepoint, Trace, TraceSet} from '../../../tsdata/plots/ts-plot.dom';


@Injectable({
  providedIn: 'root'
})
export class PPAFitService {

  constructor(private BD2REST: BioDareRestService) {
  }

  getFit(expId: number, jobId: string, dataId: number, selectable: boolean): Promise<PPAFitPack> {

    // return Promise.resolve(this.fakeFit());
    return this.BD2REST.ppaFit(expId, jobId, dataId, selectable);
    //  .then( obj => obj);
  }

  fakeFit(): PPAFitPack {

    const pack = new PPAFitPack();
    pack.traces = new TraceSet();
    pack.traces.title = '1. WT';

    let t = this.fakeTrace('WT');
    pack.traces.traces.push(t);
    t = this.fakeTrace('fit');
    pack.traces.traces.push(t);
    t = this.fakeTrace('24.23');
    pack.traces.traces.push(t);
    t = this.fakeTrace('30.15');
    pack.traces.traces.push(t);

    pack.options.push({id: '2423', label: '24.23', selected: false});
    pack.options.push({id: '35220', label: '35.22', selected: false});

    return pack;
  }


  fakeTrace(label: string): Trace {

    const trace = new Trace();
    trace.label = label;

    const N = 100;
    const P = 20 + Math.random() * 10;
    const A = 1 + Math.random();

    for (let i = 0; i < N; i++) {
      trace.data.push(new Timepoint(i, A * Math.cos(i * 2 * 3.14 / P)));
    }

    return trace;
  }

}
