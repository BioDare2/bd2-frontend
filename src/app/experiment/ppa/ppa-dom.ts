import {DetrendingType} from '../../tsdata/ts-data-dom';

export class PPAMethod {

  static NLLS = new PPAMethod('NLLS', 'FFT NLLS');
  static MFourFit = new PPAMethod('MFourFit', 'MFourFit');
  static MESA = new PPAMethod('MESA', 'MESA');
  static EPR = new PPAMethod('EPR', 'ER Periodogram');
  static EPR_ND = new PPAMethod('EPR_ND', 'ER Periodogram (no DT)');
  static LSPR = new PPAMethod('LSPR', 'LS Periodogram');
  static SR = new PPAMethod('SR', 'Spectrum Resampling');
  static SR_LD = new PPAMethod('SR_LD', 'Spectrum Resampling (lin DT)');
  static FAKE = new PPAMethod('FAKE', 'Fake method');


  private static values = [
    PPAMethod.NLLS,
    PPAMethod.MFourFit,
    PPAMethod.MESA,
    PPAMethod.EPR,
    PPAMethod.EPR_ND,
    PPAMethod.LSPR,
    PPAMethod.SR,
    PPAMethod.SR_LD,
    PPAMethod.FAKE,
  ];

  private static valuesMap: Map<string, PPAMethod>;

  protected constructor(private _name: string, private _label: string) {
  }

  /* tslint:enable:curly */

  get name() {
    return this._name;
  }

  get label() {
    return this._label;
  }

  static get(name: string): PPAMethod {
    return PPAMethod.getValuesMap().get(name);
  }

  /* tslint:disable:curly */
  protected static getValuesMap(): Map<string, PPAMethod> {
    if (!PPAMethod.valuesMap) PPAMethod.valuesMap = PPAMethod.initValuesMap();
    return PPAMethod.valuesMap;
  }

  protected static initValuesMap(): Map<string, PPAMethod> {
    const map = new Map<string, PPAMethod>();
    PPAMethod.values.forEach(m => map.set(m.name, m));
    return map;
  }

  toJSON(): string {
    return this.name;
  }
}


export const EnabledPPAMethodOptions = [
  PPAMethod.NLLS,
  PPAMethod.MFourFit,
  PPAMethod.MESA,
  PPAMethod.EPR,
  PPAMethod.LSPR,
  PPAMethod.SR
];


export class PPARequest {
  windowStart: number;
  windowEnd: number;
  periodMin: number;
  periodMax: number;
  method: PPAMethod;
  detrending: DetrendingType;

  /* tslint:disable:curly */
  isValid(): boolean {
    if (this.windowStart < 0 || this.windowEnd < 0 || this.periodMin <= 0 || this.periodMax <= 0) return false;
    if (this.periodMin > this.periodMax) return false;
    if (this.windowEnd > 0 && this.windowStart >= this.windowEnd) return false;
    if (this.method === null || this.method === undefined) return false;
    if (this.detrending === null || this.detrending === undefined) return false;
    return true;
  }

  /* tslint:enable:curly */
}


export class PPAJobSummary {

  jobId: number;
  parentId: number;
  reloaded: boolean;

  state: string;
  submitted: number;
  modified: number;
  completed: number;
  message: string;
  lastError: string;
  attentionCount: number;
  failures: number;
  needsAttention: boolean;
  closed: boolean;

  summary: string;

  method: string;
  dataWindow: string;
  dataWindowStart: number;
  dataWindowEnd: number;
  min_period: number;
  max_period: number;
  dataSetId: string;
  dataSetType: string;
  dataSetTypeName: string;

  static sameJob(def1: PPAJobSummary, def2: PPAJobSummary) {
    if (!def1 || !def2 ) { return false; }

    return def1.jobId === def2.jobId && def1.parentId === def2.parentId;
  }

}

export class ValuesByPhase {
  m: number;
  f: number;
  p: number;
  a: number;
}

export class ArraysByPhase {
  m: number[];
  f: number[];
  p: number[];
  a: number[];
}

export function valueFromPhaseName(c: ValuesByPhase | ArraysByPhase, name: string): number | number[] {
  switch (name) {
    case 'ByFit':
    case 'f':
      return c.f;
    case 'ByMethod':
    case 'm':
      return c.m;
    case 'ByFirstPeak':
    case 'p':
      return c.p;
    case 'ByAvgMax':
    case 'a':
      return c.a;
    default: {
      throw new Error('Unknown phase option: ' + name);
    }
  }
}

