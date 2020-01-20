import {Component, Input} from '@angular/core';

import {RevertableFormComponent} from '../../../shared/revertable-form.component';
import {GeneralDescValidator} from '../../../dom/repo/shared/general-desc.validator';
import {WorldCountValidator} from '../../../shared/validators/world-count.validator';
import {ExperimentGeneralDescView} from '../../../dom/repo/exp/experiment-general-desc-view';
import {LocalDate} from '../../../dom/repo/shared/dates';

@Component({
  selector: 'bd2-general-desc-form',
  templateUrl: './general-desc-form.component.html',
  outputs: ['onAccepted', 'onCancelled']
})
export class GeneralDescFormComponent extends RevertableFormComponent<ExperimentGeneralDescView> {

  @Input()
  okLabel = 'Save';

  @Input()
  blocked: boolean;

  executionDate: Date;
  maxDate: Date;
  minDate: Date;

  sufficientPurpose = false;
  purposeWorldValidator = new WorldCountValidator(5);

  constructor() {
    super(GeneralDescValidator.INSTANCE);

    // three weeks in advance
    this.maxDate = new Date();
    this.maxDate.setDate(this.maxDate.getDate() + 21);

    this.minDate = new Date();
    this.minDate.setFullYear(this.minDate.getFullYear() - 10);
  }

  get model(): ExperimentGeneralDescView {
    return this._model;
  }


  @Input()
  set model(model: ExperimentGeneralDescView) {
    this.setModel(model);
    this.executionDate = model.executionDate.date;
    this.checkPurpose();
  }

  checkPurpose() {
    // console.log("Check purpose: "+this.model.purpose);
    if (this.purposeWorldValidator.validateText(this.model.purpose) === null) {
      this.sufficientPurpose = true;
    } else {
      this.sufficientPurpose = false;
    }
  }

  save() {

    this.model.executionDate = LocalDate.fromDate(this.executionDate);
    super.save();
  }


}
