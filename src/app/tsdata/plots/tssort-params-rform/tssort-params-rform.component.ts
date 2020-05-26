import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RhythmicityJobSummary} from '../../../experiment/rhythmicity/rhythmicity-dom';
import {PPAJobSummary} from '../../../experiment/ppa/ppa-dom';
import { shortUUID } from 'src/app/shared/collections-util';
import {LocalDateTime} from '../../../dom/repo/shared/dates';
import {TSSort} from '../../ts-data-dom';
import {Subscription} from 'rxjs';

@Component({
  selector: 'bd2-tssort-params-rform',
  templateUrl: './tssort-params-rform.component.html',
  styles: [
    `
      mat-radio-button {
        margin-right: 0.5em;
      }
    `
  ]
})
export class TSSortParamsRFormComponent implements OnInit, OnDestroy {

  @Output()
  sorting = new EventEmitter<TSSort>();

  @Input()
  set rhythmJobs(jobs: RhythmicityJobSummary[]) {
    this._rhythmJobs = jobs;
    this.noRhythm = !jobs || jobs.length < 1;
    this.sortParamsForm.get('rhythmJobId').setValue( this.noRhythm ? undefined : jobs[0].jobId);
  };

  get rhythmJobs() {
    return this._rhythmJobs;
  }

  @Input()
  set ppaJobs(jobs: PPAJobSummary[]) {
    this._ppaJobs = jobs;
    this.noPPA = !jobs || jobs.length < 1;
    this.sortParamsForm.get('ppaJobId').setValue( this.noPPA ? undefined : jobs[0].jobId);
  };

  get ppaJobs() {
    return this._ppaJobs;
  }


  noPPA = true;
  noRhythm = true;

  mainForm: FormGroup;
  sortParamsForm: FormGroup;

  private _rhythmJobs: RhythmicityJobSummary[] = [];
  private _ppaJobs: PPAJobSummary[] = [];
  private valuesSubscription: Subscription;


  constructor(protected fb: FormBuilder) {

    this.sortParamsForm = this.buildSortParamsForm(fb);
    this.mainForm = this.buildMainForm(this.sortParamsForm, fb);

    this.ppaJobs = [];
    this.rhythmJobs = [];
  }

  ngOnInit(): void {

    const j = JSON.parse(
      '[{"jobId":"f10c47fb-3478-4a50-9d86-5d755272ed56","parentId":10271,"jobStatus":{"jobId":"f10c47fb-3478-4a50-9d86-5d755272ed56","state":"SUCCESS","submitted":[2020,1,17,15,57,13,43377100],"modified":[2020,1,17,15,57,13,43377100],"completed":[2020,1,17,15,57,13,248938400],"message":"OK"},"parameters":{"NULL_SIZE":"100000","DW_END":"48.0","PERIOD_MIN":"24.0","DATA_SET_ID":"10271_NO_DTR","PERIOD_MAX":"24.0","DW_START":"0.0","PRESET":"EJTK_CLASSIC","METHOD":"BD2EJTK","DATA_SET_TYPE_NAME":"no dtr","PARAMS_SUMMARY":"no dtr min-48.0 p(24.0)","DATA_SET_TYPE":"NO_DTR"}}]');

    this.rhythmJobs = j;

    const j2 = JSON.parse('[{"jobId":"4c720dc3-705f-44a5-a1b7-647aad2093ca","oldId":994,"parentId":10271,"state":"FINISHED","submitted":[2020,2,19,18,53,16,877000000],"modified":[2020,2,19,18,53,18,68000000],"completed":[2020,2,19,18,53,18,68000000],"message":null,"lastError":null,"attentionCount":0,"failures":0,"needsAttention":false,"closed":true,"summary":"linear dtr min-max p(18.0-34.0)","method":"MESA","dataWindow":"min-max","dataWindowStart":0.0,"dataWindowEnd":0.0,"min_period":18.0,"max_period":34.0,"dataSetId":"10271_LIN_DTR","dataSetType":"LIN_DTR","dataSetTypeName":"linear dtr","selections":null},{"jobId":"4b5450c1-f7b0-4fdd-a623-ef99765925cb","oldId":983,"parentId":10271,"state":"FINISHED","submitted":[2020,1,17,15,57,25,943000000],"modified":[2020,1,17,15,57,26,853000000],"completed":[2020,1,17,15,57,26,853000000],"message":null,"lastError":null,"attentionCount":5,"failures":0,"needsAttention":true,"closed":true,"summary":"linear dtr min-max p(18.0-34.0)","method":"NLLS","dataWindow":"min-max","dataWindowStart":0.0,"dataWindowEnd":0.0,"min_period":18.0,"max_period":34.0,"dataSetId":"10271_LIN_DTR","dataSetType":"LIN_DTR","dataSetTypeName":"linear dtr","selections":null}]');
    this.ppaJobs = j2;

    this.valuesSubscription = this.mainForm.valueChanges.subscribe( val => {
      const sort = val as TSSort;
      sort.direction = val.isAscending ? 'asc' : 'desc';
      this.sorting.next(sort);
    });
  }

  ngOnDestroy(): void {
    if (this.valuesSubscription) {
      this.valuesSubscription.unsubscribe();
    }
    if (this.sorting) {
      this.sorting.complete();
    }
  }


  buildSortParamsForm(fb: FormBuilder) {
    return fb.group({
      active: [this.defaultSorting(), [Validators.required]],
      isAscending: [true, [Validators.required]],
      ppaJobId: [],
      rhythmJobId: [],
    });
  }

  buildMainForm(sortParamsForm: FormGroup, fb: FormBuilder) {
    return sortParamsForm;
  }

  defaultSorting() {
    return 'ID';
  }

  shortUUID(id: string) {
    return shortUUID(id);
  }

  toLocalDateTime(val: any) {
    return LocalDateTime.deserialize(val).date;
  }

  friendlyRhythmMethod(method: string) {
    if (method === 'BD2JTK') { return 'JTK'; }
    if (method === 'BD2EJTK') { return 'eJTK'; }
    return method;
  }
}
