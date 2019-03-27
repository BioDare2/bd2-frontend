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

}
