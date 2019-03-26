import {SetAble, Validator} from './common-interfaces';
import {EventEmitter} from '@angular/core';
import {ValidableFormComponent} from './validable-form.component';


export class RevertableFormComponent<T extends SetAble<T>> extends ValidableFormComponent<T> {

  onAccepted = new EventEmitter<T>();

  onCancelled = new EventEmitter<boolean>();

  protected _orgModel: T;
  protected _model: T;

  constructor(validator?: Validator<T>) {
    super(validator);
  }

  cancel() {
    // console.log("cancel");
    this.clearErrors();
    this.onCancelled.emit(true);
  }

  save() {
    // console.log("save");
    if (this._orgModel) {

      if (this.triggerValidation()) {
        this._orgModel.setAll(this._model);
        this.onAccepted.emit(this._orgModel);
      }
    }
  }

  protected getModel(): T {
    return this._model;
  }

  protected setModel(model: T) {
    this._orgModel = model;
    if (model) {
      this._model = model.clone();
    }
  }

}
