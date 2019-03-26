import {Validator} from '../../../shared/common-interfaces';
import {GeneralDesc} from './general-desc';

export class GeneralDescValidator implements Validator<GeneralDesc> {

  static INSTANCE = new GeneralDescValidator();

  validate(obj: GeneralDesc): string[] {
    const err: string[] = [];
    if (!obj) {
      return ['General description cannot be empty'];
    }

    if (!obj.name || obj.name.trim() == '') {
      err.push('Non empty name is required');
    }
    if (!obj.purpose || obj.purpose.trim() == '') {
      err.push('Purpose is required');
    }
    if (obj.purpose && obj.purpose.trim().length < 20) {
      err.push('Purpose is too short');
    }

    return err;
  }

  protected GeneralDescValidator() {
  }
}