export class PPASimpleStats {

  memberDataId: number;
  rawId: number;
  bioId: number;
  envId: number;

  label: string;
  N: number;
  ERR: number;
  GOF: number;
  per: number;
  perStd: number;

  ph2Z: ValuesByPhase;
  ph2W: ValuesByPhase;
  ph2ZCir: ValuesByPhase;
  ph2WCir: ValuesByPhase;

  phStd: ValuesByPhase;
  phStdCir: ValuesByPhase;

  amp: ValuesByPhase;
  ampStd: ValuesByPhase;
}

export class PPASimpleResultEntry {
  jobId: number;

  dataId: number;
  rawId: number;
  bioId: number;
  envId: number;
  dType: string;
  orgId: string;
  dataRef: string;
  label: string;

  summary: string;
  message: string;

  ignored: boolean;
  circadian: boolean;
  attention: boolean;
  failed: boolean;


  ERR: number;
  GOF: number;

  per: number;
  perE: number;

  ph2Z: ValuesByPhase;
  ph2W: ValuesByPhase;
  ph2ZCir: ValuesByPhase;
  ph2WCir: ValuesByPhase;

  phE: number;
  phECir: number;

  amp: ValuesByPhase;
  ampE: number;

  static extractState(res: PPASimpleResultEntry): string {
    if (res.failed) {
      return 'F';
    }
    // there is a space here so sorting will look like A before I
    if (res.ignored) {
      return ' I';
    }
    if (res.attention) {
      return 'A';
    }
    return '';
  }
}

export function phaseValuesFromOptions(entry: PPASimpleStats | PPASimpleResultEntry,
                                       relativeTo: string, phaseUnit: string): ValuesByPhase {
  if (relativeTo === 'zero' && phaseUnit === 'circ') {
    return entry.ph2ZCir;
  }
  if (relativeTo === 'zero' && phaseUnit === 'abs') {
    return entry.ph2Z;
  }
  if (relativeTo === 'dw' && phaseUnit === 'circ') {
    return entry.ph2WCir;
  }
  if (relativeTo === 'dw' && phaseUnit === 'abs') {
    return entry.ph2W;
  }
  throw new Error('Unknown relative/unit combination: ' + relativeTo + ':' + phaseUnit);

}

export class PPAStatsGroup {
  label: string;
  stats: PPASimpleStats[];
}

export class PPAJobSimpleStats {
  jobId: number;
  stats: PPASimpleStats[] = [];
}

export class PPAJobStats {
  jobId: number;
  label: string;
  groups: PPAStatsGroup[];
}

export class PPAResultEntry {
  jobId: number;
  dataId: number;
  dataRef: string;
  jobSummary: string;

  isIgnored: boolean;
  isCircadian: boolean;
  needsAttention: boolean;
  hasFailed: boolean;

  message: string;

  period: number;
  ERR: number;
  GOF: number;

  phaseToZero: ValuesByPhase;
  phaseToWindow: ValuesByPhase;
  phaseToZeroCirc: ValuesByPhase;
  phaseToWindowCirc: ValuesByPhase;

  amplitude: ValuesByPhase;
}


export class PPAResultsGroup {

  rawDataId: number;
  dataRef: string;
  label: string;
  results: PPASimpleResultEntry[];
}

export class PPAJobSimpleResults {
  jobId: number;
  results: PPASimpleResultEntry[];
}

export class PPASelectItem {

  id: number;
  selected: boolean;
  period: number;
  phase: number;
  amplitude: number;
  GOF: number;
  ERR: number;
}

export class PPASelectGroup {

  dataId: number;
  dataRef: string;
  label: string;
  selected: string;

  needsAttention: boolean;
  isIgnored: boolean;
  isCircadian: boolean;

  periods: PPASelectItem[];

}

export class FitSelection {
  jobId: number;
  dataId: number;
  selected: string;
}


export class PPAResultsGroupSummary {
  memberDataId: number;
  rawId: number;
  bioId: number;
  envId: number;
  label: string;

  failures: number;
  excluded: number;

  periods: number[];
  phases2Z: ArraysByPhase;
  phases2W: ArraysByPhase;
  phases2ZCir: ArraysByPhase;
  phases2WCir: ArraysByPhase;
  amps: ArraysByPhase;

}

export class PPAJobResultsGroups {
  jobId: number;
  periodMin: number;
  periodMax: number;
  groups: PPAResultsGroupSummary[];
}
