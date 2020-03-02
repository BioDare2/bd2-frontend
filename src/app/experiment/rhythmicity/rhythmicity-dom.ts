import {DetrendingType} from '../../tsdata/ts-data-dom';


export class RhythmicityMethod {

  static BD2EJTK = new RhythmicityMethod('BD2EJTK', 'BD2 eJTK');
  static BD2JTK = new RhythmicityMethod('BD2JTK', 'simple JTK');

  private static values = [
    RhythmicityMethod.BD2JTK,
    RhythmicityMethod.BD2EJTK

  ];

  private static valuesMap: Map<string, RhythmicityMethod>;

  // tslint:disable-next-line:variable-name
  protected constructor(private _name: string, private _label: string) {
  }

  /* tslint:enable:curly */

  get name() {
    return this._name;
  }

  get label() {
    return this._label;
  }

  static get(name: string): RhythmicityMethod {
    return RhythmicityMethod.getValuesMap().get(name);
  }

  /* tslint:disable:curly */
  protected static getValuesMap(): Map<string, RhythmicityMethod> {
    if (!RhythmicityMethod.valuesMap) RhythmicityMethod.valuesMap = RhythmicityMethod.initValuesMap();
    return RhythmicityMethod.valuesMap;
  }

  protected static initValuesMap(): Map<string, RhythmicityMethod> {
    const map = new Map<string, RhythmicityMethod>();
    RhythmicityMethod.values.forEach(m => map.set(m.name, m));
    return map;
  }

  toJSON(): string {
    return this.name;
  }
}

export const EnabledRhythmicityMethodOptions = [
  RhythmicityMethod.BD2JTK, RhythmicityMethod.BD2EJTK,
];


export class EJTPreset {

  static EJTK_CLASSIC = new EJTPreset('EJTK_CLASSIC', 'eJTK Classic');
  static BD2_CLASSIC = new EJTPreset('BD2_CLASSIC', 'BD2 Classic');
  static BD2_SPREAD = new EJTPreset('BD2_SPREAD', 'Period range');
  static COS_1H = new EJTPreset('COS_1H', 'Cosine 24h 1h');
  static COS_2H = new EJTPreset('COS_2H', 'Cosine 24h 2h');
  static COS_4H = new EJTPreset('COS_4H', 'Cosine 24h 4h');


  private static values = [
    EJTPreset.COS_1H,
    EJTPreset.COS_2H,
    EJTPreset.COS_4H,
    EJTPreset.EJTK_CLASSIC,
    EJTPreset.BD2_CLASSIC,
    EJTPreset.BD2_SPREAD,
  ];

  private static valuesMap: Map<string, EJTPreset>;

  // tslint:disable-next-line:variable-name
  protected constructor(private _name: string, private _label: string) {
  }

  /* tslint:enable:curly */

  get name() {
    return this._name;
  }

  get label() {
    return this._label;
  }

  static get(name: string): EJTPreset {
    return EJTPreset.getValuesMap().get(name);
  }

  /* tslint:disable:curly */
  protected static getValuesMap(): Map<string, EJTPreset> {
    if (!EJTPreset.valuesMap) EJTPreset.valuesMap = EJTPreset.initValuesMap();
    return EJTPreset.valuesMap;
  }

  protected static initValuesMap(): Map<string, EJTPreset> {
    const map = new Map<string, EJTPreset>();
    EJTPreset.values.forEach(m => map.set(m.name, m));
    return map;
  }

  toJSON(): string {
    return this.name;
  }
}

export const EnabledEJTPresetOptions = [
  EJTPreset.COS_1H,
  EJTPreset.COS_2H,
  EJTPreset.COS_4H,
  EJTPreset.EJTK_CLASSIC,
  EJTPreset.BD2_CLASSIC
];

export class RhythmicityRequest {
  windowStart: number;
  windowEnd: number;
  periodMin: number;
  periodMax: number;
  method: RhythmicityMethod;
  preset: EJTPreset;
  detrending: DetrendingType;

  /* tslint:disable:curly */
  isValid(): boolean {
    if (this.windowStart < 0 || this.windowEnd < 0 || this.periodMin <= 0 || this.periodMax <= 0) return false;
    if (this.periodMin > this.periodMax) return false;
    if (this.windowEnd > 0 && this.windowStart >= this.windowEnd) return false;
    if (this.method === null || this.method === undefined) return false;
    if (this.preset === null || this.preset === undefined) return false;
    if (this.detrending === null || this.detrending === undefined) return false;
    return true;
  }

  /* tslint:enable:curly */
}

export class JobStatus {

  jobId: string;
  state: string;
  submitted: number;
  modified: number;
  completed: number;
  message: string;
}

export class RhythmicityJobSummary {
  jobId: string;
  parentId: number;
  reloaded: boolean;
  jobStatus: JobStatus;

  parameters: any;

  static sameJob(def1: RhythmicityJobSummary, def2: RhythmicityJobSummary) {
    if (!def1 || !def2 ) { return false; }

    return def1.jobId === def2.jobId && def1.parentId === def2.parentId;
  }
}

export class JTKPattern {
  period: number;
  leftPortion: number;
  peak: number;
  trough: number;
  waveform: string;
  width: number;
  shapeLabel: string;
}

export class BD2eJTKRes {
  id: number;
  rhythmic: boolean;
  tau: number;
  p: number;
  pBH: number;
  bfP: number;
  bfPBH: number;
  empP: number;
  empPBH: number;
  // gammaP: number;
  // gammaPBH: number;
  // tsCharacteristic: any;
  pattern: JTKPattern;
  patternLabel: string;

}

export class TSResult<R> {
  id: number;
  label: string;
  result: R;
}

export class JobResults<R> {
  UUID: string;
  externalId: string;
  state: string;
  message: string;

  results: TSResult<R>[] = [];
}

export class StatTestOptions {
  constructor(public pValue = 0, public bhCorrection = false,
              public showPattern = false, public circadian = false
              ) {
  }

  clone() {
    return new StatTestOptions(this.pValue, this.bhCorrection, this.showPattern, this.circadian);
  }
}


