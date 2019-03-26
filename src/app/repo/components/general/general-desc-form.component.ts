import {Component, Input} from '@angular/core';

import {RevertableFormComponent} from '../../../shared/revertable-form.component';
import {GeneralDesc} from '../../../dom/repo/shared/general-desc';
import {GeneralDescValidator} from '../../../dom/repo/shared/general-desc.validator';
import {WorldCountValidator} from '../../../shared/validators/world-count.validator';

@Component({
  selector: 'bd2-general-desc-form',
  templateUrl: './general-desc-form.component.html',
  outputs: ['onAccepted', 'onCancelled']
})
export class GeneralDescFormComponent extends RevertableFormComponent<GeneralDesc> {

  @Input()
  okLabel = 'Save';

  @Input()
  blocked: boolean;

  sufficientPurpose = false;
  purposeWorldValidator = new WorldCountValidator(5);

  constructor() {
    super(GeneralDescValidator.INSTANCE);
  }

  get model(): GeneralDesc {
    return this._model;
  }


  @Input()
  set model(model: GeneralDesc) {
    this.setModel(model);
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


}
