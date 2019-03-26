import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MeasurementDesc} from '../../../../dom/repo/measure/measurement-desc';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TypeaheadMatch} from 'ngx-bootstrap';
import {TechniqueService} from '../technique.service';
import {FeedbackService} from '../../../../feedback/feedback.service';

@Component({
  selector: 'bd2-measurement-desc-rform',
  templateUrl: './measurement-desc-rform.component.html',
})
export class MeasurementDescRFormComponent /*extends RevertableFormComponent<MeasurementDesc>*/
  implements OnInit {

  @Input()
  okLabel = 'Save';

  @Input()
  blocked: boolean;

  @Output()
  onAccepted = new EventEmitter<MeasurementDesc>();

  @Output()
  onCancelled = new EventEmitter<boolean>();


  formModel: FormGroup;
  _orgModel: MeasurementDesc;

  techniques: string[] = [];

  equipments: string[] = [];

  constructor(private techniqueService: TechniqueService, private feedback: FeedbackService, private fb: FormBuilder) {
    // super();
  }

  @Input()
  set model(model: MeasurementDesc) {
    this.setModel(model);

    // asynchronous so that the known techniques are loaded once form is validated with initial data
    this.updateTechniques()
      .then(res => this.updateEquipments(model.technique))
      .then(res => this.formModel = this.buildMainForm(model));


  }

  setModel(model: MeasurementDesc) {
    this._orgModel = model;
  }

  ngOnInit() {
    this.updateTechniques();
  }

  buildMainForm(model: MeasurementDesc): FormGroup {
    return this.fb.group({
      technique: [model.technique, [Validators.required, (control: AbstractControl) => this.knownTechnique(control.value)]],
      equipment: [model.equipment],
      description: [model.description],
      parameters: []

    });

  }

  knownTechnique(name: any): { [key: string]: any } {
    if (!name) {
      return {validTechnique: 'Empty value'};
    }
    if (!this.techniques.find(v => v === name)) {
      return {validTechnique: 'Unknown technique: ' + name};
    }
    return null;
  }

  public techniqueOnSelect(e: TypeaheadMatch): void {
    // console.log('Selected technique: ', e.value);
    if (e.value) {
      this.updateEquipments(e.value);
    }
  }

  updateTechniques(): Promise<string[]> {
    return this.techniqueService.getTechniques()
      .then((res: string[]) => {
        this.techniques = res ? res : [];
        return res;
      }).catch(
        reason => {
          this.feedback.error(reason);
          return Promise.reject(reason);
        }
      );
  }

  updateEquipments(technique: string): Promise<string[]> {
    if (!technique) {
      this.equipments = [];
      return Promise.resolve([]);
    }

    return this.techniqueService.getEquipments(technique)
      .then(res => {
        this.equipments = res ? res : [];
        return res;
      })
      .catch(reason => {
        this.feedback.error(reason);
        return Promise.reject(reason);
      });
  }

  cancel() {
    // console.log("cancel");
    // this.clearErrors();
    this.onCancelled.emit(true);
  }

  save() {
    // console.log("save");
    /* if (this._orgModel) {

     if (this.triggerValidation()) {
     this._orgModel.setAll(this._model);
     this.onAccepted.emit(this._orgModel);
     }
     }*/
    if (this.formModel.valid) {
      this._orgModel.setAll(this.formModel.value);
      this.onAccepted.emit(this._orgModel);
    }
  }

}
