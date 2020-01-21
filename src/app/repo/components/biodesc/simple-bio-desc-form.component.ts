import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExperimentalAssayView} from '../../../dom/repo/exp/experimental-assay-view';
import {DataCategory} from '../../../dom/repo/biodesc/data-category';
import {removeItemFromArr} from '../../../shared/collections-util';
import {ValidableFormComponent} from '../../../shared/validable-form.component';
import {SpeciesService} from './species.service';


@Component({
  selector: 'bd2-simple-bio-desc-form',
  template: `

    <div *ngIf="experiment">
      <form #sBioForm="ngForm">

        <!--<div class="alert alert-success" role="alert">
          Please email us if you don't see suitable terms in the value lists
        </div>-->
        <div class="form-group">
          <mat-form-field class="w-100">
          <mat-label for="species">Species</mat-label>

          <mat-select  class=""
                  id="species"
                  required
                  placeholder="Select species"
                  [(ngModel)]="_model.species"
                  name="species" #species="ngModel"
          >
            <mat-option *ngFor="let opt of knownSpecies; let ix = index" [value]="opt" >{{opt}}
            </mat-option>
          </mat-select>
          <mat-hint>Please email us if you don't see suitable terms in the value lists</mat-hint>
          <!--<div [hidden]="species.valid " class="alert alert-danger">
            Species is required
          </div>-->
          </mat-form-field>
        </div>

        <div class="form-group">
          <mat-form-field class="w-100">
          <mat-label for="dataCategory">Data category</mat-label>

          <mat-select class=""
                  id="dataCategory"
                  required
                  placeholder="Select category"
                  [(ngModel)]="_model.category"
                  name="dataCategory" #dataCategory="ngModel"
          >
            <mat-option *ngFor="let opt of categories; let ix = index" [value]="opt.name">
              {{opt.longName}}
            </mat-option>
          </mat-select>
          <!--<div [hidden]="dataCategory.valid " class="alert alert-danger">
            Data category is required
          </div>-->
          <mat-hint>Please email us if you don't see suitable terms in the value lists</mat-hint>
          </mat-form-field>
        </div>

        <button type="button" class="btn btn-primary mr-1" [disabled]="blocked || !sBioForm.form.valid" (click)="save()">{{okLabel}}</button>
        <button type="button" class="btn btn-outline-secondary" (click)="cancel()">Cancel</button>

      </form>
    </div>

  `,
})
export class SimpleBioDescFormComponent extends ValidableFormComponent<any> implements OnInit {


  @Input()
  okLabel = 'Save';

  @Input()
  blocked = false;


  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onAccepted = new EventEmitter<ExperimentalAssayView>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output()
  onCancelled = new EventEmitter<boolean>();

  categories: DataCategory[] = [];
  knownSpecies: string[] = [];
  // optionClass = '';



  experiment: ExperimentalAssayView;

  // category:string;
  constructor(private speciesService: SpeciesService) {
    super();
    // super(SimpleBioDescValidator.INSTANCE);


  }

  // species:string;

  _model = {species: null as string, category: null as string};

  @Input()
  set model(exp: ExperimentalAssayView) {
    if (exp) {
      this.experiment = exp;
      // this._model = {};

      this._model.species = exp.species;
      this._model.category = exp.dataCategory ? exp.dataCategory.name : null;

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
      this.onAccepted.emit(this.experiment);
      // console.log("Save emitted");
    } else {
      // if (this._model.species) this._model.species = this._model.species.trim();
      // console.log("Save failed validation");
    }
  }

  validate(obj: any): string[] {
    const err: string[] = [];
    if (!obj.species || obj.species.trim() === '') {
      err.push('Species cannot be empty');
    }
    if (obj.species && this.knownSpecies.indexOf(obj.species) < 0) {
      err.push('Unknown species: ' + obj.species);
    }
    if (!obj.category || obj.category === 'NONE') {
      err.push('Data category is required');
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
