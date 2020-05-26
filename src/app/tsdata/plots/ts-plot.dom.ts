import {PageEvent} from '@angular/material/paginator';
import {DetrendingType, TSSort} from '../ts-data-dom';

export class Timepoint {

  constructor(public x: number, public y: number) {
  }

}


export class Trace {

  key?: any;
  traceNr?: number;
  dataId?: number;
  traceRef?: number;
  label: string;
  fill = false;
  data: Timepoint[] = [];
  min: number;
  max: number;
  mean: number;

}


export class TraceSet {

  title: string;
  traces: Trace[] = [];
  totalTraces = 0;
  currentPage: PageEvent;
  detrending: DetrendingType;
  sort: TSSort;
}
