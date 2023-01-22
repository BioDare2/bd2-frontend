import {Component, Input, OnInit} from '@angular/core';
import {TraceSet} from './ts-plot.dom';

@Component({
  selector: 'bd2-ts-plot',
  template: `

    <div *ngIf="dataset" style="display: block;">
    <canvas baseChart width="auto" height="200"
                [type]="'line'"
                [datasets]="dataset.traces"
                [options]="scatterOptions"
                ></canvas>
    </div>


`
})
export class TSPlotComponent implements OnInit {

  // static counter:number = 0;

  dataset: TraceSet;

  scatterOptions: any;

  constructor() {

    // this.id = TSPlotComponent.counter++;

    // console.log("Created P: "+this.id+":"+this.ix);
    this.scatterOptions = {
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom',
          /*ticks: {
              fixedStepSize: 24
          }*/
        }]
      },
      legend: {
        display: true,
        position: 'bottom'
      }
    };
  }

  // @Input()
  // ix:number;

  // id:number;

  @Input()
  set data(data: TraceSet) {
    this.dataset = data;
  }

  ngOnInit() {
    // console.log("Initiated P: "+this.id+":"+this.ix);
  }

  // events
  public chartClicked(e: any): void {
    // console.log(e);
    /*if (e.active) {
        e.active.forEach( v => {
              console.log(v);
          }
        )
    }*/
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

}
