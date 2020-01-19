import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExperimentalAssayView} from '../../../dom/repo/exp/experimental-assay-view';
import {DataCategory} from '../../../dom/repo/biodesc/data-category';
import {removeItemFromArr} from '../../../shared/collections-util';
import {ValidableFormComponent} from '../../../shared/validable-form.component';
import {SpeciesService} from './species.service';
import {LocalDate} from '../../../dom/repo/shared/dates';


@Component({
  selector: 'bd2-simple-bio-desc-form',
  template: `

    <div *ngIf="experiment">
      <form #sBioForm="ngForm">

        <div class="alert alert-success" role="alert">
          Please email us if you don't see suitable terms in the value lists
        </div>
        <div class="form-group">
          <label for="species">Species</label>
          <!--<input type="text" class="form-control" required
                 id="species"
                 placeholder="e.g. Arabidopsis thaliana"
                 minlength="6"
                 maxlength="100"
                 [(ngModel)]="_model.species"
                 name="species"  #species="ngModel" >-->
          <select class="form-control"
                  id="species"
                  required
                  placeholder="Select species"
                  [(ngModel)]="_model.species"
                  name="species" #species="ngModel"
          >
            <option *ngFor="let opt of knownSpecies; let ix = index" [value]="opt" class="{{optionClass}}">{{opt}}
            </option>
          </select>
          <div [hidden]="species.valid " class="alert alert-danger">
            Species is required
          </div>
        </div>

        <div class="form-group">
          <label for="dataCategory">Data category</label>

          <select class="form-control"
                  id="dataCategory"
                  required
                  placeholder="Select category"
                  [(ngModel)]="_model.category"
                  name="dataCategory" #dataCategory="ngModel"
          >
            <option *ngFor="let opt of categories; let ix = index" [value]="opt.name" class="{{optionClass}}">
              {{opt.longName}}
            </option>
          </select>
          <div [hidden]="dataCategory.valid " class="alert alert-danger">
            Data category is required
          </div>
        </div>

        <div class="form-group">
          <mat-form-field>
            <input matInput [matDatepicker]="picker" [(ngModel)]="_model.executionDate"
                   name="executionDate" placeholder="Exp. execution date"
                [max]="maxDate" [min]="minDate" required>
            <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
            <mat-datepicker #picker></mat-datepicker>
          </mat-form-field>
          <br>
        </div>

        <button type="button" class="btn btn-primary mr-1" [disabled]="blocked || !sBioForm.form.valid" (click)="save()">{{okLabel}}</button>
        <button type="button" class="btn btn-outline-secondary" (click)="cancel()">Cancel</button>

      </form>
      <div>{{experiment | json}}</div>
    </div>

  `,
})
export class SimpleBioDescFormComponent extends ValidableFormComponent<any> implements OnInit {


  @Input()
  okLabel = 'Save';

  @Input()
  blocked = false;


  @Output()
  onAccepted = new EventEmitter<ExperimentalAssayView>();
  @Output()
  onCancelled = new EventEmitter<boolean>();

  categories: DataCategory[] = [];
  knownSpecies: string[] = [];
  optionClass = '';

  executionDate: Date;
  maxDate: Date;
  minDate: Date;

  experiment: ExperimentalAssayView;

  // category:string;
  constructor(private speciesService: SpeciesService) {
    super();
    // super(SimpleBioDescValidator.INSTANCE);

    // three weeks in advance
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 21);

    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 10);
  }

  // species:string;

  _model = {species: null as string, category: null as string, executionDate: null as Date};

  @Input()
  set model(exp: ExperimentalAssayView) {
    if (exp) {
      this.experiment = exp;
      // this._model = {};

      this._model.species = exp.species;
      this._model.category = exp.dataCategory ? exp.dataCategory.name : null;
      this._model.executionDate = exp.experimentalDetails.executionDate.date;
    }
  }

  getModel(): any {
    return this._model;
  }

  ngOnInit(): any {

    this.speciesService.species()
      .then(sp => this.knownSpecies = sp);

    this.categories = this.initCategories();
  }

  cancel() {
    // console.log("cancel");
    this.clearErrors();
    this.onCancelled.emit(true);
  }

  save() {
    if (this.triggerValidation()) {
      this.experiment.dataCategory = DataCategory.get(this._model.category);
      this.experiment.species = this._model.species;
      this.experiment.experimentalDetails.executionDate = LocalDate.fromDate(this._model.executionDate);
      this.onAccepted.emit(this.experiment);
      // console.log("Save emitted");
    } else {
      // if (this._model.species) this._model.species = this._model.species.trim();
      // console.log("Save failed validation");
    }
  }

  validate(obj: any): string[] {
    const err: string[] = [];
    if (!obj.species || obj.species.trim() == '') {
      err.push('Species cannot be empty');
    }
    if (obj.species && this.knownSpecies.indexOf(obj.species) < 0) {
      err.push('Unknown species: ' + obj.species);
    }
    if (!obj.category || obj.category == 'NONE') {
      err.push('Data category is required');
    }
    if (!obj.executionDate) {
      err.push('Execution date is required');
    }
    if (err.length === 0) {
      return null;
    } else {
      return err;
    }
  }

  protected initCategories(): DataCategory[] {
    const cats = DataCategory.getValidOptions().slice();
    removeItemFromArr(DataCategory.get('NONE'), cats);
    return cats;
  }
}
