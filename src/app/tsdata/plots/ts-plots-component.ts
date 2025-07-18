import {Component, Input, OnInit} from '@angular/core';
import {Trace, TraceSet} from './ts-plot.dom';
import { BD2ColorPalette } from '../../graphic/color/color-palette';

@Component({
    selector: 'bd2-ts-plots',
    template: `

@for (dataset of datasets; track trackByIx(i, dataset); let i = $index) {
  <div>
    <h4>{{(i+1)}}. {{dataset.title}}</h4>
    <bd2-ts-plot
      [data]="dataset"
    ></bd2-ts-plot>
  </div>
}

`,
    standalone: false
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

  setTraceStyle(trace: Trace, index: number, tracesPerPlot: number) {
    const colors = BD2ColorPalette.palette(tracesPerPlot);
    const pointStyles = ['circle', 'rect', 'triangle', 'rectRot', 'rectRounded'];
    const pointRadii = [3, 4, 5, 4, 4];

    const color = colors[index % colors.length];
    trace.borderColor = BD2ColorPalette.toRGBA(color, 0.8);
    trace.backgroundColor = BD2ColorPalette.toRGBA(color, 0.2);
    trace.pointBackgroundColor = color;
    trace.pointBorderColor = '#ffffff';
    trace.pointStyle = pointStyles[index % pointStyles.length];
    trace.pointRadius = pointRadii[index % pointRadii.length];
    trace.pointHoverRadius = pointRadii[index % pointRadii.length] + 1;
  }

  @Input()
  set data(traces: Trace[]) {
    if (!traces) {
      return;
    }
    
    const sets = this.split(traces, this.tracesPerPlot)
      .map(ts => {
        ts.forEach((trace, i) => this.setTraceStyle(trace, i, this.tracesPerPlot));
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
