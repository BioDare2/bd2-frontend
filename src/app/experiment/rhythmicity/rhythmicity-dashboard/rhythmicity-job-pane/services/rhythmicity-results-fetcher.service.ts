import {Sort} from '@angular/material/sort';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {BD2eJTKRes, JobResults, JTKPattern, RhythmicityJobSummary, StatTestOptions, TSResult} from '../../../rhythmicity-dom';
import {RhythmicityService} from '../../../rhythmicity.service';
import {Inject, Injectable, Optional} from '@angular/core';
import {PageableSortableArraysFetcherService} from '../../../../../fetching-services/pageable-sortable-arrays-fetcher.service';
import {REMOVE_DEBOUNCE} from '../../../../../shared/tokens';


@Injectable()
// tslint:disable-next-line:max-line-length
export class RhythmicityResultsFetcherService extends PageableSortableArraysFetcherService<RhythmicityJobSummary, StatTestOptions, JobResults<BD2eJTKRes>, TSResult<BD2eJTKRes>> {

  readonly results$: Observable<TSResult<BD2eJTKRes>[]>;

  constructor(private rhythmicityService: RhythmicityService,
              @Inject(REMOVE_DEBOUNCE) @Optional() removeDebounce = false) {

    super(removeDebounce);

    this.results$ = this.data$;
  }

  public isClassicJob() {
    return this.currentInput?.parameters?.METHOD === 'BD2JTK';
  }
  /*
  pvalue(val: number) {
    if (val != null && val !== undefined) {
      const current = this.currentParams || [undefined, undefined];
      this.params( [val, current[1]]);
    }
  }

  bhCorrection(val: boolean) {
    if (val != null && val !== undefined) {
      const current = this.currentParams || [undefined, undefined];
      this.params( [current[0], val]);
    }
  }*/

  protected sameInput(def1: RhythmicityJobSummary, def2: RhythmicityJobSummary): boolean {
    return RhythmicityJobSummary.sameJob(def1, def2);
  }

  protected assetToData(asset: JobResults<BD2eJTKRes>, params?: StatTestOptions): TSResult<BD2eJTKRes>[] {
    return asset.results;
  }

  protected fetchAsset(job: RhythmicityJobSummary): Observable<JobResults<BD2eJTKRes>> {
    return this.rhythmicityService.getResults(job.parentId, job.jobId).pipe(
      // tap( r => console.log('Fetched results', r)),
      tap( res => this.labelPatterns(res))
    );
  }

  protected sortingKey(sort: Sort): (s: TSResult<BD2eJTKRes>) => any {
    switch (sort.active) {
      case 'label': return  s => s.label;
      case 'id': return s => +s.id;
      case 'empp': return s => +s.result.empP;
      case 'emppbh': return s => +s.result.empPBH;
      case 'p': return s => +s.result.p;
      case 'pbh': return s => +s.result.pBH;
      case 'tau': return s => +s.result.tau;
      case 'period': return s => s.result.pattern.period;
      case 'peak': return s => s.result.pattern.peak;
      case 'trough': return s => s.result.pattern.trough;
      default: {
        console.error('Not implemented sorting for ' + sort.active);
        return s => 0;
      }
    }
  }



  protected processData(data: TSResult<BD2eJTKRes>[], params: StatTestOptions) {
    if (!params) { return data; }
    // const pValue = params[0] || 0;
    // const bhCorrected = params[1];

    this.rankResults(data, params.pValue, params.bhCorrection, this.isClassicJob());
    return data;
  }

  protected labelPatterns(jobRes: JobResults<BD2eJTKRes>) {

    jobRes.results.forEach( res => {
      res.result.patternLabel = this.describePattern(res.result);
      res.result.pattern.shapeLabel = this.patternToShape(res.result.pattern);
    } );
  }

  protected describePattern(res: BD2eJTKRes) {
    const pattern = res.pattern;
    const period = Math.round(pattern.period * 10) / 10;
    const peak = Math.round(pattern.peak * 100) / 100;
    const trough = Math.round(pattern.trough * 100) / 100;
    const shape = this.patternToShape(pattern);

    return `${shape}\t${period}\t${peak}\t${trough}`;
  }

  protected patternToShape(pattern: JTKPattern) {
    switch (pattern.waveform) {
      case 'ASYM_COSINE': {
        if (pattern.leftPortion === 0.5) { return 'COS';
        } else {
          return 'ACOS';
        }
      }
      case 'ASYM_COS_SPIKE': return 'SPIKE';
      case 'ASYM_COS_SPIKE_NEG': return 'NPIKE';
      default: return pattern.waveform;
    }
  }

  protected rankResults(jobRes: TSResult<BD2eJTKRes>[], pvalue: number, bhCorrected: boolean, classic: boolean) {
    jobRes.forEach( res => {
      const ejtkR = res.result;
      let p: number;
      if (classic) {
        p = bhCorrected ? ejtkR.pBH : ejtkR.p;
      } else {
        p = bhCorrected ? ejtkR.empPBH : ejtkR.empP;
      }
      ejtkR.rhythmic = p < pvalue;
    });
  }

  /*

  isFinished(job: RhythmicityJobSummary) {
    if (!job) { return false; }
    return job.jobStatus.state === 'SUCCESS';
  }
  */

}


