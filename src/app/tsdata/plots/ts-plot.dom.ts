import { PageEvent } from '@angular/material/paginator';
import {DetrendingType} from '../ts-data-dom';

export class Timepoint {

  constructor(public x: number, public y: number) {
  }

}


export class Trace {

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
}
