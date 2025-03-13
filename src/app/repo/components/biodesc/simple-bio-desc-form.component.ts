import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExperimentalAssayView} from '../../../dom/repo/exp/experimental-assay-view';
import {DataCategory} from '../../../dom/repo/biodesc/data-category';
import {removeItemFromArr} from '../../../shared/collections-util';
import {ValidableFormComponent} from '../../../shared/validable-form.component';
import {SpeciesService} from './species.service';


@Component({
    selector: 'bd2-simple-bio-desc-form',
    templateUrl: './simple-bio-desc-form.component.html',
    standalone: false
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
