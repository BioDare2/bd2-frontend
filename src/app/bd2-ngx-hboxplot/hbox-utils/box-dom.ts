
export class BoxDefinition {
  median: number;
  mean: number;
  fstQnt: number;
  thrdQnt: number;
  lowWskr: number;
  highWskr: number;
  outliers: number[] = [];
  ix: number;
  key: string;
  label: string;
  color: string;
  hidden: boolean;
}
