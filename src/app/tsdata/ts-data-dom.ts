export class DetrendingType {

  static NO_DTR = new DetrendingType('NO_DTR', 'no dtr');
  static LIN_DTR = new DetrendingType('LIN_DTR', 'linear dtr');
  static POLY_DTR = new DetrendingType('POLY_DTR', 'cubic dtr');
  static BASE_DTR = new DetrendingType('BASE_DTR', 'baseline dtr');
  static BAMP_DTR = new DetrendingType('BAMP_DTR', 'amp&baseline dtr');

  private static values = [
    DetrendingType.NO_DTR,
    DetrendingType.LIN_DTR,
    DetrendingType.POLY_DTR,
    DetrendingType.BASE_DTR,
    DetrendingType.BAMP_DTR,
  ];

  private static valuesMap: Map<string, DetrendingType>;

  protected constructor(private _name: string, private _label: string) {
  }

  get name() {
    return this._name;
  }

  get label() {
    return this._label;
  }

  static get(name: string): DetrendingType {
    return DetrendingType.getValuesMap().get(name);
  }

  protected static getValuesMap(): Map<string, DetrendingType> {
    if (!DetrendingType.valuesMap) {
      const map = new Map<string, DetrendingType>();
      DetrendingType.values.forEach(v => map.set(v.name, v));
      DetrendingType.valuesMap = map;
    }
    return DetrendingType.valuesMap;
  }

  toJSON(): string {
    return this.name;
  }

  /* tslint:disable:curly */
  equals(other: any) {
    if (!other) return false;
    if (this === other) return true;
    if (this === DetrendingType.get(other.name ? other.name : other)) return true;
    return false;
  }

  /* tslint:enable:curly */
}


export const DetrendingTypeOptions = [
  DetrendingType.NO_DTR,
  DetrendingType.LIN_DTR,
  DetrendingType.POLY_DTR,
  DetrendingType.BASE_DTR,
  DetrendingType.BAMP_DTR
];

export class TSOption {
  constructor(public name: string, public label: string) {
  }
}

export const NormalisationOptions = [
  new TSOption('NO_NORM', 'none'),
  // new TSOption('MEAN_NORM', 'to mean'),
  new TSOption('RANGE', 'to [-1,1]'),
  new TSOption('FOLD', 'fold change'),
  new TSOption('Z_SCORE', 'Z-Score'),
  new TSOption('MAX_NORM', 'to extreme')
];

export const AlignOptions = [
  new TSOption('NONE', 'none'),
  new TSOption('MEAN', 'mean'),
  new TSOption('SPREAD', 'spread')
];

export class TimeSeriesMetrics {
  public maxDuration: number;
  public minDuration: number;
  public avgDuration: number;

  public maxPoints: number;
  public minPoints: number;
  public avgPoints: number;

  public maxStep: number;
  public minStep: number;
  public avgStep: number;

  public maxPointsPerHour: number;
  public minPointsPerHour: number;
  public avgPointsPerHour: number;

  public maxFirstTime: number;
  public minFirstTime: number;
  public avgFirstTime: number;

  public maxLastTime: number;
  public minLastTime: number;
  public avgLastTime: number;

  public maxValue: number;
  public minValue: number;
  public avgValue: number;

  public series: number;
  public uniformMetrics: boolean;
}
