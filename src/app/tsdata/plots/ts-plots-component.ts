import {Component, Input, OnInit} from '@angular/core';
import {Trace, TraceSet} from './ts-plot.dom';

@Component({
  selector: 'bd2-ts-plots',
  template: `

  <div *ngFor="let dataset of datasets; let i = index; trackBy:trackByIx">
    <h4>{{(i+1)}}. {{dataset.title}}</h4>
    <bd2-ts-plot
      [data]="dataset"
    ></bd2-ts-plot>
  </div>

`
})
export class TSPlotsComponent implements OnInit {

  @Input()
  tracesPerPlot = 7;


  datasets: TraceSet[] = [];

  constructor() {

    // let set = TSPlotsComponent.fakeSet(100);
    // this.data = set.traces;
    // console.log(JSON.stringify(this.dataset));
  }

  @Input()
  set data(traces: Trace[]) {
    if (!traces) {
      return;
    }
    const sets = this.split(traces, this.tracesPerPlot)
      .map(ts => {
        const set = new TraceSet();
        set.traces = ts;
        return set;
      });

    this.datasets = sets;

  }

  ngOnInit() {
  }

  trackByIx(index: number, dataset: any) {
    // console.log("TBX: "+index+":"+ dataset.title);
    return index;
  }

  split(traces: Trace[], size: number): Trace[][] {

    const chunks: Trace[][] = [];

    let i = 0;
    for (; (i + size) < traces.length; i += size) {
      const chunk = traces.slice(i, i + size);
      chunks.push(chunk);
    }

    if (i < traces.length) {
      chunks.push(traces.slice(i, traces.length));
    }

    return chunks;
  }


}
